import React, { useState } from 'react';
import {
    User,
    Briefcase,
    GraduationCap,
    Wrench,
    Languages,
    Award,
    Plus,
    Trash2,
    Eye,
} from 'lucide-react';
import SectionBlock from './SectionBlock';

const InputField = ({ label, placeholder, value, onChange, type = "text", fullWidth = false }) => (
    <div className={fullWidth ? "col-span-full" : ""}>
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 pr-1">{label}</label>
        <input
            type={type}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm text-gray-700 font-medium placeholder:text-gray-300 shadow-sm"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    </div>
);

const FormPanel = ({
    cvData,
    updatePersonal,
    updateField,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    moveSection,
    toggleSection
}) => {
    const [expandedSections, setExpandedSections] = useState(['personal', 'perfil']);

    const toggleExpand = (section) => {
        setExpandedSections(prev =>
            prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
        );
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatePersonal('foto', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-8 pb-32 max-w-2xl mx-auto md:mx-0">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-extrabold text-[#112233]">Editor</h2>
            </div>

            {/* SECCIÓN: DATOS PERSONALES */}
            <SectionBlock
                id="personal"
                title="Datos Personales"
                icon={<User size={18} />}
                expanded={expandedSections.includes('personal')}
                onToggle={() => toggleExpand('personal')}
                canDelete={false}
            >
                <div className="space-y-6">
                    {/* Photo Upload Area */}
                    {cvData.template === 'visual' && (
                        <div className="pb-4">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Foto de Perfil</label>
                            <div className="flex items-center gap-5">
                                <div className="relative group">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden text-gray-400 group-hover:border-blue-400 group-hover:text-blue-500 transition-all">
                                        {cvData.personal.foto ? (
                                            <img src={cvData.personal.foto} className="w-full h-full object-cover" alt="Profile" />
                                        ) : (
                                            <User size={24} />
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                                <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors relative">
                                    Subir imagen
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InputField
                            label="Nombre Completo"
                            value={cvData.personal.nombre}
                            onChange={(v) => updatePersonal('nombre', v)}
                            placeholder="Laura Martínez"
                            fullWidth
                        />
                        <InputField
                            label="Cargo / Título"
                            value={cvData.personal.titulo}
                            onChange={(v) => updatePersonal('titulo', v)}
                            placeholder="Diseñadora UX Senior"
                        />
                        <InputField
                            label="Email"
                            value={cvData.personal.email}
                            onChange={(v) => updatePersonal('email', v)}
                            placeholder="laura.ux@ejemplo.com"
                        />
                        <InputField
                            label="Teléfono"
                            value={cvData.personal.telefono}
                            onChange={(v) => updatePersonal('telefono', v)}
                            placeholder="+34 600 123 456"
                        />
                        <InputField
                            label="Ciudad"
                            value={cvData.personal.ciudad}
                            onChange={(v) => updatePersonal('ciudad', v)}
                            placeholder="Madrid, España"
                        />
                        <InputField
                            label="Link Profesional (Web, Portfolio, etc.)"
                            value={cvData.personal.linkedin}
                            onChange={(v) => updatePersonal('linkedin', v)}
                            placeholder="ejemplo.com o linkedin.com/in/usuario"
                        />
                    </div>
                </div>
            </SectionBlock>

            {/* SECCIÓN: PERFIL */}
            <SectionBlock
                id="perfil"
                title="Perfil Profesional"
                icon={<Briefcase size={18} />}
                expanded={expandedSections.includes('perfil')}
                onToggle={() => toggleExpand('perfil')}
                onMoveUp={() => moveSection('up', 'perfil')}
                onMoveDown={() => moveSection('down', 'perfil')}
                onDelete={() => toggleSection('perfil')}
            >
                <div className="space-y-4">
                    <textarea
                        className="w-full h-40 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm text-gray-700 font-medium placeholder:text-gray-300 shadow-sm resize-none"
                        value={cvData.perfil}
                        onChange={(e) => updateField('perfil', e.target.value)}
                        placeholder="Describe brevemente tu perfil profesional..."
                    />
                    <div className="text-right text-[11px] font-bold text-gray-400">
                        {cvData.perfil.length}
                    </div>
                </div>
            </SectionBlock>

            {/* DINÁMICAS */}
            {cvData.ordenSecciones.map((sectionId) => {
                if (sectionId === 'perfil') return null;

                let sectionTitle = "";
                let sectionIcon = null;
                let content = null;

                switch (sectionId) {
                    case 'experiencia':
                        sectionTitle = "Experiencia Laboral";
                        sectionIcon = <Briefcase size={18} />;
                        content = (
                            <div className="space-y-6">
                                {cvData.experiencia.map((exp) => (
                                    <div key={exp.id} className="relative p-5 bg-gray-50/50 rounded-2xl border border-gray-100 group">
                                        <button
                                            onClick={() => removeArrayItem('experiencia', exp.id)}
                                            className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="col-span-full">
                                                <InputField label="Empresa" value={exp.empresa} onChange={(v) => updateArrayItem('experiencia', exp.id, 'empresa', v)} placeholder="TechSolutions Inc." />
                                            </div>
                                            <div className="col-span-full">
                                                <InputField label="Cargo" value={exp.cargo} onChange={(v) => updateArrayItem('experiencia', exp.id, 'cargo', v)} placeholder="Senior Product Designer" />
                                            </div>
                                            <InputField label="Fecha Inicio" value={exp.fechaInicio} onChange={(v) => updateArrayItem('experiencia', exp.id, 'fechaInicio', v)} placeholder="ENE 2021" />
                                            <InputField label="Fecha Fin / Actual" value={exp.fechaFin} onChange={(v) => updateArrayItem('experiencia', exp.id, 'fechaFin', v)} placeholder="DIC 2022 o Actual" />
                                            <div className="col-span-full pt-2">
                                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 pr-1">Descripción</label>
                                                <textarea
                                                    className="w-full h-24 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm text-gray-700 font-medium placeholder:text-gray-300 shadow-sm resize-none"
                                                    value={exp.descripcion}
                                                    onChange={(e) => updateArrayItem('experiencia', exp.id, 'descripcion', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addArrayItem('experiencia', { cargo: '', empresa: '', fechaInicio: '', fechaFin: '', descripcion: '' })}
                                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-blue-200 hover:text-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} /> Agregar Experiencia
                                </button>
                            </div>
                        );
                        break;
                    case 'educacion':
                        sectionTitle = "Educación";
                        sectionIcon = <GraduationCap size={18} />;
                        content = (
                            <div className="space-y-6">
                                {cvData.educacion.map((edu) => (
                                    <div key={edu.id} className="relative p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                                        <button onClick={() => removeArrayItem('educacion', edu.id)} className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-10">
                                            <InputField label="Institución" value={edu.institucion} onChange={(v) => updateArrayItem('educacion', edu.id, 'institucion', v)} placeholder="Universidad Nacional" fullWidth />
                                            <InputField label="Título" value={edu.titulo} onChange={(v) => updateArrayItem('educacion', edu.id, 'titulo', v)} placeholder="Máster en Diseño" fullWidth />
                                            <div className="col-span-full">
                                                <InputField label="Año de Finalización" value={edu.fechaFin} onChange={(v) => updateArrayItem('educacion', edu.id, 'fechaFin', v)} placeholder="2017" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('educacion', { titulo: '', institucion: '', fechaFin: '' })} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-blue-200 hover:text-blue-500 transition-all flex items-center justify-center gap-2 text-sm">
                                    <Plus size={20} /> Agregar Educación
                                </button>
                            </div>
                        );
                        break;
                    case 'habilidades':
                        sectionTitle = "Habilidades Clave";
                        sectionIcon = <Wrench size={18} />;
                        content = (
                            <div className="space-y-6">
                                {cvData.habilidades.categorias.map((cat) => (
                                    <div key={cat.id} className="relative p-5 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <InputField
                                                    label="Categoría"
                                                    value={cat.nombre}
                                                    onChange={(v) => {
                                                        const newCats = cvData.habilidades.categorias.map(c =>
                                                            c.id === cat.id ? { ...c, nombre: v } : c
                                                        );
                                                        updateField('habilidades', { ...cvData.habilidades, categorias: newCats });
                                                    }}
                                                    placeholder="Ej: Herramientas"
                                                />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newCats = cvData.habilidades.categorias.filter(c => c.id !== cat.id);
                                                    updateField('habilidades', { ...cvData.habilidades, categorias: newCats });
                                                }}
                                                className="mt-6 p-2 text-gray-300 hover:text-red-500 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Habilidades (separadas por coma)</label>
                                            <textarea
                                                className="w-full h-20 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm text-gray-700 font-medium placeholder:text-gray-300 shadow-sm resize-none"
                                                value={cat.itemsString !== undefined ? cat.itemsString : cat.items.join(', ')}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    const items = val.split(',').map(i => i.trim()).filter(i => i !== '');
                                                    const newCats = cvData.habilidades.categorias.map(c =>
                                                        c.id === cat.id ? { ...c, items, itemsString: val } : c
                                                    );
                                                    updateField('habilidades', { ...cvData.habilidades, categorias: newCats });
                                                }}
                                                placeholder="Excel, Word, Siigo..."
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        const newCats = [...cvData.habilidades.categorias, { id: Date.now(), nombre: '', items: [] }];
                                        updateField('habilidades', { ...cvData.habilidades, categorias: newCats });
                                    }}
                                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-blue-200 hover:text-blue-500 transition-all flex items-center justify-center gap-2 text-sm"
                                >
                                    <Plus size={20} /> Agregar Categoría
                                </button>
                            </div>
                        );
                        break;
                    case 'idiomas':
                        sectionTitle = "Idiomas";
                        sectionIcon = <Languages size={18} />;
                        content = (
                            <div className="space-y-6">
                                {cvData.idiomas.map((idioma) => (
                                    <div key={idioma.id} className="relative p-5 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-4">
                                        <div className="flex-1 grid grid-cols-2 gap-4">
                                            <InputField label="Idioma" value={idioma.idioma} onChange={(v) => updateArrayItem('idiomas', idioma.id, 'idioma', v)} placeholder="Español" />
                                            <InputField label="Nivel" value={idioma.nivel} onChange={(v) => updateArrayItem('idiomas', idioma.id, 'nivel', v)} placeholder="Nativo" />
                                        </div>
                                        <button onClick={() => removeArrayItem('idiomas', idioma.id)} className="mt-6 p-2 text-gray-300 hover:text-red-500 transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('idiomas', { idioma: '', nivel: '' })} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-blue-200 hover:text-blue-500 transition-all flex items-center justify-center gap-2 text-sm">
                                    <Plus size={20} /> Agregar Idioma
                                </button>
                            </div>
                        );
                        break;
                    case 'cursos':
                        sectionTitle = "Certificaciones";
                        sectionIcon = <Award size={18} />;
                        content = (
                            <div className="space-y-6">
                                {cvData.cursos.map((curso) => (
                                    <div key={curso.id} className="relative p-5 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-4">
                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="sm:col-span-2">
                                                <InputField label="Nombre de la Certificación" value={curso.nombre} onChange={(v) => updateArrayItem('cursos', curso.id, 'nombre', v)} placeholder="Excel Avanzado" />
                                            </div>
                                            <InputField label="Institución" value={curso.institucion} onChange={(v) => updateArrayItem('cursos', curso.id, 'institucion', v)} placeholder="Platzi" />
                                            <InputField label="Año" value={curso.año} onChange={(v) => updateArrayItem('cursos', curso.id, 'año', v)} placeholder="2023" />
                                        </div>
                                        <button onClick={() => removeArrayItem('cursos', curso.id)} className="p-2 text-gray-300 hover:text-red-500 transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('cursos', { nombre: '', institucion: '', año: '' })} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-blue-200 hover:text-blue-500 transition-all flex items-center justify-center gap-2 text-sm">
                                    <Plus size={20} /> Agregar Certificación
                                </button>
                            </div>
                        );
                        break;
                    default:
                        return null;
                }

                return (
                    <SectionBlock
                        key={sectionId}
                        id={sectionId}
                        title={sectionTitle}
                        icon={sectionIcon}
                        expanded={expandedSections.includes(sectionId)}
                        isVisible={cvData.seccionesActivas.includes(sectionId)}
                        onToggle={() => toggleExpand(sectionId)}
                        onMoveUp={() => moveSection('up', sectionId)}
                        onMoveDown={() => moveSection('down', sectionId)}
                        onDelete={() => toggleSection(sectionId)}
                    >
                        {content}
                    </SectionBlock>
                );
            })}

            {/* Developer Credit in Editor */}
            <div className="pt-12 pb-8 text-center border-t border-gray-100">
                <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">
                    Creado por{' '}
                    <a
                        href="https://portafolio-lemon-psi.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#1e3a5f] transition-colors"
                    >
                        Emanuel1522
                    </a>
                </p>
            </div>
        </div>
    );
};

export default FormPanel;
