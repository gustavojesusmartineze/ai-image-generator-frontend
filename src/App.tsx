import { useState } from 'react';
import { StyleSelector } from './components/StyleSelector';
import { PromptInput } from './components/PromptInput';
import { IconGrid } from './components/IconGrid';
import { ErrorToast } from './components/ErrorToast';
import { GeneratedIcon } from './types';
import axios from 'axios';

// Use env var or default to localhost for dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function App() {
    const [selectedStyle, setSelectedStyle] = useState<number>(1);
    const [prompt, setPrompt] = useState<string>('');
    const [colors, setColors] = useState<string>('');
    const [icons, setIcons] = useState<GeneratedIcon[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setIcons([]); // Clear previous icons

        try {
            const response = await axios.post(`${API_URL}/generate-icons`, {
                prompt,
                styleId: selectedStyle,
                colors: colors || undefined
            });

            setIcons(response.data.icons);
        } catch (err: any) {
            console.error('Generation failed:', err);
            const errorMessage = err.response?.data?.error || err.message || 'Failed to generate icons. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100">
            <div className="max-w-6xl mx-auto px-4 py-12">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 tracking-tight">
                        Gustavo's AI Generator
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Choose a style, enter a topic, and let AI do the rest.
                    </p>
                </div>

                {/* Main Interface */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">1. Select Style</h2>
                        <StyleSelector selectedStyle={selectedStyle} onSelect={setSelectedStyle} />
                    </section>

                    <section>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">2. Describe & Customize</h2>
                        <PromptInput
                            prompt={prompt}
                            setPrompt={setPrompt}
                            colors={colors}
                            setColors={setColors}
                            onGenerate={handleGenerate}
                            isLoading={isLoading}
                        />
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">3. Results</h2>
                            {icons.length > 0 && !isLoading && (
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    Generated Successfully
                                </span>
                            )}
                        </div>
                        <IconGrid icons={icons} isLoading={isLoading} />
                    </section>
                </div>

            </div>

            <ErrorToast message={error} onClose={() => setError(null)} />
        </div>
    );
}

export default App;
