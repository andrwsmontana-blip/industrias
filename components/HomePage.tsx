import React from 'react';
import { PlayCircle, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in-up space-y-8">
      <header className="relative rounded-xl overflow-hidden shadow-lg">
        <img src="https://picsum.photos/1200/400?grayscale&blur=2" alt="Office Banner" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <h1 className="text-4xl font-extrabold text-white">
            Bienvenido a bordo, nuevo miembro del equipo
          </h1>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Carta de Bienvenida</h2>
          <p className="text-gray-600 leading-relaxed">
            En nombre de toda la gerencia y el equipo de Industrias MGP, te extendemos la más cálida bienvenida. Estamos encantados de que te unas a nosotros. Tu talento y perspectiva son una valiosa adición a nuestra misión. Creemos que juntos alcanzaremos nuevas cimas de éxito e innovación. ¡Prepárate para un viaje emocionante!
          </p>
          <p className="mt-4 text-gray-800 font-semibold">- La Gerencia</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center justify-center text-center">
            <PlayCircle className="h-20 w-20 text-red-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Video de Bienvenida</h3>
            <p className="text-gray-500 mt-2">Un mensaje de nuestro equipo para ti. ¡Haz clic para ver!</p>
            <a 
              href="https://youtu.be/D3UBK66rhBM" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 bg-red-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-900 transition-colors inline-block"
            >
                Ver Video
            </a>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Accesos Rápidos</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickAccessCard 
            title="Iniciar mi Inducción" 
            description="Comienza tu viaje de aprendizaje y conoce tus primeras tareas." 
            onClick={() => onNavigate('onboarding.induction')}
          />
          <QuickAccessCard 
            title="Conocer la Empresa" 
            description="Explora nuestra historia, misión, visión y valores." 
            onClick={() => onNavigate('onboarding.identity')}
          />
          <QuickAccessCard 
            title="Procesos RRHH" 
            description="Información clave sobre nómina, vacaciones y más." 
            onClick={() => onNavigate('hr.payroll')}
          />
          <QuickAccessCard 
            title="Directorio de Contacto" 
            description="Encuentra a tus compañeros y contactos clave." 
            onClick={() => onNavigate('onboarding.identity')}
          />
        </div>
      </div>
    </div>
  );
};

const QuickAccessCard: React.FC<{ title: string; description: string; onClick: () => void }> = ({ title, description, onClick }) => (
    <div onClick={onClick} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
        <h3 className="text-lg font-bold text-red-600 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-end">
            <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-red-600 transition-colors" />
        </div>
    </div>
);

export default HomePage;