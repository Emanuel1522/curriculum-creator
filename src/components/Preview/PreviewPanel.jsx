import React, { useRef, useState } from 'react';
import TemplateMinimal from './TemplateMinimal';
import TemplateVisual from './TemplateVisual';
import { useOverflow } from '../../hooks/useOverflow';
import OverflowWarning from '../Editor/OverflowWarning';
import { Search, ZoomIn, ZoomOut } from 'lucide-react';

const PreviewPanel = ({ cvData, updateField }) => {
    const previewRef = useRef(null);
    const exportRef = useRef(null);
    const [zoom, setZoom] = useState(0.7);
    const [numPages, setNumPages] = useState(1);
    const PAGE_HEIGHT = 1123;
    const PAGE_WIDTH = 794;
    const MARGIN_TOP = 60;
    const MARGIN_BOTTOM = 60;
    const CONTENT_HEIGHT = PAGE_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;

    // Auto-calculate zoom for mobile
    React.useEffect(() => {
        const calculateZoom = () => {
            const width = window.innerWidth;
            if (width < 768) {
                // For mobile, leave some margin (around 32px total)
                const availableWidth = width - 32;
                const targetZoom = availableWidth / PAGE_WIDTH;
                setZoom(Math.min(targetZoom, 0.6)); // Max auto-zoom for mobile is 0.6
            } else if (width < 1024) {
                setZoom(0.65);
            } else {
                setZoom(0.7);
            }
        };

        calculateZoom();
        window.addEventListener('resize', calculateZoom);
        return () => window.removeEventListener('resize', calculateZoom);
    }, []);

    // Update number of pages based on actual content height
    React.useEffect(() => {
        const checkHeight = () => {
            if (previewRef.current) {
                const height = previewRef.current.scrollHeight;
                // Add a small 10px buffer to prevent premature splitting
                const pages = Math.max(1, Math.ceil((height - 10) / CONTENT_HEIGHT));
                if (pages !== numPages) {
                    setNumPages(pages);
                }
            }
        };

        const timer = setTimeout(checkHeight, 500); // Wait for content to settle
        return () => clearTimeout(timer);
    }, [cvData, numPages]);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.2));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4));

    const renderTemplate = (ref, isExport = false) => {
        const props = { cvData, isExport, containerRef: ref };
        return (
            <div className="relative">
                {cvData.template === 'visual'
                    ? <TemplateVisual {...props} />
                    : <TemplateMinimal {...props} />}
            </div>
        );
    };

    const accentColors = [
        '#1e3a5f', // Azul marino
        '#6366f1', // Indigo
        '#00c896', // Verde esmeralda
        '#ff4757', // Rojo coral
        '#ffa502', // Naranja
        '#2f3542'  // Gris antracita
    ];

    return (
        <div className="relative flex flex-col items-center w-full h-full min-h-screen py-8 overflow-x-hidden">
            {/* Floating Controls Area (Right) */}
            <div className="fixed top-24 right-6 flex flex-col gap-4 z-40">
                {/* Color Picker for Template Visual */}
                {cvData.template === 'visual' && (
                    <div className="bg-white p-2.5 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-2.5">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest text-center px-1">Acento</span>
                        {accentColors.map(color => (
                            <button
                                key={color}
                                onClick={() => updateField('accentColor', color)}
                                className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-125 ${cvData.accentColor === color ? 'border-blue-500 scale-110 shadow-lg' : 'border-transparent'}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                )}

                {/* Zoom Controls */}
                <div className="bg-white p-1.5 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-1">
                    <button
                        onClick={handleZoomIn}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-gray-50 rounded-xl transition-all"
                        title="Acercar"
                    >
                        <ZoomIn size={18} />
                    </button>
                    <div className="h-px bg-gray-100 mx-2"></div>
                    <button
                        onClick={handleZoomOut}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-gray-50 rounded-xl transition-all"
                        title="Alejar"
                    >
                        <ZoomOut size={18} />
                    </button>
                </div>
            </div>

            <div
                className="flex flex-col gap-12 transition-transform duration-500 ease-out origin-top items-center pointer-events-none"
                style={{
                    transform: `scale(${zoom})`,
                    marginBottom: `-${(numPages * PAGE_HEIGHT + (numPages - 1) * 48) * (1 - zoom)}px`
                }}
            >
                {[...Array(numPages)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white overflow-hidden relative shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 pointer-events-auto"
                        style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px` }}
                    >
                        {/* Fix Sidebar Gap for Visual Template */}
                        {cvData.template === 'visual' && (
                            <div
                                className="absolute left-0 top-0 w-[260px] h-full z-0"
                                style={{ backgroundColor: cvData.accentColor }}
                            />
                        )}

                        {/* Page Content Window */}
                        <div
                            className="relative overflow-hidden z-10"
                            style={{
                                height: `${CONTENT_HEIGHT}px`,
                                marginTop: `${MARGIN_TOP}px`,
                                marginBottom: `${MARGIN_BOTTOM}px`,
                                width: '100%'
                            }}
                        >
                            <div
                                style={{
                                    transform: `translateY(-${i * CONTENT_HEIGHT}px)`,
                                    width: '100%'
                                }}
                            >
                                {i === 0 ? renderTemplate(previewRef) : renderTemplate(null)}
                            </div>
                        </div>

                        {/* Page Number Indicator */}
                        <div className="absolute bottom-6 right-10 text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em] z-20">
                            {numPages > 1 ? `Hojas: ${i + 1} / ${numPages}` : ''}
                        </div>
                    </div>
                ))}
            </div>

            {/* Export Target (Real scale, hidden from view) */}
            <div
                id="cv-export-target"
                className="absolute top-0 left-[-9999px] flex flex-col"
                data-pages={numPages}
            >
                {[...Array(numPages)].map((_, i) => (
                    <div
                        key={i}
                        id={`export-page-${i}`}
                        className="bg-white overflow-hidden relative"
                        style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px` }}
                    >
                        {/* Fix Sidebar Gap for Visual Template */}
                        {cvData.template === 'visual' && (
                            <div
                                className="absolute left-0 top-0 w-[260px] h-full z-0"
                                style={{ backgroundColor: cvData.accentColor }}
                            />
                        )}

                        <div
                            className="relative overflow-hidden z-10"
                            style={{
                                height: `${CONTENT_HEIGHT}px`,
                                marginTop: `${MARGIN_TOP}px`,
                                marginBottom: `${MARGIN_BOTTOM}px`,
                                width: '100%'
                            }}
                        >
                            <div
                                style={{
                                    transform: `translateY(-${i * CONTENT_HEIGHT}px)`,
                                    width: '100%'
                                }}
                            >
                                {i === 0 ? renderTemplate(exportRef, true) : renderTemplate(null, true)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Overflow Warning at the bottom of the editor scroll area technically,
          but here we place it as a fixed alert if needed. In EditorLayout we handle the left panel. */}
        </div>
    );
};

export default PreviewPanel;
