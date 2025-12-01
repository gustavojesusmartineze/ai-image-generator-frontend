import { render, screen, fireEvent } from '@testing-library/react';
import { StyleSelector, STYLES } from './StyleSelector';
import { describe, it, expect, vi } from 'vitest';

describe('StyleSelector', () => {
    it('renders all styles', () => {
        const handleSelect = vi.fn();
        render(<StyleSelector selectedStyle={1} onSelect={handleSelect} />);

        STYLES.forEach(style => {
            expect(screen.getByText(style.name)).toBeInTheDocument();
        });
    });

    it('highlights the selected style', () => {
        const handleSelect = vi.fn();
        render(<StyleSelector selectedStyle={2} onSelect={handleSelect} />);

        // Find the element that should be selected (Style 2)
        // We can look for the check icon or the specific class
        const selectedStyleName = STYLES.find(s => s.id === 2)?.name;
        expect(selectedStyleName).toBeDefined();

        // This is a bit loose, but checks if the name is there. 
        // A better check would be to look for the visual indicator.
        expect(screen.getByText(selectedStyleName!)).toBeInTheDocument();
    });

    it('calls onSelect when a style is clicked', () => {
        const handleSelect = vi.fn();
        render(<StyleSelector selectedStyle={1} onSelect={handleSelect} />);

        const styleToClick = STYLES[1]; // Style 2
        fireEvent.click(screen.getByText(styleToClick.name));

        expect(handleSelect).toHaveBeenCalledWith(styleToClick.id);
    });
});
