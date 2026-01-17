import { forwardRef, useMemo } from 'react';
import { TerminationLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, generateEmployeeId, DOC_TYPES } from '../../utils/refGenerator';

interface TerminationLetterTemplateProps {
    data: TerminationLetterData;
}

export const TerminationLetterTemplate = forwardRef<HTMLDivElement, TerminationLetterTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const refNumber = useMemo(() => generateRefNumber(data.employeeName || '', DOC_TYPES.TRM), [data.employeeName]);
        const employeeId = useMemo(() => generateEmployeeId(data.employeeName || ''), [data.employeeName]);

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none flex flex-col"
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-700 px-10 py-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-black text-white">{data.companyName}</h1>
                            <p className="text-red-100 text-sm mt-1">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-xl px-5 py-3 text-center">
                            <p className="text-base font-black text-white">TERMINATION</p>
                            <p className="text-sm font-bold text-red-100">LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-10 py-2 bg-red-50 border-b border-red-200 flex justify-between text-sm">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-10 py-5 flex flex-col">
                    {/* Employee Info */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-slate-500 flex items-center justify-center text-white text-xl font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-slate-800 text-lg">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-sm text-slate-600">{data.designation} • {data.department} • ID: {employeeId}</p>
                        </div>
                        <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                            {data.terminationType?.toUpperCase() || 'TERMINATION'}
                        </div>
                    </div>

                    {/* Subject */}
                    <p className="font-semibold text-red-700 text-lg mb-4">Subject: {data.terminationType}</p>

                    {/* Main Content */}
                    <p className="text-slate-700 mb-4 leading-relaxed">
                        This letter serves as official notice that your employment with <strong>{data.companyName}</strong> is
                        being terminated effective <strong>{data.lastWorkingDate || '[Last Working Date]'}</strong>.
                    </p>

                    {/* Reason Card */}
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200 mb-4">
                        <h3 className="font-bold text-red-800 mb-2">Reason for Termination</h3>
                        <p className="text-slate-700 text-sm">{data.terminationReason || '[Reason for termination]'}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center">
                            <p className="text-xs text-slate-500 uppercase font-semibold">Last Working Day</p>
                            <p className="font-bold text-slate-800 text-lg">{data.lastWorkingDate || '—'}</p>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-center">
                            <p className="text-xs text-amber-600 uppercase font-semibold">Notice Period</p>
                            <p className="font-bold text-amber-800 text-lg">{data.noticePeriodStatus}</p>
                        </div>
                    </div>

                    {/* Settlement Details */}
                    <div className="bg-slate-800 rounded-xl p-4 text-white mb-4">
                        <h3 className="font-bold mb-2">Settlement Details</h3>
                        <p className="text-sm text-slate-200">{data.settlementDetails}</p>
                    </div>

                    <p className="text-slate-700 text-sm mb-4">
                        Please ensure all company property is returned. We wish you the best.
                    </p>

                    {/* Signatures - Horizontal */}
                    <div className="mt-auto pt-4 border-t border-slate-200">
                        <div className="flex justify-between items-end">
                            <div className="text-center">
                                <p className="text-sm text-slate-500 mb-2">For {data.companyName}</p>
                                <img src={signatureImage} alt="Signature" className="h-12 object-contain mx-auto" />
                                <div className="border-t border-slate-400 pt-2 w-40">
                                    <p className="font-bold text-slate-800 text-sm">{data.hrName}</p>
                                    <p className="text-xs text-slate-600">{data.hrDesignation}</p>
                                </div>
                            </div>
                            <CompanySeal companyName={data.companyName} size="sm" />
                            <div className="text-center">
                                <p className="text-sm text-slate-500 mb-2">Employee Acknowledgement</p>
                                <div className="h-12"></div>
                                <div className="border-t border-slate-400 pt-2 w-40">
                                    <p className="font-bold text-slate-800 text-sm">{data.employeeName || '____________'}</p>
                                    <p className="text-xs text-slate-600">Date: __________</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-red-900 px-10 py-3 mt-auto">
                    <div className="flex justify-between text-sm text-red-200">
                        <p>© {new Date().getFullYear()} {data.companyName} - CONFIDENTIAL</p>
                        <p className="font-mono font-bold text-red-100">Ref: {refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

TerminationLetterTemplate.displayName = 'TerminationLetterTemplate';
