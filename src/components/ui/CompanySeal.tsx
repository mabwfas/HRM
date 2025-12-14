import React from 'react';

interface CompanySealProps {
    companyName?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    show?: boolean;
}

export const CompanySeal: React.FC<CompanySealProps> = ({
    companyName = 'DIGITAL HEROES',
    size = 'md',
    className = '',
    show = true,
}) => {
    if (!show) return null;

    const sizes = {
        sm: 100,
        md: 120,
        lg: 140,
    };

    const s = sizes[size];
    const color = '#60a5fa'; // Light blue like original seal

    return (
        <div
            className={`relative ${className}`}
            style={{
                width: s,
                height: s,
                transform: 'rotate(-12deg)',
            }}
        >
            <svg viewBox="0 0 100 100" width={s} height={s}>
                {/* Outer thick circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke={color}
                    strokeWidth="2.5"
                />

                {/* Second circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                />

                {/* Inner circle - around center area */}
                <circle
                    cx="50"
                    cy="50"
                    r="26"
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                />

                {/* Innermost circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="23"
                    fill="none"
                    stroke={color}
                    strokeWidth="0.8"
                />

                {/* Curved text paths - balanced position */}
                <defs>
                    <path
                        id="topTextPath"
                        d="M 18,50 A 32,32 0 0,1 82,50"
                        fill="none"
                    />
                    <path
                        id="bottomTextPath"
                        d="M 15,55 A 35,35 0 0,0 85,55"
                        fill="none"
                    />
                </defs>

                {/* Company name curved on top - bold for clarity */}
                <text fill={color} fontSize="6.5" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">
                    <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
                        ★ {companyName.toUpperCase()} ★
                    </textPath>
                </text>

                {/* Location curved on bottom - reading correctly */}
                <text fill={color} fontSize="6.5" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="0.5">
                    <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">
                        LUCKNOW, INDIA
                    </textPath>
                </text>

                {/* Center text - SEAL */}
                <text
                    x="50"
                    y="48"
                    textAnchor="middle"
                    fill={color}
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="Arial, sans-serif"
                >
                    SEAL
                </text>

                {/* Est year below SEAL */}
                <text
                    x="50"
                    y="57"
                    textAnchor="middle"
                    fill={color}
                    fontSize="5"
                    fontWeight="600"
                    fontFamily="Arial, sans-serif"
                >
                    Est. 2017
                </text>
            </svg>
        </div>
    );
};

export default CompanySeal;
