import React from 'react';

interface DatePickerProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    label,
    name,
    value,
    onChange,
    className = '',
}) => {
    // Convert display date to input format if needed
    const inputValue = value ? formatToInputDate(value) : '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value;
        if (dateValue) {
            // Convert to display format
            const date = new Date(dateValue);
            const displayDate = date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            // Create a synthetic event with the display format
            const syntheticEvent = {
                ...e,
                target: {
                    ...e.target,
                    name,
                    value: displayDate,
                    type: 'text'
                }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
        } else {
            onChange(e);
        }
    };

    return (
        <div className={className}>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                {label}
            </label>
            <input
                type="date"
                name={name}
                value={inputValue}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
        </div>
    );
};

// Helper to convert display date to input format (YYYY-MM-DD)
function formatToInputDate(displayDate: string): string {
    try {
        // Try parsing common formats
        const date = new Date(displayDate);
        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
        }
        return '';
    } catch {
        return '';
    }
}
