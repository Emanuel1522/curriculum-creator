import React from 'react';
import { Layout, Check, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

const Onboarding = ({ onSelectTemplate }) => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-nunito">
            {/* Navigation Bar */}
            <nav className="h-16 px-6 md:px-12 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center text-white">
                        <Layout size={18} />
                    </div>
                    <span className="text-xl font-bold text-[#1e3a5f]">CV Builder</span>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center pt-16 pb-20 px-6">
                <div className="text-center max-w-3xl mb-16">
                    <h1 className="text-5xl font-extrabold text-[#112233] mb-6 tracking-tight">
                        Crea tu hoja de vida
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        Diseña un CV profesional en minutos sin necesidad de registro. Tus datos se guardan de forma segura en tu dispositivo.
                    </p>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
                    {/* Card A - Minimalista ATS */}
                    <div className="group bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(30,58,95,0.1)] transition-all duration-500 flex flex-col overflow-hidden">
                        <div className="h-[360px] bg-[#f8fafc] p-10 relative flex items-center justify-center">
                            <span className="absolute top-6 right-6 bg-[#dcfce7] text-[#166534] text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#166534]/10">
                                <Check size={14} strokeWidth={3} /> ATS Compatible
                            </span>
                            {/* Template Illustration */}
                            <div className="w-48 h-[270px] bg-white shadow-2xl rounded-sm border border-gray-100 p-4 space-y-3 transform group-hover:scale-105 transition-transform duration-500">
                                <div className="w-12 h-2.5 bg-gray-800 rounded-full"></div>
                                <div className="w-8 h-1.5 bg-gray-300 rounded-full"></div>
                                <div className="h-px bg-gray-100 my-4"></div>
                                <div className="space-y-2">
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
                                    <div className="w-4/5 h-1.5 bg-gray-100 rounded-full"></div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-3">Minimalista ATS</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Diseño limpio de una sola columna optimizado para sistemas automáticos de selección y perfiles técnicos.
                            </p>
                            <button
                                onClick={() => onSelectTemplate('minimal')}
                                className="w-full py-4 bg-[#1e3a5f] text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#2c5282] transition-colors shadow-lg shadow-blue-900/10 active:scale-[0.98]"
                            >
                                Usar esta plantilla <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Card B - Visual con Sidebar */}
                    <div className="group bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(30,58,95,0.1)] transition-all duration-500 flex flex-col overflow-hidden">
                        <div className="h-[360px] bg-[#f8fafc] p-10 relative flex items-center justify-center">
                            <span className="absolute top-6 right-6 bg-[#f3e8ff] text-[#6b21a8] text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#6b21a8]/10">
                                <Sparkles size={14} /> Diseño Moderno
                            </span>
                            {/* Template Illustration */}
                            <div className="w-48 h-[270px] bg-white shadow-2xl rounded-sm border border-gray-100 flex overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                                <div className="w-16 h-full bg-[#cbd5e1] p-3 space-y-3">
                                    <div className="w-6 h-6 rounded-full bg-white/40 mx-auto"></div>
                                    <div className="w-full h-1 bg-white/40 rounded-full"></div>
                                    <div className="w-full h-1 bg-white/40 rounded-full"></div>
                                    <div className="w-full h-1 bg-white/40 rounded-full"></div>
                                </div>
                                <div className="flex-1 p-4 space-y-3">
                                    <div className="w-12 h-2.5 bg-gray-800 rounded-full"></div>
                                    <div className="w-8 h-1.5 bg-gray-300 rounded-full"></div>
                                    <div className="h-px bg-gray-50 my-4"></div>
                                    <div className="space-y-2">
                                        <div className="w-full h-1.5 bg-gray-50 rounded-full"></div>
                                        <div className="w-full h-1.5 bg-gray-50 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-3">Visual con Sidebar</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Destaca tu perfil con un diseño creativo y organizado. Ideal para roles creativos, marketing y ventas.
                            </p>
                            <button
                                onClick={() => onSelectTemplate('visual')}
                                className="w-full py-4 bg-white text-[#1e3a5f] border-2 border-gray-100 font-bold rounded-2xl flex items-center justify-center gap-2 hover:border-[#1e3a5f] transition-all active:scale-[0.98]"
                            >
                                Usar esta plantilla <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="px-12 py-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400 font-medium">
                <p>© 2026 CV Builder. Todos los derechos reservados.</p>
                <div className="flex items-center gap-8">
                    <a href="#" className="hover:text-[#1e3a5f]">Privacidad</a>
                    <a href="#" className="hover:text-[#1e3a5f]">Términos y Condiciones</a>
                    <a href="#" className="hover:text-[#1e3a5f]">Contacto</a>
                </div>
            </footer>
        </div>
    );
};

export default Onboarding;
