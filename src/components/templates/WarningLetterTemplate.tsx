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
                style={{ width: '210mm', minHeight: '270mm', maxHeight: '270mm', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 px-6 py-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-black text-white">{data.companyName}</h1>
                            <p className="text-orange-100 text-xs">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-3 py-1.5 text-center">
                            <p className="text-xs font-black text-white">WARNING LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-6 py-1 bg-orange-50 border-b border-orange-200 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-6 py-3 flex flex-col">
                    {/* Employee Info */}
                    <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-white text-sm font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-slate-800 text-sm">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-xs text-slate-600">{data.designation} • {data.department} • ID: {employeeId}</p>
                        </div>
                        <div className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                            {data.warningType?.toUpperCase() || 'WARNING'}
                        </div>
                    </div>

                    {/* Subject */}
                    <p className="font-semibold text-red-700 text-sm mb-2">Subject: {data.warningType}</p>

                    {/* Incident Details */}
                    <div className="bg-red-50 rounded-lg p-2 border border-red-200 mb-2">
                        <h3 className="font-bold text-red-800 text-xs mb-1">Incident Details</h3>
                        <p className="text-xs"><strong>Date:</strong> {data.incidentDate || '—'} | <strong>Previous Warnings:</strong> {data.previousWarnings}</p>
                        <p className="text-xs mt-1"><strong>Description:</strong> {data.incidentDescription || '[Incident description]'}</p>
                    </div>

                    {/* Expected Improvement */}
                    <div className="bg-amber-50 rounded-lg p-2 border border-amber-200 mb-2">
                        <h3 className="font-bold text-amber-800 text-xs mb-1">Expected Improvement</h3>
                        <p className="text-xs">{data.expectedImprovement}</p>
                    </div>

                    {/* Consequences */}
                    <div className="bg-slate-800 rounded-lg p-2 text-white mb-2">
                        <h3 className="font-bold text-xs mb-1">Consequence if Not Improved</h3>
                        <p className="text-xs text-slate-200">{data.consequenceIfNotImproved}</p>
                    </div>

                    <p className="text-xs text-slate-600 mb-2">Please acknowledge receipt by signing below.</p>

                    {/* Signatures */}
                    <div className="mt-auto pt-2 border-t border-slate-200 flex justify-between items-end">
                        <div className="text-center">
                            <img src={signatureImage} alt="Signature" className="h-8 object-contain mx-auto" />
                            <div className="border-t border-slate-400 pt-1 w-28">
                                <p className="font-bold text-slate-800 text-xs">{data.hrName}</p>
                                <p className="text-xs text-slate-600">{data.hrDesignation}</p>
                            </div>
                        </div>
                        <CompanySeal companyName={data.companyName} size="sm" />
                        <div className="text-center">
                            <div className="h-8"></div>
                            <div className="border-t border-slate-400 pt-1 w-28">
                                <p className="font-bold text-slate-800 text-xs">{data.employeeName || '______'}</p>
                                <p className="text-xs text-slate-600">Date: ______</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-orange-900 px-6 py-1.5">
                    <div className="flex justify-between text-xs text-orange-200">
                        <p>© {new Date().getFullYear()} {data.companyName} - CONFIDENTIAL</p>
                        <p className="font-mono text-orange-100">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

WarningLetterTemplate.displayName = 'WarningLetterTemplate';
