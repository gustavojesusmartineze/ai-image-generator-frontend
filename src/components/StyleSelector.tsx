import React from 'react';
import { IconStyle } from '../types';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const STYLES: IconStyle[] = [
    {
        id: 1,
        name: "Pastel Outline",
        description: "Cute, flat vector with thick dark outlines and pastel fills.",
        visualPreview: "bg-purple-100 border-4 border-indigo-900"
    },
    {
        id: 2,
        name: "Celestial Sticker",
        description: "Round badge style with stars and dots background.",
        visualPreview: "bg-blue-50 border-2 border-dashed border-blue-300 rounded-full"
    },
    {
        id: 3,
        name: "Cloud Doodle",
        description: "Hand-drawn doodle style with organic shapes.",
        visualPreview: "bg-teal-50 border-2 border-teal-500 rounded-lg"
    },
    {
        id: 4,
        name: "Glossy 3D",
        description: "Soft 3D render with smooth gradients and no outlines.",
        visualPreview: "bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg"
    },
    {
        id: 5,
        name: "Negative Space",
        description: "Minimalist solid color glyph with negative space.",
        visualPreview: "bg-teal-700 text-white"
    }
];

interface StyleSelectorProps {
    selectedStyle: number;
    onSelect: (id: number) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {STYLES.map((style) => (
                <motion.div
                    key={style.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(style.id)}
                    className={`
            cursor-pointer p-4 rounded-xl border-2 transition-all relative overflow-hidden
            ${selectedStyle === style.id
                            ? 'border-blue-600 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-blue-300 bg-white'}
          `}
                >
                    {selectedStyle === style.id && (
                        <div className="absolute top-2 right-2 text-blue-600">
                            <Check size={16} />
                        </div>
                    )}

                    <div className={`w-12 h-12 mb-3 rounded-lg ${style.visualPreview} flex items-center justify-center`}>
                        {/* Abstract representation */}
                        <div className="w-6 h-6 bg-current opacity-20 rounded-full"></div>
                    </div>

                    <h3 className="font-bold text-sm text-gray-800 mb-1">{style.name}</h3>
                    <p className="text-xs text-gray-500 leading-tight">{style.description}</p>
                </motion.div>
            ))}
        </div>
    );
};
