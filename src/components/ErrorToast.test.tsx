import { render, screen, fireEvent, act } from '@testing-library/react';
import { ErrorToast } from './ErrorToast';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
    AlertCircle: () => <div data-testid="alert-icon">AlertCircle</div>,
    X: () => <div data-testid="close-icon">X</div>,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: any) => (
            <div className={className}>
                {children}
            </div>
        ),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ErrorToast', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders nothing when message is null', () => {
        render(<ErrorToast message={null} onClose={vi.fn()} />);

        expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });

    it('renders message when provided', () => {
        const message = 'Something went wrong';
        render(<ErrorToast message={message} onClose={vi.fn()} />);

        expect(screen.getByText(message)).toBeInTheDocument();
        expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
        expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn();
        render(<ErrorToast message="Error" onClose={onClose} />);

        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalled();
    });

    it('auto-dismisses after 5 seconds', () => {
        const onClose = vi.fn();
        render(<ErrorToast message="Error" onClose={onClose} />);

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(onClose).toHaveBeenCalled();
    });

    it('clears timer on unmount', () => {
        const onClose = vi.fn();
        const { unmount } = render(<ErrorToast message="Error" onClose={onClose} />);

        unmount();

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(onClose).not.toHaveBeenCalled();
    });
});
