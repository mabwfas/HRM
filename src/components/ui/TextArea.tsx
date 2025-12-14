import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <textarea
                className={`
          w-full px-3.5 py-2.5 rounded-xl border bg-white
          text-slate-900 placeholder:text-slate-400
          transition-all duration-200 resize-none
          ${error
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 hover:border-slate-300 focus:border-blue-500'
                    }
          ${className}
        `}
                {...props}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
};
