import React, { useState, useRef } from 'react';

interface SignatureSelectorProps {
    name: string;
    value: string;
    onChange: (signature: string) => void;
    label?: string;
}

// Preset signature styles (cursive fonts rendered as SVG text)
const SIGNATURE_PRESETS = [
    { id: 'style1', name: 'Elegant', fontFamily: 'cursive', style: 'italic' },
    { id: 'style2', name: 'Professional', fontFamily: 'Georgia', style: 'normal' },
    { id: 'style3', name: 'Modern', fontFamily: 'Brush Script MT, cursive', style: 'normal' },
];

export const SignatureSelector: React.FC<SignatureSelectorProps> = ({
    value,
    onChange,
    label = 'Signature',
}) => {
    const [mode, setMode] = useState<'initials' | 'preset' | 'upload'>('initials');
    const [initialsText, setInitialsText] = useState('');
    const [selectedPreset, setSelectedPreset] = useState(SIGNATURE_PRESETS[0].id);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Generate initials-based signature
    const generateInitialsSignature = (text: string) => {
        if (!text) return '';
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 60;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.font = 'italic 32px cursive';
            ctx.fillStyle = '#1e3a5f';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, 100, 30);
        }
        return canvas.toDataURL();
    };

    // Generate preset signature
    const generatePresetSignature = (text: string, presetId: string) => {
        if (!text) return '';
        const preset = SIGNATURE_PRESETS.find(p => p.id === presetId) || SIGNATURE_PRESETS[0];
        const canvas = document.createElement('canvas');
        canvas.width = 250;
        canvas.height = 70;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.font = `${preset.style} 28px ${preset.fontFamily}`;
            ctx.fillStyle = '#1e3a5f';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, 125, 35);
        }
        return canvas.toDataURL();
    };

    // Handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                setUploadedImage(result);
                onChange(result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Apply signature based on mode
    const applySignature = () => {
        switch (mode) {
            case 'initials':
                onChange(generateInitialsSignature(initialsText));
                break;
            case 'preset':
                onChange(generatePresetSignature(initialsText, selectedPreset));
                break;
            case 'upload':
                if (uploadedImage) onChange(uploadedImage);
                break;
        }
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
            </label>

            {/* Mode Selector */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => setMode('initials')}
                    className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all ${mode === 'initials'
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                        : 'bg-slate-100 text-slate-600 border-2 border-transparent hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                >
                    ✍️ Initials
                </button>
                <button
                    type="button"
                    onClick={() => setMode('preset')}
                    className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all ${mode === 'preset'
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                        : 'bg-slate-100 text-slate-600 border-2 border-transparent hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                >
                    🎨 Preset
                </button>
                <button
                    type="button"
                    onClick={() => setMode('upload')}
                    className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all ${mode === 'upload'
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                        : 'bg-slate-100 text-slate-600 border-2 border-transparent hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                >
                    📤 Upload
                </button>
            </div>

            {/* Mode-specific controls */}
            {(mode === 'initials' || mode === 'preset') && (
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Enter name for signature"
                        value={initialsText}
                        onChange={(e) => setInitialsText(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-sm"
                    />

                    {mode === 'preset' && (
                        <div className="flex gap-2">
                            {SIGNATURE_PRESETS.map((preset) => (
                                <button
                                    key={preset.id}
                                    type="button"
                                    onClick={() => setSelectedPreset(preset.id)}
                                    className={`flex-1 py-2 px-2 text-xs rounded-lg transition-all ${selectedPreset === preset.id
                                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-slate-600 dark:text-slate-300 dark:border-slate-500'
                                        }`}
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={applySignature}
                        className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Generate Signature
                    </button>
                </div>
            )}

            {mode === 'upload' && (
                <div className="space-y-2">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-slate-400 text-sm hover:border-blue-400 hover:text-blue-500 transition-all"
                    >
                        📤 Click to upload signature image
                    </button>
                </div>
            )}

            {/* Preview */}
            {value && (
                <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Preview:</p>
                    <img
                        src={value}
                        alt="Signature preview"
                        className="max-h-16 mx-auto"
                    />
                </div>
            )}
        </div>
    );
};
