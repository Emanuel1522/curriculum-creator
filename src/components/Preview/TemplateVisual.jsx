import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

const TemplateVisual = ({ cvData, containerRef, isExport = false }) => {
    const { personal, perfil, experiencia, educacion, habilidades, idiomas, cursos, seccionesActivas, ordenSecciones, accentColor } = cvData;

    const renderBullets = (text) => {
        if (!text) return null;
        return text.split('\n').filter(line => line.trim()).map((line, i) => (
            <div key={i} className="flex gap-2">
                <span className="text-gray-400 mt-0.5 text-[8px]">●</span>
                <span className="flex-1">{line}</span>
            </div>
        ));
    };

    const SectionHeader = ({ title }) => (
        <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <h2 className="text-[12px] font-black uppercase tracking-[1.5px] text-[#112233]">
                {title}
            </h2>
        </div>
    );

    return (
        <div
            ref={containerRef}
            className={`font-lato bg-white text-[#1A1A1A] w-[794px] flex ${isExport ? '' : ''}`}
        >
            {/* SIDEBAR */}
            <div className="w-[260px] min-h-full flex flex-col p-8 text-white relative z-10" style={{ backgroundColor: accentColor }}>
                {/* Profile Picture */}
                <div className="mb-10 flex justify-center">
                    <div className="w-[120px] h-[120px] rounded-full border-[4px] border-white/20 p-1">
                        {personal.foto ? (
                            <img src={personal.foto} className="w-full h-full rounded-full object-cover" alt="Profile" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center text-5xl font-black text-white/40">
                                {personal.nombre ? personal.nombre[0] : '?'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact info with discrete headers */}
                <div className="mb-10 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/10 pb-1">Contacto</h3>
                        <div className="space-y-3">
                            {personal.telefono && (
                                <div className="flex items-center gap-3 text-[11px] font-medium opacity-90">
                                    <div className="p-1.5 bg-white/10 rounded-md"><Phone size={12} /></div>
                                    <span>{personal.telefono}</span>
                                </div>
                            )}
                            {personal.email && (
                                <div className="flex items-center gap-3 text-[11px] font-medium opacity-90">
                                    <div className="p-1.5 bg-white/10 rounded-md"><Mail size={12} /></div>
                                    <span className="truncate">{personal.email}</span>
                                </div>
                            )}
                            {personal.ciudad && (
                                <div className="flex items-center gap-3 text-[11px] font-medium opacity-90">
                                    <div className="p-1.5 bg-white/10 rounded-md"><MapPin size={12} /></div>
                                    <span>{personal.ciudad}</span>
                                </div>
                            )}
                            {personal.linkedin && (
                                <a
                                    href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-[11px] font-medium opacity-90 hover:opacity-100 transition-opacity cursor-pointer pointer-events-auto"
                                >
                                    <div className="p-1.5 bg-white/10 rounded-md"><Linkedin size={12} /></div>
                                    <span className="truncate">{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Skills as Tags in Sidebar */}
                    {seccionesActivas.includes('habilidades') && (
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/10 pb-1">Habilidades</h3>
                            <div className="space-y-4">
                                {habilidades.categorias.map((cat, i) => (
                                    <div key={i} className="space-y-2">
                                        <h4 className="text-[9px] font-black uppercase tracking-widest text-white/30">{cat.nombre}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.items.map((item, j) => (
                                                <span key={j} className="px-2 py-1 bg-white/10 rounded text-[9px] font-bold uppercase tracking-wider">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certificaciones (New for Sidebar) */}
                    {seccionesActivas.includes('cursos') && cursos.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/10 pb-1">Certificaciones</h3>
                            <div className="space-y-3">
                                {cursos.map(curso => (
                                    <div key={curso.id}>
                                        <div className="text-[11px] font-bold leading-tight mb-0.5">{curso.nombre}</div>
                                        <div className="text-[10px] opacity-70">{curso.institucion} — {curso.año}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Idiomas - MOVED TO END */}
                    {seccionesActivas.includes('idiomas') && idiomas.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/10 pb-1">Idiomas</h3>
                            <div className="space-y-3">
                                {idiomas.map(idioma => (
                                    <div key={idioma.id}>
                                        <div className="text-[11px] font-bold mb-1">{idioma.idioma}</div>
                                        <div className="text-[10px] opacity-70 italic">{idioma.nivel}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 bg-white p-12 pr-10 flex flex-col">
                <header className="mb-12">
                    <h1 className="text-5xl font-black text-[#112233] tracking-tighter uppercase mb-2">
                        {personal.nombre || 'Nombre'}
                    </h1>
                    <p className="text-xl text-gray-400 font-bold tracking-tight">
                        {personal.titulo || 'Cargo Profesional'}
                    </p>
                </header>

                <div className="space-y-10 flex-1 pt-2 pb-8">

                    {ordenSecciones.filter(id => id !== 'perfil' && seccionesActivas.includes(id)).map((sectionId) => {
                        switch (sectionId) {
                            case 'experiencia':
                                return (
                                    <section key={sectionId}>
                                        <SectionHeader title="Experiencia Laboral" />
                                        <div className="space-y-8">
                                            {experiencia.map(exp => (
                                                <div key={exp.id} className="relative pl-6 border-l-2 border-gray-100">
                                                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-white border-2 border-gray-300" style={{ borderColor: accentColor }}></div>
                                                    <div className="flex justify-between items-baseline mb-2">
                                                        <h3 className="text-[13px] font-black text-[#112233]">{exp.cargo}</h3>
                                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-[9px] font-black uppercase">
                                                            {exp.fechaInicio}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] font-bold text-gray-400 mb-3">{exp.empresa}</p>
                                                    <div className="text-[10px] leading-relaxed text-gray-500 space-y-1.5 pl-1">
                                                        {renderBullets(exp.descripcion)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                );
                            case 'educacion':
                                return (
                                    <section key={sectionId}>
                                        <SectionHeader title="Educación" />
                                        <div className="space-y-6">
                                            {educacion.map(edu => (
                                                <div key={edu.id}>
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <h3 className="text-[12px] font-black text-[#112233]">{edu.titulo}</h3>
                                                        <span className="text-[10px] text-gray-400 font-bold">{edu.fechaFin}</span>
                                                    </div>
                                                    <p className="text-[11px] font-bold text-gray-400">{edu.institucion}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default TemplateVisual;
