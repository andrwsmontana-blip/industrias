import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BrainCircuit, Sparkles, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';

const StrategicAnalysis: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isThinkingMode, setIsThinkingMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const handleAnalysis = useCallback(async () => {
        if (!query) return;

        setIsLoading(true);
        setResult('');
        setError('');

        try {
            const model = 'gemini-2.5-pro';
            const response = await ai.models.generateContent({
                model,
                contents: [{ parts: [{ text: query }] }],
                config: isThinkingMode ? { thinkingConfig: { thinkingBudget: 32768 } } : {}
            });
            setResult(response.text);
        } catch (e) {
            console.error("Strategic analysis error", e);
            setError("Ocurrió un error al procesar tu solicitud.");
        } finally {
            setIsLoading(false);
        }
    }, [query, isThinkingMode, ai.models]);

    return (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                <BrainCircuit className="h-7 w-7 text-red-600 mr-3" />
                Análisis Estratégico con IA
            </h3>
            <p className="text-gray-600 mb-6">
                Plantea un problema complejo o una pregunta estratégica. Activa el "Modo Pensamiento" para un análisis más profundo.
            </p>
            
            <div className="space-y-4">
                <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ej: 'Analiza nuestros protocolos de seguridad actuales y sugiere tres mejoras basadas en datos...'"
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    disabled={isLoading}
                />
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                     <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <label htmlFor="thinking-mode">Modo Pensamiento (Análisis Profundo):</label>
                        <button onClick={() => setIsThinkingMode(!isThinkingMode)} className="focus:outline-none">
                            {isThinkingMode ? <ToggleRight className="h-8 w-8 text-red-600" /> : <ToggleLeft className="h-8 w-8 text-gray-400" />}
                        </button>
                    </div>
                    <button onClick={handleAnalysis} disabled={isLoading || !query} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-900 disabled:bg-gray-300 transition-colors">
                        {isLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                        <span>{isLoading ? 'Analizando...' : 'Generar Análisis'}</span>
                    </button>
                </div>
            </div>

            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            
            {result && (
                <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Análisis Generado:</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
                </div>
            )}
        </div>
    );
};

export default StrategicAnalysis;