import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { inputErrorVariants, getTransitionConfig } from '@/utils/interactionUtils';

/**
 * AnimatedInput - Enhanced input field with focus animations
 * Provides smooth focus/blur transitions and validation feedback
 *
 * @param {string} label - Input label
 * @param {string} type - Input type (default: 'text')
 * @param {string} placeholder - Input placeholder
 * @param {string} error - Error message (shows error state)
 * @param {boolean} disabled - Disable input
 * @param {Function} onChange - onChange callback
 * @param {Array<Function>} validators - Validation functions
 * @param {Object} props - Additional input props
 */
export const AnimatedInput = React.forwardRef((
  {
    label,
    type = 'text',
    placeholder,
    error,
    disabled = false,
    onChange,
    validators = [],
    ...props
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const handleChange = (e) => {
    // Clear previous error
    setValidationError(false);

    // Run validators
    if (validators.length > 0) {
      const hasError = validators.some(validator => !validator(e.target.value));
      if (hasError && e.target.value) {
        setValidationError(true);
      }
    }

    onChange?.(e);
  };

  const hasError = error || validationError;

  return (
    <motion.div className="mb-4" layout>
      {label && (
        <motion.label
          className="block text-sm font-medium text-slate-700 mb-2"
          animate={{ opacity: 1 }}
          transition={getTransitionConfig('fast')}
        >
          {label}
        </motion.label>
      )}

      <motion.div
        animate={{ y: hasError ? 0 : 0 }}
        transition={getTransitionConfig('standard')}
      >
        <motion.input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-colors
            focus:outline-none font-medium
            ${isFocused
              ? 'border-cyan-500 bg-cyan-50/50'
              : hasError
              ? 'border-red-500 bg-red-50/50'
              : 'border-slate-200 bg-slate-50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
          `}
          variants={inputErrorVariants}
          animate={hasError ? 'error' : 'initial'}
          transition={getTransitionConfig('standard')}
          {...props}
        />
      </motion.div>

      {/* Error message */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={hasError ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={getTransitionConfig('fast')}
        className="mt-1 text-sm text-red-600 font-medium"
      >
        {hasError && (error || 'Invalid input')}
      </motion.div>

      {/* Focus indicator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isFocused ? { scaleX: 1 } : { scaleX: 0 }}
        transition={getTransitionConfig('fast')}
        className="mt-1 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 origin-left"
      />
    </motion.div>
  );
});

AnimatedInput.displayName = 'AnimatedInput';
