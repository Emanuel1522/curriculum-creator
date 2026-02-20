import React from 'react';

const TemplateMinimal = ({ cvData, containerRef, isExport = false }) => {
    const { personal, perfil, experiencia, educacion, habilidades, idiomas, cursos, seccionesActivas, ordenSecciones } = cvData;

    const renderBullets = (text) => {
        if (!text) return null;
        return text.split('\n').filter(line => line.trim()).map((line, i) => (
            <div key={i} className="flex gap-2">
                <span>•</span>
                <span className="flex-1">{line}</span>
            </div>
        ));
    };

    return (
        <div
            ref={containerRef}
            className={`font-inter bg-white text-[#1A1A1A] p-[40px] pt-[32px] pb-[32px] w-[794px] flex flex-col ${isExport ? '' : ''}`}
        >
            {/* Header */}
            <header className="mb-6 text-center md:text-left">
                <h1 className="text-[28px] font-bold uppercase tracking-tight mb-2">
                    {personal.nombre || '[Tu Nombre]'}
                </h1>
                <div className="text-[11px] text-gray-600 flex flex-wrap justify-center md:justify-start gap-x-2 gap-y-1">
                    {personal.ciudad && <span>📍 {personal.ciudad}</span>}
                    {(personal.ciudad && personal.email) && <span>|</span>}
                    {personal.email && <span>✉ {personal.email}</span>}
                    {(personal.email && personal.telefono) && <span>|</span>}
                    {personal.telefono && <span>📱 {personal.telefono}</span>}
                    {personal.linkedin && (
                        <>
                            <span>|</span>
                            <a
                                href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition-colors pointer-events-auto cursor-pointer"
                            >
                                🔗 {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                        </>
                    )}
                </div>
            </header>

            {/* Profile */}
            {seccionesActivas.includes('perfil') && perfil && (
                <section className="mb-6">
                    <h2 className="text-[12px] font-bold uppercase tracking-[1.5px] border-b border-gray-200 pb-1 mb-2">
                        Perfil Profesional
                    </h2>
                    <p className="text-[11px] leading-relaxed text-gray-700">
                        {perfil}
                    </p>
                </section>
            )}

            {/* Dynamic Sections */}
            <div className="space-y-6">
                {ordenSecciones.filter(id => id !== 'perfil' && seccionesActivas.includes(id)).map((sectionId) => {
                    switch (sectionId) {
                        case 'experiencia':
                            return (
                                <section key={sectionId}>
                                    <h2 className="text-[12px] font-bold uppercase tracking-[1.5px] border-b border-gray-200 pb-1 mb-3">
                                        Experiencia Laboral
                                    </h2>
                                    <div className="space-y-4">
                                        {experiencia.map((exp) => (
                                            <div key={exp.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h3 className="text-[12px] font-bold">
                                                        {exp.cargo || '[Cargo]'} — {exp.empresa || '[Empresa]'}
                                                    </h3>
                                                    <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap ml-4">
                                                        {exp.fechaInicio} {exp.fechaFin ? `- ${exp.fechaFin}` : (exp.actual ? '- Actualidad' : '')}
                                                    </span>
                                                </div>
                                                <div className="text-[11px] leading-relaxed space-y-0.5 text-gray-700">
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
                                    <h2 className="text-[12px] font-bold uppercase tracking-[1.5px] border-b border-gray-200 pb-1 mb-3">
                                        Educación
                                    </h2>
                                    <div className="space-y-3">
                                        {educacion.map((edu) => (
                                            <div key={edu.id} className="flex justify-between items-baseline">
                                                <div>
                                                    <h3 className="text-[12px] font-bold">{edu.titulo || '[Título]'}</h3>
                                                    <p className="text-[11px] text-gray-600">{edu.institucion}</p>
                                                </div>
                                                <span className="text-[11px] text-gray-500 font-medium">
                                                    {edu.fechaFin}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        case 'habilidades':
                            return (
                                <section key={sectionId}>
                                    <h2 className="text-[12px] font-bold uppercase tracking-[1.5px] border-b border-gray-200 pb-1 mb-3">
                                        Habilidades Clave
                                    </h2>
                                    <div className="space-y-2">
                                        {habilidades.categorias.map((cat) => (
                                            <div key={cat.id} className="text-[11px]">
                                                <span className="font-bold">{cat.nombre}:</span> {cat.items.join(', ')}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        case 'idiomas':
                            return (
                                <section key={sectionId}>
                                    <h2 className="text-[12px] font-bold uppercase tracking-[1.5px] border-b border-gray-200 pb-1 mb-3">Idiomas</h2>
                                    <div className="flex gap-6">
                                        {idiomas.map(idioma => (
                                            <div key={idioma.id} className="text-[11px]">
                                                <span className="font-bold">{idioma.idioma}:</span> {idioma.nivel}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        case 'cursos':
                            return (
                                <section key={sectionId}>
                                    <h2 className="text-[12px] font-bold uppercase tracking-[1.5px] border-b border-gray-200 pb-1 mb-3">Certificaciones</h2>
                                    <div className="space-y-1">
                                        {cursos.map(curso => (
                                            <div key={curso.id} className="text-[11px] flex justify-between">
                                                <span><span className="font-bold">{curso.nombre}</span> — {curso.institucion}</span>
                                                <span className="text-gray-500">{curso.año}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

export default TemplateMinimal;
