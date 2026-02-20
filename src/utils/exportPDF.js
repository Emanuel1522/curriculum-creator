import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId, fileName = 'mi-hoja-de-vida') => {
    const parent = document.getElementById(elementId);
    if (!parent) return;

    const numPages = parseInt(parent.dataset.pages) || 1;

    try {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        for (let i = 0; i < numPages; i++) {
            const pageId = `export-page-${i}`;
            const pageElement = document.getElementById(pageId);
            if (!pageElement) continue;

            if (i > 0) pdf.addPage();

            // html-to-image handles modern CSS (like oklch) much better than html2canvas
            const dataUrl = await toJpeg(pageElement, {
                quality: 0.95,
                pixelRatio: 2,
                backgroundColor: '#ffffff',
                width: 794,
                height: 1123,
            });

            pdf.addImage(dataUrl, 'JPEG', 0, 0, 210, 297);
        }

        pdf.save(`${fileName}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};
