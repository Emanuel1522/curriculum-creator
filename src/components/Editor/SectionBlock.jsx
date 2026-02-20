import React from 'react';
import { ChevronUp, ChevronDown, Eye, EyeOff, GripVertical } from 'lucide-react';

const SectionBlock = ({
    id,
    title,
    icon,
    children,
    expanded,
    onToggle,
    onMoveUp,
    onMoveDown,
    onDelete,
    canDelete = true,
    isVisible = true
}) => {
    return (
        <section className="bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300">
            <div
                className={`px-5 py-4 flex items-center justify-between cursor-pointer transition-colors ${expanded ? 'bg-gray-50/50' : 'bg-white hover:bg-gray-50'}`}
                onClick={onToggle}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${expanded ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-gray-100 text-gray-500'}`}>
                        {icon}
                    </div>
                    <h3 className={`font-bold transition-colors ${expanded ? 'text-[#1e3a5f]' : 'text-gray-600'}`}>
                        {title}
                    </h3>
                </div>

                <div className="flex items-center gap-2">
                    {/* Reorder controls (hidden on small screens or when first/last? using buttons for simplicity) */}
                    <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-0.5 mr-2" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={onMoveUp}
                            className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-400 hover:text-blue-600"
                            title="Subir sección"
                        >
                            <ChevronUp size={14} />
                        </button>
                        <button
                            onClick={onMoveDown}
                            className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-400 hover:text-blue-600"
                            title="Bajar sección"
                        >
                            <ChevronDown size={14} />
                        </button>
                    </div>

                    {/* Visibility toggle (was Delete) */}
                    {canDelete && onDelete && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(); }}
                            className={`p-2 rounded-xl transition-all ${isVisible ? 'text-blue-500 hover:bg-blue-50' : 'text-gray-300 hover:bg-gray-100'}`}
                            title={isVisible ? "Ocultar sección" : "Mostrar sección"}
                        >
                            {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                    )}

                    {/* Expand Toggle icon is implied by the click area, but adding a visual indicator */}
                    <div className={`p-1.5 rounded-lg transition-transform duration-300 ${expanded ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}>
                        <ChevronDown size={20} />
                    </div>
                </div>
            </div>

            {expanded && (
                <div className="p-5 pt-2 border-t border-gray-100 animate-in fade-in slide-in-from-top-1 duration-300">
                    {children}
                </div>
            )}
        </section>
    );
};

export default SectionBlock;
