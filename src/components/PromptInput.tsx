import React from 'react';
import { Search, Palette } from 'lucide-react';

interface PromptInputProps {
    prompt: string;
    setPrompt: (value: string) => void;
    colors: string;
    setColors: (value: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
    prompt,
    setPrompt,
    colors ='#ffffff',
    setColors,
    onGenerate,
    isLoading
}) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading && prompt.trim()) {
            onGenerate();
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                        Icon Topic
                    </label>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g., Toys, Fruit, Space, Office Supplies"
                            className="h-16 w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="md:w-1/3">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                        Brand Colors, Comma Separated, Hex (Optional)
                    </label>
                    <div className="relative">
                                <Palette className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="color"
                            value={colors}
                            onChange={(e) => setColors(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="#FF5733, #33FF57"
                            className="h-16 w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={onGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className={`
            px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform
            ${isLoading || !prompt.trim()
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 hover:shadow-xl active:scale-95'}
          `}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </span>
                    ) : (
                        'Generate Icons'
                    )}
                </button>
            </div>
        </div>
    );
};
