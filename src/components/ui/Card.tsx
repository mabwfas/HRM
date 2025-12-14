import React from 'react';

interface CardProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
}

export const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    children,
    className = '',
    headerClassName = '',
    bodyClassName = '',
}) => {
    return (
        <div className={`bg-white dark:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-600 shadow-sm overflow-hidden ${className}`}>
            {(title || subtitle) && (
                <div className={`px-5 py-4 border-b border-slate-100 dark:border-slate-600 ${headerClassName}`}>
                    {title && <h3 className="font-semibold text-slate-800 dark:text-white">{title}</h3>}
                    {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
                </div>
            )}
            <div className={`p-5 ${bodyClassName}`}>
                {children}
            </div>
        </div>
    );
};
