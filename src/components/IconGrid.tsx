import React from 'react';
import { GeneratedIcon } from '../types';
import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';

interface IconGridProps {
    icons: GeneratedIcon[];
    isLoading: boolean;
}

export const IconGrid: React.FC<IconGridProps> = ({ icons, isLoading }) => {
    const handleDownload = async (url: string, name: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${name.replace(/\s+/g, '-').toLowerCase()}-icon.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback for cross-origin issues if simple fetch fails
            window.open(url, '_blank');
        }
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (icons.length === 0) {
        return (
            <div className="text-center py-20 text-gray-400">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExternalLink size={24} className="opacity-50" />
                </div>
                <p>Enter a topic and select a style to generate icons.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {icons.map((icon, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                    <div className="aspect-square p-4 flex items-center justify-center bg-gray-50">
                        <img
                            src={icon.url}
                            alt={icon.item}
                            className="w-full h-full object-contain drop-shadow-sm"
                            loading="lazy"
                        />
                    </div>

                    <div className="p-4 border-t border-gray-50">
                        <h3 className="font-medium text-gray-800 capitalize truncate">{icon.item}</h3>
                    </div>

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                        <button
                            onClick={() => handleDownload(icon.url, icon.item)}
                            className="p-2 bg-white rounded-full text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-lg"
                            title="Download PNG"
                        >
                            <Download size={20} />
                        </button>
                        <button
                            onClick={() => window.open(icon.url, '_blank')}
                            className="p-2 bg-white rounded-full text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-lg"
                            title="Open Full Size"
                        >
                            <ExternalLink size={20} />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
