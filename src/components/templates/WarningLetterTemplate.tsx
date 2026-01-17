import { forwardRef, useMemo } from 'react';
import { WarningLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, generateEmployeeId, DOC_TYPES } from '../../utils/refGenerator';

interface WarningLetterTemplateProps {
    data: WarningLetterData;
}

export const WarningLetterTemplate = forwardRef<HTMLDivElement, WarningLetterTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const refNumber = useMemo(() => generateRefNumber(data.employeeName || '', DOC_TYPES.WRN), [data.employeeName]);
        const employeeId = useMemo(() => generateEmployeeId(data.employeeName || ''), [data.employeeName]);

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none flex flex-col"
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-orange-100 text-xs">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                            <p className="text-sm font-black text-white">WARNING</p>
                            <p className="text-xs font-bold text-orange-100">LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-8 py-1.5 bg-orange-50 border-b border-orange-200 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-8 py-4 flex flex-col">
                    {/* Employee Info */}
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-slate-500 flex items-center justify-center text-white text-lg font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-slate-800">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-xs text-slate-600">{data.designation} • {data.department} • ID: {employeeId}</p>
                        </div>
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            {data.warningType?.toUpperCase() || 'WARNING'}
                        </div>
                    </div>

                    {/* Subject */}
                    <p className="font-semibold text-red-700 mb-3">Subject: {data.warningType}</p>

                    {/* Incident Details */}
                    <div className="bg-red-50 rounded-lg p-3 border border-red-200 mb-3">
                        <h3 className="font-bold text-red-800 mb-2 text-sm">Incident Details</h3>
                        <div className="space-y-1 text-xs">
                            <p><strong>Date:</strong> {data.incidentDate || '—'}</p>
                            <p><strong>Description:</strong> {data.incidentDescription || '[Incident description]'}</p>
                            <p><strong>Previous Warnings:</strong> {data.previousWarnings}</p>
                        </div>
                    </div>

                    {/* Expected Improvement */}
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 mb-3">
                        <h3 className="font-bold text-amber-800 mb-1 text-sm">Expected Improvement</h3>
                        <p className="text-slate-700 text-xs">{data.expectedImprovement}</p>
                    </div>

                    {/* Consequences */}
                    <div className="bg-slate-800 rounded-lg p-3 text-white mb-3">
                        <h3 className="font-bold mb-1 text-sm">Consequence if Not Improved</h3>
                        <p className="text-xs text-slate-200">{data.consequenceIfNotImproved}</p>
                    </div>

                    <p className="text-slate-700 text-xs mb-3">
                        Please acknowledge receipt by signing below. A copy will be placed in your personnel file.
                    </p>

                    {/* Signatures - Horizontal */}
                    <div className="mt-auto pt-3 border-t border-slate-200">
                        <div className="flex justify-between items-end">
                            <div className="text-center">
                                <p className="text-xs text-slate-500 mb-1">For {data.companyName}</p>
                                <img src={signatureImage} alt="Signature" className="h-10 object-contain mx-auto" />
                                <div className="border-t border-slate-400 pt-1 w-36">
                                    <p className="font-bold text-slate-800 text-xs">{data.hrName}</p>
                                    <p className="text-xs text-slate-600">{data.hrDesignation}</p>
                                </div>
                            </div>
                            <CompanySeal companyName={data.companyName} size="sm" />
                            <div className="text-center">
                                <p className="text-xs text-slate-500 mb-1">Employee Acknowledgement</p>
                                <div className="h-10"></div>
                                <div className="border-t border-slate-400 pt-1 w-36">
                                    <p className="font-bold text-slate-800 text-xs">{data.employeeName || '____________'}</p>
                                    <p className="text-xs text-slate-600">Date: __________</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-orange-900 px-8 py-2 mt-auto">
                    <div className="flex justify-between text-xs text-orange-200">
                        <p>© {new Date().getFullYear()} {data.companyName} - CONFIDENTIAL</p>
                        <p className="font-mono font-bold text-orange-100">Ref: {refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

WarningLetterTemplate.displayName = 'WarningLetterTemplate';
