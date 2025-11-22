import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Bot, User, Send, X, Compass, Search as SearchIcon, Globe } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  sources?: any[];
}

// Comprehensive context for the chatbot to act as a company expert
const COMPANY_SYSTEM_INSTRUCTION = `
Eres "MGP Bot", el asistente virtual oficial de Industrias MGP. Tu objetivo es ayudar a los nuevos empleados durante su proceso de onboarding y responder dudas sobre la empresa.

INFORMACIÓN DE LA EMPRESA (INDUSTRIAS MGP):
1. Historia: Fundada hace 20 años en un pequeño taller. Hoy somos líderes en manufactura industrial, reconocidos por la calidad e innovación.
2. Misión: Proveer soluciones innovadoras que superen expectativas.
3. Valores: Calidad, Compromiso, Integridad, Innovación, Colaboración.
4. Cultura: Fomentamos el respeto, la diversidad y el aprendizaje continuo.

RRHH Y PAGOS:
- Días de Pago: Quincenalmente, los días 15 y 30 de cada mes.
- Vacaciones: Se pueden solicitar después del primer año cumplido. El proceso se hace a través del portal de autogestión con 15 días de anticipación.
- Beneficios: Seguro de vida, convenios con gimnasios, fondo de empleados, auxilio educativo.
- Incapacidades: Deben reportarse a RRHH (rrhh@industriasmgp.com) en las primeras 48 horas con soporte médico.
- Horario: Administrativos (Lunes a Viernes 8am-5pm), Planta (Turnos rotativos).

SEGURIDAD (SST):
- Política: "La seguridad no es negociable".
- EPP: Es obligatorio el uso de botas, casco y gafas en áreas de planta.
- Emergencias: El punto de encuentro es el Parqueadero Principal (Zona A).
- Reportes: Cualquier acto inseguro debe reportarse inmediatamente al supervisor o por la app de seguridad.

TONO Y ESTILO:
- Sé amable, profesional y motivador.
- Usa emojis ocasionalmente para ser amigable (e.g., 👷, 🚀, ✅).
- Respuestas concisas pero completas. Si no sabes algo, sugiere contactar a RRHH.
`;

const Chatbot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "¡Hola! 👋 Soy tu asistente de Industrias MGP. Puedo ayudarte con información sobre pagos, vacaciones, seguridad o historia de la empresa. ¿En qué te puedo ayudar hoy?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let responseText = '';
      let sources: any[] = [];
      const lowerInput = input.toLowerCase();

      // GROUNDING: Search (Web)
      if (lowerInput.includes('busca en la web') || lowerInput.includes('noticias') || lowerInput.includes('actualidad') || lowerInput.includes('dolar') || lowerInput.includes('clima')) {
        const model = 'gemini-2.5-flash';
        const response = await ai.models.generateContent({
            model,
            contents: [{ parts: [{ text: input }] }],
            config: { tools: [{googleSearch: {}}] },
        });
        responseText = response.text || "No encontré información relevante.";
        sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      // GROUNDING: Maps
      } else if (lowerInput.includes('donde estoy') || lowerInput.includes('cerca de mí') || lowerInput.includes('restaurantes') || lowerInput.includes('mapa')) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;

        const model = 'gemini-2.5-flash';
        const response = await ai.models.generateContent({
            model,
            contents: [{ parts: [{ text: input }] }],
            config: { 
                tools: [{googleMaps: {}}],
                toolConfig: { retrievalConfig: { latLng: { latitude, longitude } } }
            },
        });
        responseText = response.text || "No pude obtener la ubicación.";
        sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      } else {
        // STANDARD CHAT (Company Knowledge)
        const model = 'gemini-3-pro-preview';
        const response = await ai.models.generateContent({ 
            model, 
            contents: [{ parts: [{ text: input }] }],
            config: {
                systemInstruction: COMPANY_SYSTEM_INSTRUCTION,
                temperature: 0.7 
            }
        });
        responseText = response.text || "Lo siento, no pude procesar tu respuesta.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: responseText, sources }]);
    } catch (error) {
      console.error('Gemini API error:', error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Lo siento, ocurrió un error al conectar con el sistema. Por favor, intenta de nuevo más tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, ai.models]);

  const renderSource = (source: any, index: number) => {
    if (source.web) {
      return (
        <a href={source.web.uri} target="_blank" rel="noopener noreferrer" key={`web-${index}`} className="flex items-center space-x-2 text-xs bg-blue-100 p-2 rounded-lg hover:bg-blue-200 transition-colors border border-blue-200">
          <Globe className="h-4 w-4 text-blue-600" />
          <span className="truncate max-w-[150px] text-blue-800">{source.web.title || 'Fuente Web'}</span>
        </a>
      );
    }
    if (source.maps) {
      return (
        <a href={source.maps.uri} target="_blank" rel="noopener noreferrer" key={`map-${index}`} className="flex items-center space-x-2 text-xs bg-green-100 p-2 rounded-lg hover:bg-green-200 transition-colors border border-green-200">
          <Compass className="h-4 w-4 text-green-600" />
          <span className="truncate max-w-[150px] text-green-800">{source.maps.title || 'Ubicación'}</span>
        </a>
      );
    }
    return null;
  }

  return (
    <div className="w-96 h-[36rem] bg-white rounded-2xl shadow-2xl flex flex-col animate-fade-in-up mb-4 border border-gray-200 z-50">
      <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-50 rounded-full">
             <Bot className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Asistente MGP</h2>
            <span className="flex items-center text-xs text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> En línea
            </span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors">
          <X className="h-5 w-5" />
        </button>
      </header>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && (
                 <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <Bot className="h-5 w-5 text-red-500" />
                 </div>
            )}
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm border ${
                msg.sender === 'user' 
                ? 'bg-red-800 text-white border-red-800 rounded-br-none' 
                : 'bg-white text-gray-800 border-gray-200 rounded-bl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {msg.text}
              </p>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200/50 space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">Fuentes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {msg.sources.map(renderSource)}
                  </div>
                </div>
              )}
            </div>
            {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-5 w-5 text-white" />
                </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                <Bot className="h-5 w-5 text-red-500" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200 rounded-bl-none shadow-sm">
              <div className="flex items-center space-x-1.5">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta sobre pagos, EPP, historia..."
            className="w-full bg-gray-100 border border-gray-300 text-gray-900 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 placeholder-gray-500 transition-all"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()} 
            className="absolute right-2 p-2 bg-red-800 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-700 transition-all shadow-md"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex justify-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><SearchIcon className="h-3 w-3" /> Web Search</span>
            <span className="flex items-center gap-1"><Compass className="h-3 w-3" /> Maps</span>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;