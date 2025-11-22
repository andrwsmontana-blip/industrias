
import React, { useState } from 'react';
import { GraduationCap, Calendar, Play, ChevronRight, ChevronLeft, X, CheckCircle, HeartHandshake, ClipboardCheck, ExternalLink } from 'lucide-react';

const INDUCTION_MODULES = [
    {
        title: "Bienvenida a Industrias MGP",
        content: "¡Hola! Estamos emocionados de tenerte aquí. Este módulo de capacitación te guiará a través de los pilares fundamentales de nuestra empresa. Prepárate para conocer nuestra cultura y valores.",
        image: "https://picsum.photos/800/400?grayscale&blur=1"
    },
    {
        title: "Nuestra Historia",
        content: "Fundada hace 20 años en un pequeño taller, Industrias MGP ha crecido hasta convertirse en líder en manufactura industrial. Nuestra pasión por la calidad nos ha traído hasta aquí.",
        image: "https://picsum.photos/800/401?grayscale&blur=1"
    },
    {
        title: "Misión y Visión",
        content: "Misión: Proveer soluciones innovadoras que superen expectativas.\n\nVisión: Ser el referente global en nuestro sector por nuestra excelencia y sostenibilidad.\n\nValores: Calidad, Compromiso, Integridad, Innovación y Colaboración.",
        image: "https://picsum.photos/800/402?grayscale&blur=1"
    },
    {
        title: "Seguridad y Salud (SST)",
        content: "La seguridad no es negociable. Es obligatorio el uso de botas 🥾, casco ⛑️ y gafas 👓 en áreas de planta. \n\nEl punto de encuentro en emergencias es el Parqueadero Principal (Zona A).",
        image: "https://picsum.photos/800/403?grayscale&blur=1"
    },
    {
        title: "Pagos y Beneficios",
        content: "Pagamos quincenalmente los días 15 y 30. Tienes acceso a seguro de vida, fondo de empleados y auxilios educativos después del primer año.\n\nRecuerda solicitar tus vacaciones con 15 días de anticipación.",
        image: "https://picsum.photos/800/404?grayscale&blur=1"
    }
];

const RESPECT_MODULES = [
    {
        title: "Importancia del Respeto",
        content: "El respeto es la base de nuestra cultura organizacional. Un ambiente de trabajo respetuoso fomenta la confianza, la productividad y el bienestar emocional de todos los colaboradores. Sin respeto, no hay equipo.",
        image: "https://picsum.photos/800/405?grayscale&blur=1"
    },
    {
        title: "Comunicación Asertiva",
        content: "Expresa tus ideas, sentimientos y necesidades de forma abierta y honesta, pero siempre con respeto hacia los demás. Escucha activamente sin interrumpir y valida los puntos de vista de tus compañeros.",
        image: "https://picsum.photos/800/406?grayscale&blur=1"
    },
    {
        title: "Diversidad e Inclusión",
        content: "En Industrias MGP celebramos nuestras diferencias. Valoramos la diversidad de género, raza, religión, orientación sexual y capacidades. La diversidad nos enriquece y nos hace más innovadores.",
        image: "https://picsum.photos/800/407?grayscale&blur=1"
    },
    {
        title: "Cero Tolerancia al Acoso",
        content: "Mantenemos una política de TOLERANCIA CERO frente a cualquier forma de acoso laboral, sexual o discriminación. Todos tenemos derecho a trabajar en un entorno seguro y libre de intimidación.",
        image: "https://picsum.photos/800/408?grayscale&blur=1"
    },
    {
        title: "Resolución de Conflictos",
        content: "Los desacuerdos son naturales, pero la forma en que los manejamos define nuestra cultura. Aborda los conflictos de manera constructiva, centrándote en los hechos y buscando soluciones 'ganar-ganar', sin ataques personales.",
        image: "https://picsum.photos/800/409?grayscale&blur=1"
    },
    {
        title: "Empatía y Colaboración",
        content: "Ponte en el lugar del otro. La empatía nos permite entender mejor las necesidades de nuestros colegas y clientes. Trabajamos mejor cuando nos apoyamos mutuamente y colaboramos sin egoísmos.",
        image: "https://picsum.photos/800/410?grayscale&blur=1"
    },
    {
        title: "Mi Compromiso",
        content: "Al finalizar esta capacitación, reafirmas tu compromiso de tratar a todos con dignidad. Recuerda: El respeto se gana, se da y se mantiene con nuestras acciones diarias. ¡Contamos contigo!",
        image: "https://picsum.photos/800/411?grayscale&blur=1"
    }
];

const TrainingPage: React.FC = () => {
  const [activeTraining, setActiveTraining] = useState<any[] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const triggerBootRain = () => {
    const container = document.getElementById('emoji-container');
    if (container) {
        const emojiCount = 40;
        for (let i = 0; i < emojiCount; i++) {
            const emoji = document.createElement('div');
            emoji.innerHTML = '🥾';
            emoji.classList.add('falling-emoji');
            
            const size = Math.random() * 2 + 1;
            const left = Math.random() * 95; 
            const duration = Math.random() * 3 + 2; 
            const delay = Math.random() * 2; 

            emoji.style.fontSize = `${size}rem`;
            emoji.style.left = `${left}vw`;
            emoji.style.animationDuration = `${duration}s`;
            emoji.style.animationDelay = `${delay}s`;
            
            container.appendChild(emoji);

            setTimeout(() => {
                emoji.remove();
            }, (duration + delay) * 1000);
        }
    }
  };

  const startTraining = (modules: any[]) => {
    setActiveTraining(modules);
    setCurrentStep(0);
    triggerBootRain();
  };

  const nextStep = () => {
    if (activeTraining && currentStep < activeTraining.length - 1) {
        setCurrentStep(prev => prev + 1);
    } else {
        setActiveTraining(null);
        triggerBootRain();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
        setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Capacitación y Desarrollo</h1>
          <p className="text-lg text-gray-600">Tu ruta para el aprendizaje y crecimiento continuo en la empresa.</p>
      </div>
      
      <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-md space-y-10">
        
        <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Módulos de Capacitación Disponibles</h3>
            <div className="grid md:grid-cols-2 gap-6">
                {/* Card Inducción */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between hover:border-red-500 transition-colors group">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                                <GraduationCap className="h-8 w-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Inducción Corporativa</h3>
                        </div>
                        <p className="text-gray-600 mb-6">Módulo esencial para conocer la historia, misión, visión, valores y normas básicas de seguridad de Industrias MGP.</p>
                    </div>
                    <button 
                        onClick={() => startTraining(INDUCTION_MODULES)}
                        className="w-full flex items-center justify-center gap-2 bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-md"
                    >
                        <Play className="h-5 w-5 fill-current" />
                        Iniciar Inducción
                    </button>
                </div>

                {/* Card Respeto */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between hover:border-blue-500 transition-colors group">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <HeartHandshake className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Respeto Laboral</h3>
                        </div>
                        <p className="text-gray-600 mb-6">Formación clave sobre convivencia, comunicación asertiva, empatía y políticas de cero tolerancia para un ambiente sano.</p>
                    </div>
                    <button 
                        onClick={() => startTraining(RESPECT_MODULES)}
                        className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-md"
                    >
                        <Play className="h-5 w-5 fill-current" />
                        Iniciar Curso
                    </button>
                </div>
            </div>
        </div>

        {/* Attendance Button Section */}
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
                <h3 className="text-xl font-bold text-green-900 flex items-center gap-2">
                    <ClipboardCheck className="h-6 w-6 text-green-600" />
                    Registro de Asistencia
                </h3>
                <p className="text-green-700 text-sm mt-1">
                    ¿Acabas de completar una capacitación? No olvides registrar tu asistencia oficial.
                </p>
            </div>
            <a 
                href="https://docs.google.com/spreadsheets/d/1FCDEWn3xdvHZK7C-bFaJMIU1CLbZ9Cm3/edit?gid=1594919484#gid=1594919484"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shadow-md"
            >
                <ExternalLink className="h-4 w-4" />
                Ir al Formato
            </a>
        </div>

        <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recursos Adicionales</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <InfoCard icon={<Calendar className="text-red-500" />} title="Calendario de Capacitaciones" description="Mantente al día con los próximos cursos, talleres y seminarios programados." />
                <InfoCard icon={<GraduationCap className="text-yellow-500" />} title="Biblioteca de Cursos" description="Accede a nuestro repositorio de tutoriales, videos y material de aprendizaje a tu propio ritmo." />
            </div>
        </div>
      </div>

      {/* Modal Carousel */}
      {activeTraining && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[80vh] animate-fade-in">
                {/* Header */}
                <div className="p-4 bg-gray-50 flex justify-between items-center border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="h-6 w-6 text-red-600" />
                        <span className="text-gray-900 font-bold text-lg">
                            Módulo {currentStep + 1}: {activeTraining[currentStep].title}
                        </span>
                    </div>
                    <button onClick={() => setActiveTraining(null)} className="text-gray-400 hover:text-gray-900 p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto relative">
                    <div className="relative h-64 w-full">
                        <img 
                            src={activeTraining[currentStep].image} 
                            alt={activeTraining[currentStep].title} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8">
                            <h2 className="text-4xl font-bold text-white shadow-black drop-shadow-md tracking-tight">{activeTraining[currentStep].title}</h2>
                        </div>
                    </div>
                    <div className="p-8 bg-white">
                        <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                            {activeTraining[currentStep].content}
                        </p>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2">
                        {activeTraining.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`h-2.5 w-8 rounded-full transition-colors duration-300 ${idx === currentStep ? 'bg-red-600' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                    
                    <div className="flex gap-4 w-full sm:w-auto justify-end">
                        <button 
                            onClick={prevStep} 
                            disabled={currentStep === 0}
                            className="px-4 py-2 text-gray-500 hover:text-gray-900 disabled:opacity-30 flex items-center gap-2 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <ChevronLeft className="h-5 w-5" /> Anterior
                        </button>
                        <button 
                            onClick={nextStep}
                            className="bg-red-800 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md"
                        >
                            {currentStep === activeTraining.length - 1 ? 'Finalizar Capacitación' : 'Siguiente'}
                            {currentStep === activeTraining.length - 1 ? <CheckCircle className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
            <div className="text-2xl">{icon}</div>
            <h4 className="font-bold text-lg text-gray-900">{title}</h4>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
);

export default TrainingPage;
