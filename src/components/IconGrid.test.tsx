import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IconGrid } from './IconGrid';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GeneratedIcon } from '../types';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
    Download: () => <div data-testid="download-icon">Download</div>,
    ExternalLink: () => <div data-testid="external-link-icon">ExternalLink</div>,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, onClick }: any) => (
            <div className={className} onClick={onClick}>
                {children}
            </div>
        ),
    },
}));

describe('IconGrid', () => {
    const mockIcons: GeneratedIcon[] = [
        { item: 'apple', url: 'http://example.com/apple.png' },
        { item: 'banana', url: 'http://example.com/banana.png' },
    ];

    beforeEach(() => {
        // Mock window.URL methods
        window.URL.createObjectURL = vi.fn(() => 'blob:url');
        window.URL.revokeObjectURL = vi.fn();

        // Mock fetch
        global.fetch = vi.fn(() =>
            Promise.resolve({
                blob: () => Promise.resolve(new Blob(['fake content'])),
            })
        ) as any;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading skeletons when isLoading is true', () => {
        render(<IconGrid icons={[]} isLoading={true} />);

        // Check for pulse animation class which indicates loading skeletons
        const skeletons = document.querySelectorAll('.animate-pulse');
        expect(skeletons.length).toBe(4);
    });

    it('renders empty state when not loading and no icons', () => {
        render(<IconGrid icons={[]} isLoading={false} />);

        expect(screen.getByText('Enter a topic and select a style to generate icons.')).toBeInTheDocument();
        expect(screen.getByTestId('external-link-icon')).toBeInTheDocument();
    });

    it('renders icons when provided', () => {
        render(<IconGrid icons={mockIcons} isLoading={false} />);

        expect(screen.getByText('apple')).toBeInTheDocument();
        expect(screen.getByText('banana')).toBeInTheDocument();

        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute('src', 'http://example.com/apple.png');
        expect(images[1]).toHaveAttribute('src', 'http://example.com/banana.png');
    });

    it('handles download button click', async () => {
        const appendSpy = vi.spyOn(document.body, 'appendChild');
        const removeSpy = vi.spyOn(document.body, 'removeChild');
        const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { });

        render(<IconGrid icons={[mockIcons[0]]} isLoading={false} />);

        const downloadBtn = screen.getByTitle('Download PNG');
        fireEvent.click(downloadBtn);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://example.com/apple.png');
            expect(window.URL.createObjectURL).toHaveBeenCalled();
            expect(appendSpy).toHaveBeenCalled();
            expect(clickSpy).toHaveBeenCalled();
            expect(removeSpy).toHaveBeenCalled();
            expect(window.URL.revokeObjectURL).toHaveBeenCalled();
        });
    });

    it('handles open in new tab button click', () => {
        const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
        render(<IconGrid icons={[mockIcons[0]]} isLoading={false} />);

        const openBtn = screen.getByTitle('Open Full Size');
        fireEvent.click(openBtn);

        expect(openSpy).toHaveBeenCalledWith('http://example.com/apple.png', '_blank');
    });

    it('falls back to window.open if download fails', async () => {
        const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        // Mock fetch failure
        global.fetch = vi.fn(() => Promise.reject('Network error')) as any;

        render(<IconGrid icons={[mockIcons[0]]} isLoading={false} />);

        const downloadBtn = screen.getByTitle('Download PNG');
        fireEvent.click(downloadBtn);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalled();
            expect(openSpy).toHaveBeenCalledWith('http://example.com/apple.png', '_blank');
        });
    });
});
