import React, { useState } from 'react';
import FormPanel from './FormPanel';
import PreviewPanel from '../Preview/PreviewPanel';
import { Download, RefreshCw, Smartphone, Laptop, Plus, ArrowLeft } from 'lucide-react';
import { exportToPDF } from '../../utils/exportPDF';
import Swal from 'sweetalert2';

const EditorLayout = ({
    cvData,
    updateField,
    updatePersonal,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    moveSection,
    toggleSection,
    onNewCV
}) => {
    const [isExporting, setIsExporting] = useState(false);
    const [activeTab, setActiveTab] = useState('edit'); // For mobile: 'edit' or 'preview'

    const handleDownload = async () => {
        if (!cvData.personal.nombre) {
            Swal.fire({
                title: 'Nombre requerido',
                text: 'Por favor, ingresa tu nombre antes de exportar.',
                icon: 'warning',
                confirmButtonColor: '#1e3a5f',
            });
            return;
        }

        setIsExporting(true);
        try {
            await exportToPDF('cv-export-target', `CV-${cvData.personal.nombre.replace(/\s+/g, '-')}`);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al generar el PDF. Inténtalo de nuevo.',
                icon: 'error',
                confirmButtonColor: '#1e3a5f',
            });
        } finally {
            setIsExporting(false);
        }
    };

    const handleBack = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Volverás al inicio y podrías perder los cambios no guardados localmente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1e3a5f',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, volver',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                onNewCV();
            }
        });
    };

    return (
        <div className="flex flex-col h-screen bg-[#F5F5F7]">
            {/* Top Bar */}
            <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleBack}
                        className="p-2.5 bg-gray-50 text-gray-700 rounded-xl md:hidden flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all"
                        aria-label="Volver"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-[#1e3a5f]">
                            <Laptop size={18} />
                        </div>
                        <span className="text-xl font-extrabold text-[#112233]">
                            CVBuilder
                        </span>
                    </div>
                </div>

                {/* Desktop Controls */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-5 py-2.5 text-gray-500 font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-[0.98]"
                        title="Volver al inicio"
                    >
                        <ArrowLeft size={18} /> Volver
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={isExporting}
                        className={`flex items-center gap-2 px-8 py-2.5 bg-[#00c896] hover:bg-[#00b085] text-white rounded-xl transition-all font-bold shadow-lg shadow-[#00c896]/10 active:scale-[0.98] ${isExporting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        <Download size={18} /> {isExporting ? 'Exportando...' : 'Descargar PDF'}
                    </button>
                </div>

                {/* Mobile Tab Switcher */}
                <div className="flex md:hidden bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('edit')}
                        className={`px-4 py-1.5 rounded-lg flex items-center gap-2 text-sm font-bold transition-all ${activeTab === 'edit' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                    >
                        <Smartphone size={16} /> Editar
                    </button>
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-4 py-1.5 rounded-lg flex items-center gap-2 text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                    >
                        <Laptop size={16} /> Vista
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Form Panel */}
                <div className={`${activeTab === 'edit' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[40%] bg-white border-r border-gray-200 overflow-y-auto`}>
                    <FormPanel
                        cvData={cvData}
                        updatePersonal={updatePersonal}
                        updateField={updateField}
                        updateArrayItem={updateArrayItem}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        moveSection={moveSection}
                        toggleSection={toggleSection}
                    />
                </div>

                {/* Preview Panel */}
                <div className={`${activeTab === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-[#EBEBEB] overflow-y-auto items-center justify-center p-0 md:p-8`}>
                    <PreviewPanel cvData={cvData} updateField={updateField} />
                </div>
            </div>

            {/* Mobile Download Button (Sticky Bottom) */}
            <div className="md:hidden p-4 bg-white border-t border-gray-200 sticky bottom-0 z-50">
                <button
                    onClick={handleDownload}
                    disabled={isExporting}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg"
                >
                    <Download size={20} /> {isExporting ? 'Generando...' : 'Descargar PDF'}
                </button>
            </div>

            {/* Overlay de carga */}
            {isExporting && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex flex-col items-center justify-center text-white">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-4"></div>
                    <p className="text-xl font-bold">Generando tu PDF increíble...</p>
                </div>
            )}
        </div>
    );
};

export default EditorLayout;
