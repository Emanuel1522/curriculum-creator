import React from 'react';
import { AlertCircle } from 'lucide-react';

const OverflowWarning = () => {
    return (
        <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
            <AlertCircle className="text-orange-500 shrink-0" size={20} />
            <div className="text-sm font-medium">
                <p className="font-bold">⚠️ Tu CV supera una página</p>
                <p className="text-orange-700/80">Considera acortar descripciones o eliminar secciones.</p>
            </div>
        </div>
    );
};

export default OverflowWarning;
