import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getLenisInstance } from '@/hooks/useLenis';
import { modalVariants, modalConfig } from '@/utils/interactionUtils';

/**
 * AnimatedModal - Reusable modal component with Lenis scroll lock
 * Provides smooth animations and prevents scroll while modal is open
 *
 * @param {boolean} isOpen - Modal open state
 * @param {Function} onClose - Callback when modal should close
 * @param {ReactNode} children - Modal content
 * @param {string} title - Optional modal title
 * @param {boolean} showCloseButton - Show X button (default: true)
 * @param {string} size - Modal size: 'sm', 'md', 'lg' (default: 'md')
 */
export default function AnimatedModal({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  size = 'md',
}) {
  // Apply scroll lock when modal opens/closes
  useEffect(() => {
    const lenis = getLenisInstance();
    if (!lenis) return;

    if (isOpen) {
      // Lock scroll when modal opens
      lenis.stop();
    } else {
      // Unlock scroll when modal closes
      lenis.start();
    }

    return () => {
      // Ensure scroll is unlocked on unmount
      if (lenis) {
        lenis.start();
      }
    };
  }, [isOpen]);

  // Size configurations
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }[size] || 'max-w-md';

  const handleBackdropClick = (e) => {
    // Only close if clicking on backdrop, not content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  };

  // Add escape key listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: modalConfig.backdropFadeDuration }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{
              duration: modalConfig.openDuration,
              ease: modalConfig.easing,
            }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
          >
            <div
              className={`${sizeClasses} w-full bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                  {title && (
                    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                  )}
                  {showCloseButton && (
                    <motion.button
                      onClick={onClose}
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="ml-auto text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
