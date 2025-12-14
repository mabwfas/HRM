import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                </label>
            )}
            <input
                className={`
          w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-700
          text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500
          transition-all duration-200
          ${error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 focus:border-blue-500 focus:ring-blue-500/20'
                    }
          ${className}
        `}
                {...props}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {helperText && !error && <p className="text-sm text-slate-500 dark:text-slate-400">{helperText}</p>}
        </div>
    );
};
