import React, { useState } from 'react';
import { Banknote, PlusCircle, Calendar as CalendarIcon, Info } from 'lucide-react';

const EnhancedCalendar: React.FC = () => {
    const [currentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Adjust for Monday start (0 = Monday, 6 = Sunday)
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: startDay });
    
    const dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    // Logic for Paydays (15th and 30th/End of month)
    const isPayday = (day: number) => {
        if (day === 15) return true;
        if (day === 30) return true;
        // Handle February or 31st
        if (day === daysInMonth && day !== 30 && day !== 31 && day !== 28 && day !== 29) return false; 
        return false;
    };

    const getDayStyle = (day: number, index: number) => {
        // Calculate day of week (0-6, Mon-Sun) for the specific date
        const dayOfWeek = (startDay + index) % 7;
        const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Saturday or Sunday

        if (isPayday(day)) return 'bg-green-600 text-white font-bold ring-2 ring-green-400';
        if (isWeekend) return 'bg-gray-100 text-gray-400';
        return 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-100';
    };

    const monthName = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mt-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-red-600" />
                    Calendario de Nómina
                </h4>
                <span className="text-sm font-semibold text-red-800 capitalize bg-red-100 px-3 py-1 rounded-full border border-red-200">
                    {monthName}
                </span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-sm font-bold text-gray-500 mb-2">
                {dayNames.map(day => <div key={day}>{day}</div>)}
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-sm">
                {emptyDays.map((_, i) => <div key={`empty-${i}`} className="w-full aspect-square"></div>)}
                {days.map((day, index) => (
                    <div
                        key={day}
                        className={`w-full aspect-square flex flex-col items-center justify-center rounded-lg transition-all cursor-default ${getDayStyle(day, index)}`}
                    >
                        <span>{day}</span>
                        {isPayday(day) && <span className="text-[0.6rem] uppercase tracking-tighter">Pago</span>}
                    </div>
                ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-gray-500 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full ring-1 ring-green-400"></div>
                    <span>Día de Pago</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-100 rounded-full border border-gray-200"></div>
                    <span>Fin de Semana</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-white rounded-full border border-gray-300"></div>
                    <span>Día Habil</span>
                </div>
            </div>
            
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-3">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                    Los reportes de horas extra deben entregarse antes del día 10 (para la quincena del 15) y antes del 25 (para fin de mes).
                </p>
            </div>
        </div>
    );
};


const PayrollPage: React.FC = () => (
    <div className="animate-fade-in-up space-y-8">
        <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Vinculación Laboral y Nómina</h1>
            <p className="text-lg text-gray-600">Información esencial sobre tu contrato, pagos y beneficios.</p>
        </div>
        <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Gestión Administrativa del Personal</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard icon={<Banknote className="text-green-600" />} title="Gestión de Nómina" description="Información sobre tu contrato, afiliaciones, fechas de corte y desprendibles de pago." />
                <InfoCard icon={<PlusCircle className="text-red-600" />} title="Reporte de Incapacidades" description="Proceso y documentación necesaria para reportar ausencias por motivos de salud." />
                <InfoCard icon={<CalendarIcon className="text-purple-600" />} title="Solicitud de Vacaciones" description="Planifica tu descanso. Conoce el procedimiento para solicitar y aprobar tus vacaciones." />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
                 <EnhancedCalendar />
                 <div className="space-y-4 mt-8">
                    <h4 className="font-bold text-xl text-gray-900">Preguntas Frecuentes</h4>
                    <FAQItem question="¿Cuándo recibo mi pago?" answer="Los pagos se realizan quincenalmente, los días 15 y 30 de cada mes a través de transferencia bancaria." />
                    <FAQItem question="¿Cómo descargar mi desprendible?" answer="Puedes descargar tus comprobantes de pago ingresando al portal de autogestión con tu usuario corporativo." />
                    <FAQItem question="¿Cómo reportar una incapacidad?" answer="Debes enviar el soporte médico escaneado al correo de RRHH dentro de las 48 horas siguientes a la expedición." />
                 </div>
            </div>
        </div>
    </div>
);


const InfoCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
            <div className="text-2xl">{icon}</div>
            <h4 className="font-bold text-lg text-gray-900">{title}</h4>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500">
        <h5 className="font-bold text-gray-900 mb-1">{question}</h5>
        <p className="text-sm text-gray-600">{answer}</p>
    </div>
);

export default PayrollPage;