import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the header', () => {
        render(<App />);
        expect(screen.getByText(/Gustavo's AI Generator/i)).toBeInTheDocument();
    });

    it('allows entering a prompt', () => {
        render(<App />);
        const input = screen.getByPlaceholderText(/e.g., Toys/i);
        fireEvent.change(input, { target: { value: 'Fruit' } });
        expect(input).toHaveValue('Fruit');
    });

    it('shows loading state when generating', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { icons: [] } });
        render(<App />);

        const input = screen.getByPlaceholderText(/e.g., Toys/i);
        fireEvent.change(input, { target: { value: 'Fruit' } });

        const button = screen.getByRole('button', { name: /generate icons/i });
        fireEvent.click(button);

        expect(screen.getByText(/Generating.../i)).toBeInTheDocument();
        expect(button).toBeDisabled();

        // Wait for loading to finish to avoid act() warnings
        await waitFor(() => {
            expect(screen.queryByText(/Generating.../i)).not.toBeInTheDocument();
        });
    });

    it('shows error toast on API failure', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('API Error'));
        render(<App />);

        const input = screen.getByPlaceholderText(/e.g., Toys/i);
        fireEvent.change(input, { target: { value: 'Fruit' } });

        const button = screen.getByRole('button', { name: /generate icons/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/API Error/i)).toBeInTheDocument();
        });
    });

    it('handles rate limit errors gracefully', async () => {
        mockedAxios.post.mockRejectedValueOnce({
            response: {
                data: { error: 'Too Many Requests' },
                status: 429
            }
        });
        render(<App />);

        const input = screen.getByPlaceholderText(/e.g., Toys/i);
        fireEvent.change(input, { target: { value: 'Fruit' } });

        const button = screen.getByRole('button', { name: /generate icons/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/Too Many Requests/i)).toBeInTheDocument();
        });
    });
});
