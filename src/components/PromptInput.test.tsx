import { render, screen, fireEvent } from '@testing-library/react';
import { PromptInput } from './PromptInput';
import { describe, it, expect, vi } from 'vitest';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
    Search: () => <div data-testid="search-icon">Search</div>,
    Palette: () => <div data-testid="palette-icon">Palette</div>,
}));

describe('PromptInput', () => {
    const defaultProps = {
        prompt: '',
        setPrompt: vi.fn(),
        colors: '',
        setColors: vi.fn(),
        onGenerate: vi.fn(),
        isLoading: false,
    };

    it('renders input fields correctly', () => {
        render(<PromptInput {...defaultProps} />);

        expect(screen.getByPlaceholderText('e.g., Toys, Fruit, Space, Office Supplies')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('#FF5733, #33FF57')).toBeInTheDocument();
        expect(screen.getByText('Generate Icons')).toBeInTheDocument();
    });

    it('calls setPrompt when prompt input changes', () => {
        render(<PromptInput {...defaultProps} />);

        const input = screen.getByPlaceholderText('e.g., Toys, Fruit, Space, Office Supplies');
        fireEvent.change(input, { target: { value: 'New Prompt' } });

        expect(defaultProps.setPrompt).toHaveBeenCalledWith('New Prompt');
    });

    it('calls setColors when colors input changes', () => {
        render(<PromptInput {...defaultProps} />);

        const input = screen.getByPlaceholderText('#FF5733, #33FF57');
        fireEvent.change(input, { target: { value: '#000000' } });

        expect(defaultProps.setColors).toHaveBeenCalledWith('#000000');
    });

    it('calls onGenerate when generate button is clicked', () => {
        render(<PromptInput {...defaultProps} prompt="Valid Prompt" />);

        const button = screen.getByText('Generate Icons');
        fireEvent.click(button);

        expect(defaultProps.onGenerate).toHaveBeenCalled();
    });

    it('calls onGenerate when Enter key is pressed in prompt input', () => {
        render(<PromptInput {...defaultProps} prompt="Valid Prompt" />);

        const input = screen.getByPlaceholderText('e.g., Toys, Fruit, Space, Office Supplies');
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(defaultProps.onGenerate).toHaveBeenCalled();
    });

    it('disables button and inputs when isLoading is true', () => {
        render(<PromptInput {...defaultProps} isLoading={true} prompt="Valid Prompt" />);

        expect(screen.getByPlaceholderText('e.g., Toys, Fruit, Space, Office Supplies')).toBeDisabled();
        expect(screen.getByPlaceholderText('#FF5733, #33FF57')).toBeDisabled();

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(screen.getByText('Generating...')).toBeInTheDocument();
    });

    it('disables generate button when prompt is empty', () => {
        render(<PromptInput {...defaultProps} prompt="   " />);

        const button = screen.getByText('Generate Icons');
        expect(button).toBeDisabled();
    });
});
