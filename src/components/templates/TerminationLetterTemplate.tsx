import { forwardRef, useMemo } from 'react';
import { TerminationLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, generateEmployeeId, DOC_TYPES } from '../../utils/refGenerator';

interface TerminationLetterTemplateProps {
    data: TerminationLetterData;
    showSeal?: boolean;
}

export const TerminationLetterTemplate = forwardRef<HTMLDivElement, TerminationLetterTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const refNumber = useMemo(() => generateRefNumber(data.employeeName || '', DOC_TYPES.TRM), [data.employeeName]);
        const employeeId = useMemo(() => generateEmployeeId(data.employeeName || ''), [data.employeeName]);

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none flex flex-col"
                style={{ width: '210mm', height: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-700 px-10 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-red-100 text-sm">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                            <p className="text-base font-black text-white">TERMINATION LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-10 py-2 bg-red-50 border-b border-red-200 flex justify-between text-sm">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="px-10 py-6 flex-1 flex flex-col">
                    {/* Employee Info */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex items-center gap-5 mb-5">
                        <div className="w-14 h-14 rounded-full bg-slate-500 flex items-center justify-center text-white text-xl font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-slate-800 text-xl">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-slate-600">{data.designation} • {data.department} • ID: {employeeId}</p>
                        </div>
                        <div className="bg-red-500 text-white px-4 py-1.5 rounded-full font-bold">
                            🚫 {data.terminationType?.toUpperCase() || 'TERMINATION'}
                        </div>
                    </div>

                    {/* Subject */}
                    <p className="font-bold text-red-700 text-lg mb-4">Subject: {data.terminationType}</p>

                    {/* Main Content */}
                    <div className="text-slate-700 text-base leading-relaxed space-y-4 mb-5">
                        <p className="text-justify">
                            This letter serves as official notice that your employment with <strong>{data.companyName}</strong> is
                            being terminated effective <strong>{data.lastWorkingDate || '[Last Working Date]'}</strong>.
                        </p>
                    </div>

                    {/* Reason Card */}
                    <div className="bg-red-50 rounded-lg p-5 border border-red-200 mb-5">
                        <h3 className="font-bold text-red-800 text-lg mb-2">Reason for Termination</h3>
                        <p className="text-base">{data.terminationReason || '[Reason for termination]'}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                            <p className="text-sm text-slate-500">Last Working Day</p>
                            <p className="font-bold text-slate-800 text-lg">{data.lastWorkingDate || '—'}</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 text-center">
                            <p className="text-sm text-amber-600">Notice Period</p>
                            <p className="font-bold text-amber-800 text-lg">{data.noticePeriodStatus}</p>
                        </div>
                    </div>

                    {/* Settlement Details */}
                    <div className="bg-slate-800 rounded-lg p-5 text-white mb-5">
                        <h3 className="font-bold text-lg mb-2">Settlement Details</h3>
                        <p className="text-slate-200">{data.settlementDetails}</p>
                    </div>

                    <p className="text-base text-slate-600">Please return all company property. We wish you the best in your future endeavors.</p>

                    {/* Spacer */}
                    <div className="flex-1"></div>

                    {/* Signatures */}
                    <div className="pt-4 border-t border-slate-200 mt-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <img src={signatureImage} alt="Signature" className="h-12 object-contain" />
                                <div className="border-t-2 border-slate-400 pt-1 mt-1 w-44">
                                    <p className="font-bold text-slate-800">{data.hrName}</p>
                                    <p className="text-slate-600 text-sm">{data.hrDesignation}</p>
                                </div>
                            </div>
                            {showSeal && <CompanySeal companyName={data.companyName} size="md" />}
                            <div>
                                <div className="h-12"></div>
                                <div className="border-t-2 border-slate-400 pt-1 mt-1 w-44">
                                    <p className="font-bold text-slate-800">{data.employeeName || '______'}</p>
                                    <p className="text-slate-600 text-sm">Employee Acknowledgement</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-red-900 px-10 py-3">
                    <div className="flex justify-between text-sm text-red-200">
                        <p>© {new Date().getFullYear()} {data.companyName} - CONFIDENTIAL</p>
                        <p className="font-mono text-xs">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

TerminationLetterTemplate.displayName = 'TerminationLetterTemplate';
