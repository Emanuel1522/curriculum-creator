export const defaultCV = {
    template: 'minimal', // 'minimal' or 'visual'
    accentColor: '#1E3A5F',
    personal: {
        nombre: 'Carlos Mendoza',
        titulo: 'Técnico en Administración de Empresas',
        ciudad: 'Bogotá, Colombia',
        email: 'carlos.mendoza@email.com',
        telefono: '+57 300 123 4567',
        linkedin: 'linkedin.com/in/carlosmendoza',
        portfolio: '',
        foto: null,
    },
    perfil: 'Profesional organizado y proactivo con 4 años de experiencia en administración y atención al cliente. Capacidad para trabajar en equipo, gestionar múltiples tareas y adaptarme a entornos cambiantes.',
    experiencia: [
        {
            id: 1,
            cargo: 'Asistente Administrativo',
            empresa: 'Empresa ABC S.A.S',
            fechaInicio: 'ENE 2021',
            fechaFin: 'DIC 2022',
            actual: false,
            descripcion: 'Gestión de documentación y archivo físico y digital.\nApoyo en la coordinación de agenda de gerencia.\nAtención telefónica y presencial a clientes.',
        },
        {
            id: 2,
            cargo: 'Auxiliar Contable',
            empresa: 'Contadores XYZ Ltda',
            fechaInicio: 'ENE 2023',
            fechaFin: '',
            actual: true,
            descripcion: 'Registro de facturas y conciliaciones bancarias.\nElaboración de informes financieros mensuales.\nManejo de software contable Siigo.',
        },
    ],
    educacion: [
        {
            id: 1,
            titulo: 'Técnico en Administración de Empresas',
            institucion: 'SENA',
            fechaFin: '2020',
        },
    ],
    habilidades: {
        categorias: [
            { id: 1, nombre: 'Herramientas', items: ['Excel avanzado', 'Word', 'Google Workspace', 'Siigo'] },
            { id: 2, nombre: 'Competencias', items: ['Atención al cliente', 'Trabajo en equipo', 'Organización', 'Comunicación'] },
        ],
    },
    proyectos: [],
    idiomas: [
        { id: 1, idioma: 'Español', nivel: 'Nativo' },
        { id: 2, idioma: 'Inglés', nivel: 'B1' },
    ],
    cursos: [
        { id: 1, nombre: 'Excel Empresarial Avanzado', institucion: 'Platzi', año: '2023' },
        { id: 2, nombre: 'Atención al Cliente y Servicio', institucion: 'SENA', año: '2022' },
    ],
    seccionesPersonalizadas: [],
    seccionesActivas: ['perfil', 'experiencia', 'educacion', 'habilidades', 'idiomas', 'cursos'],
    ordenSecciones: ['perfil', 'experiencia', 'educacion', 'habilidades', 'idiomas', 'cursos'],
};
