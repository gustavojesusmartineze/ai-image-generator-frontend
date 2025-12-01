import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ErrorToastProps {
    message: string | null;
    onClose: () => void;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(onClose, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 20, x: '-50%' }}
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
                >
                    <div className="bg-red-50 text-red-800 px-6 py-4 rounded-xl shadow-lg border border-red-200 flex items-center gap-3 min-w-[300px]">
                        <AlertCircle className="text-red-500" size={24} />
                        <p className="font-medium flex-grow">{message}</p>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-red-100 rounded-full transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
