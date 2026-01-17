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
                <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-700 px-6 py-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-black text-white">{data.companyName}</h1>
                            <p className="text-red-100 text-xs">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-3 py-1.5 text-center">
                            <p className="text-xs font-black text-white">TERMINATION LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-6 py-1 bg-red-50 border-b border-red-200 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="px-6 py-3 flex flex-col">
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
                            {data.terminationType?.toUpperCase() || 'TERMINATION'}
                        </div>
                    </div>

                    {/* Subject */}
                    <p className="font-semibold text-red-700 text-sm mb-2">Subject: {data.terminationType}</p>

                    {/* Main Content */}
                    <p className="text-slate-700 text-xs mb-2 leading-relaxed">
                        This letter serves as official notice that your employment with <strong>{data.companyName}</strong> is
                        being terminated effective <strong>{data.lastWorkingDate || '[Last Working Date]'}</strong>.
                    </p>

                    {/* Reason Card */}
                    <div className="bg-red-50 rounded-lg p-2 border border-red-200 mb-2">
                        <h3 className="font-bold text-red-800 text-xs mb-1">Reason for Termination</h3>
                        <p className="text-xs">{data.terminationReason || '[Reason for termination]'}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="bg-slate-50 rounded p-2 border border-slate-200 text-center">
                            <p className="text-xs text-slate-500">Last Working Day</p>
                            <p className="font-bold text-slate-800 text-sm">{data.lastWorkingDate || '—'}</p>
                        </div>
                        <div className="bg-amber-50 rounded p-2 border border-amber-200 text-center">
                            <p className="text-xs text-amber-600">Notice Period</p>
                            <p className="font-bold text-amber-800 text-sm">{data.noticePeriodStatus}</p>
                        </div>
                    </div>

                    {/* Settlement Details */}
                    <div className="bg-slate-800 rounded-lg p-2 text-white mb-2">
                        <h3 className="font-bold text-xs mb-1">Settlement Details</h3>
                        <p className="text-xs text-slate-200">{data.settlementDetails}</p>
                    </div>

                    <p className="text-xs text-slate-600 mb-2">Please return all company property. We wish you the best.</p>

                    {/* Signatures */}
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-end">
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
                <div className="bg-red-900 px-6 py-1.5">
                    <div className="flex justify-between text-xs text-red-200">
                        <p>© {new Date().getFullYear()} {data.companyName} - CONFIDENTIAL</p>
                        <p className="font-mono text-red-100">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

TerminationLetterTemplate.displayName = 'TerminationLetterTemplate';
