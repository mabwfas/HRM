import { forwardRef, useMemo } from 'react';
import { TerminationLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, DOC_TYPES } from '../../utils/refGenerator';

interface TerminationLetterTemplateProps {
    data: TerminationLetterData;
}

export const TerminationLetterTemplate = forwardRef<HTMLDivElement, TerminationLetterTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const refNumber = useMemo(() => generateRefNumber(data.employeeName || '', DOC_TYPES.TRM), [data.employeeName]);

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none text-[11px] flex flex-col"
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm', overflow: 'hidden' }}
            >
                {/* Compact Header */}
                <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-700 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-red-100 text-xs">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                            <p className="text-sm font-black text-white">TERMINATION LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-8 py-2 bg-red-50 border-b border-red-200 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-8 py-4 flex flex-col">
                    {/* Employee Info - Compact */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-slate-800">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-xs text-slate-600">{data.designation} • {data.department} • ID: {data.employeeId}</p>
                        </div>
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            {data.terminationType?.toUpperCase() || 'TERMINATION'}
                        </div>
                    </div>

                    {/* Subject */}
                    <p className="font-semibold text-red-700 mb-3">Subject: {data.terminationType}</p>

                    {/* Main Content */}
                    <p className="text-slate-700 mb-3">
                        This letter serves as official notice that your employment with <strong>{data.companyName}</strong> is
                        being terminated effective <strong>{data.lastWorkingDate || '[Last Working Date]'}</strong>.
                    </p>

                    {/* Reason Card */}
                    <div className="bg-red-50 rounded-lg p-3 border border-red-200 mb-3">
                        <h3 className="font-bold text-red-800 mb-1 text-sm">Reason for Termination</h3>
                        <p className="text-xs text-slate-700">{data.terminationReason || '[Reason for termination]'}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 text-center">
                            <p className="text-xs text-slate-500 uppercase">Last Working Day</p>
                            <p className="font-bold text-slate-800">{data.lastWorkingDate || '—'}</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-2 border border-amber-200 text-center">
                            <p className="text-xs text-amber-600 uppercase">Notice Period</p>
                            <p className="font-bold text-amber-800">{data.noticePeriodStatus}</p>
                        </div>
                    </div>

                    {/* Settlement Details */}
                    <div className="bg-slate-800 rounded-lg p-3 text-white mb-3">
                        <h3 className="font-bold mb-1 text-sm">Settlement Details</h3>
                        <p className="text-xs text-slate-200">{data.settlementDetails}</p>
                    </div>

                    <p className="text-slate-700 text-xs mb-3">
                        Please ensure all company property is returned on or before your last working day. We wish you the best in your future endeavors.
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
                <div className="bg-red-900 px-8 py-2 mt-auto">
                    <div className="flex justify-between text-xs text-red-200">
                        <p>© {new Date().getFullYear()} {data.companyName} - CONFIDENTIAL</p>
                        <p className="font-mono font-bold text-red-100">Ref: {refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

TerminationLetterTemplate.displayName = 'TerminationLetterTemplate';
