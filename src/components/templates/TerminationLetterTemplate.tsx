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
                style={{ width: '210mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-700 px-5 py-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-lg font-black text-white">{data.companyName}</h1>
                            <p className="text-red-100 text-[10px]">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded px-2 py-1 text-center">
                            <p className="text-[10px] font-black text-white">TERMINATION LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-5 py-0.5 bg-red-50 border-b border-red-200 flex justify-between text-[10px]">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="px-5 py-2 flex flex-col">
                    {/* Employee Info */}
                    <div className="bg-slate-50 rounded p-1.5 border border-slate-200 flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded-full bg-slate-500 flex items-center justify-center text-white text-xs font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-slate-800 text-sm">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-[10px] text-slate-600">{data.designation} • {data.department} • ID: {employeeId}</p>
                        </div>
                        <div className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[9px] font-bold">
                            {data.terminationType?.toUpperCase() || 'TERMINATION'}
                        </div>
                    </div>

                    {/* Subject */}
                    <p className="font-semibold text-red-700 text-[10px] mb-1.5">Subject: {data.terminationType}</p>

                    {/* Main Content */}
                    <p className="text-slate-700 text-[10px] mb-1.5 leading-relaxed">
                        This letter serves as official notice that your employment with <strong>{data.companyName}</strong> is
                        being terminated effective <strong>{data.lastWorkingDate || '[Last Working Date]'}</strong>.
                    </p>

                    {/* Reason Card */}
                    <div className="bg-red-50 rounded p-1.5 border border-red-200 mb-1.5">
                        <h3 className="font-bold text-red-800 text-[10px] mb-0.5">Reason for Termination</h3>
                        <p className="text-[10px]">{data.terminationReason || '[Reason for termination]'}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                        <div className="bg-slate-50 rounded p-1.5 border border-slate-200 text-center">
                            <p className="text-[9px] text-slate-500">Last Working Day</p>
                            <p className="font-bold text-slate-800 text-[10px]">{data.lastWorkingDate || '—'}</p>
                        </div>
                        <div className="bg-amber-50 rounded p-1.5 border border-amber-200 text-center">
                            <p className="text-[9px] text-amber-600">Notice Period</p>
                            <p className="font-bold text-amber-800 text-[10px]">{data.noticePeriodStatus}</p>
                        </div>
                    </div>

                    {/* Settlement Details */}
                    <div className="bg-slate-800 rounded p-1.5 text-white mb-1.5">
                        <h3 className="font-bold text-[10px] mb-0.5">Settlement Details</h3>
                        <p className="text-[10px] text-slate-200">{data.settlementDetails}</p>
                    </div>

                    <p className="text-[10px] text-slate-600 mb-1.5">Please return all company property. We wish you the best.</p>

                    {/* Signatures */}
                    <div className="pt-1.5 border-t border-slate-200 flex justify-between items-end">
                        <div className="text-center">
                            <img src={signatureImage} alt="Signature" className="h-6 object-contain mx-auto" />
                            <div className="border-t border-slate-400 pt-0.5 w-22">
                                <p className="font-bold text-slate-800 text-[10px]">{data.hrName}</p>
                                <p className="text-[9px] text-slate-600">{data.hrDesignation}</p>
                            </div>
                        </div>
                        <CompanySeal companyName={data.companyName} size="sm" />
                        <div className="text-center">
                            <div className="h-6"></div>
                            <div className="border-t border-slate-400 pt-0.5 w-22">
                                <p className="font-bold text-slate-800 text-[10px]">{data.employeeName || '______'}</p>
                                <p className="text-[9px] text-slate-600">Date: ______</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-red-900 px-5 py-1 mt-auto">
                    <div className="flex justify-between text-[10px] text-red-200">
                        <p>© {new Date().getFullYear()} {data.companyName} - CONFIDENTIAL</p>
                        <p className="font-mono text-red-100">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

TerminationLetterTemplate.displayName = 'TerminationLetterTemplate';
