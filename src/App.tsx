import React, { useState } from 'react';
import { StyleSelector } from './components/StyleSelector';
import { PromptInput } from './components/PromptInput';

// Use env var or default to localhost for dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function App() {
    const [selectedStyle, setSelectedStyle] = useState<number>(1);
    return (
        <div>
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
            </div>
        </div>
    );
}

export default App;
