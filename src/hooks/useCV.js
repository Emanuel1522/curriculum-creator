import { useState, useEffect } from 'react';
import { defaultCV } from '../data/defaultCV';

const LS_KEY = 'cvbuilder_data';

export const useCV = () => {
    const [cvData, setCvData] = useState(() => {
        try {
            const saved = localStorage.getItem(LS_KEY);
            if (!saved) return defaultCV;

            const parsed = JSON.parse(saved);
            // Deep merge to ensure new fields (like ordenSecciones) are present even if loading old data
            return {
                ...defaultCV,
                ...parsed,
                personal: { ...defaultCV.personal, ...parsed.personal },
                habilidades: { ...defaultCV.habilidades, ...parsed.habilidades },
            };
        } catch (error) {
            console.error("Error loading CV data:", error);
            return defaultCV;
        }
    });

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(cvData));
    }, [cvData]);

    const updatePersonal = (field, value) => {
        setCvData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const updateField = (field, value) => {
        setCvData(prev => ({ ...prev, [field]: value }));
    };

    const updateArrayItem = (section, id, field, value) => {
        setCvData(prev => ({
            ...prev,
            [section]: prev[section].map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addArrayItem = (section, newItem) => {
        setCvData(prev => ({
            ...prev,
            [section]: [...prev[section], { ...newItem, id: Date.now() }]
        }));
    };

    const removeArrayItem = (section, id) => {
        setCvData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const moveSection = (direction, sectionName) => {
        setCvData(prev => {
            const index = prev.ordenSecciones.indexOf(sectionName);
            if (index === -1) return prev;

            const newOrder = [...prev.ordenSecciones];
            if (direction === 'up' && index > 0) {
                [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
            } else if (direction === 'down' && index < newOrder.length - 1) {
                [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
            }

            return { ...prev, ordenSecciones: newOrder };
        });
    };

    const toggleSection = (sectionName) => {
        setCvData(prev => {
            const isActive = prev.seccionesActivas.includes(sectionName);
            return {
                ...prev,
                seccionesActivas: isActive
                    ? prev.seccionesActivas.filter(s => s !== sectionName)
                    : [...prev.seccionesActivas, sectionName]
            };
        });
    };

    const resetCV = () => {
        localStorage.removeItem(LS_KEY);
        setCvData(defaultCV);
    };

    return {
        cvData,
        updatePersonal,
        updateField,
        updateArrayItem,
        addArrayItem,
        removeArrayItem,
        moveSection,
        toggleSection,
        resetCV,
        setCvData
    };
};
