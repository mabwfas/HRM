import { forwardRef } from 'react';
import { WarningLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface WarningLetterTemplateProps {
    data: WarningLetterData;
}

export const WarningLetterTemplate = forwardRef<HTMLDivElement, WarningLetterTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none"
                style={{ width: '210mm', minHeight: '297mm' }}
            >
                {/* Header */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-rose-600"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-orange-100 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                                    <p className="text-xl font-black text-white">WARNING</p>
                                    <p className="text-lg font-bold text-orange-100">LETTER</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Reference */}
                <div className="px-10 py-4 bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600"><strong>Ref:</strong> {data.refNumber}</span>
                        <span className="text-slate-600"><strong>Date:</strong> {data.date}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 py-8 space-y-6">
                    {/* Employee Card */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg">
                                <span className="text-2xl font-bold text-white">{data.employeeName?.charAt(0) || 'E'}</span>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-slate-800">{data.employeeName || '[Employee Name]'}</p>
                                <p className="text-sm text-slate-600">{data.designation} • {data.department}</p>
                                <p className="text-xs text-slate-400">ID: {data.employeeId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Warning Type Banner */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-center">
                        <p className="text-white text-xl font-black">⚠️ {data.warningType.toUpperCase()} ⚠️</p>
                    </div>

                    {/* Subject */}
                    <div className="text-slate-700">
                        <p className="font-semibold text-lg text-red-700">
                            Subject: {data.warningType}
                        </p>
                    </div>

                    {/* Incident Details */}
                    <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                        <h3 className="font-bold text-red-800 mb-3">Incident Details</h3>
                        <div className="space-y-2 text-sm">
                            <p><strong>Date of Incident:</strong> {data.incidentDate || '—'}</p>
                            <p><strong>Description:</strong> {data.incidentDescription || '[Incident description]'}</p>
                            <p><strong>Previous Warnings:</strong> {data.previousWarnings}</p>
                        </div>
                    </div>

                    {/* Expected Improvement */}
                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                        <h3 className="font-bold text-amber-800 mb-3">Expected Improvement</h3>
                        <p className="text-slate-700">{data.expectedImprovement}</p>
                    </div>

                    {/* Consequences */}
                    <div className="bg-slate-800 rounded-2xl p-6 text-white">
                        <h3 className="font-bold mb-2">⚠️ Consequence if Not Improved</h3>
                        <p className="text-slate-200">{data.consequenceIfNotImproved}</p>
                    </div>

                    <p className="text-slate-700">
                        Please acknowledge receipt of this warning by signing below. A copy will be placed in your personnel file.
                    </p>
                </div>

                {/* Signature Section */}
                <div className="px-10 py-10">
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-slate-500 mb-2">For {data.companyName}</p>
                        <img src={signatureImage} alt="Signature" className="h-14 object-contain mb-2" />
                        <div className="border-t border-slate-400 pt-2 w-56 text-center">
                            <p className="font-bold text-slate-800">{data.hrName}</p>
                            <p className="text-sm text-slate-600">{data.hrDesignation}</p>
                        </div>
                        <div className="mt-4">
                            <CompanySeal companyName={data.companyName} size="md" />
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-500 mb-8">Employee Acknowledgement</p>
                            <div className="border-t border-slate-400 pt-2 w-56">
                                <p className="font-bold text-slate-800">{data.employeeName || '________________'}</p>
                                <p className="text-sm text-slate-600">Date: ________________</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-orange-900 px-10 py-4 mt-auto">
                    <div className="flex justify-between items-center text-xs text-orange-200">
                        <p>© {new Date().getFullYear()} {data.companyName}. CONFIDENTIAL</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

WarningLetterTemplate.displayName = 'WarningLetterTemplate';
