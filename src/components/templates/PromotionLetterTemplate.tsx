import { forwardRef, useMemo } from 'react';
import { PromotionLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, generateEmployeeId, DOC_TYPES } from '../../utils/refGenerator';

interface PromotionLetterTemplateProps {
    data: PromotionLetterData;
}

export const PromotionLetterTemplate = forwardRef<HTMLDivElement, PromotionLetterTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const refNumber = useMemo(() => generateRefNumber(data.employeeName || '', DOC_TYPES.PRM), [data.employeeName]);
        const employeeId = useMemo(() => generateEmployeeId(data.employeeName || ''), [data.employeeName]);

        const formatCurrency = (amount: number): string => {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
        };

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none flex flex-col"
                style={{ minHeight: '297mm', maxHeight: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 px-5 py-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-lg font-black text-white">{data.companyName}</h1>
                            <p className="text-sky-100 text-[10px]">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded px-2 py-1 text-center">
                            <p className="text-[10px] font-black text-white">PROMOTION LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-5 py-0.5 bg-sky-50 border-b border-sky-200 flex justify-between text-[10px]">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content - ~60% */}
                <div className="px-5 py-2">
                    {/* Employee Info */}
                    <div className="bg-sky-50 rounded p-1.5 border border-sky-200 flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sky-800 text-sm">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-[10px] text-slate-600">{data.currentDesignation} • {data.department} • ID: {employeeId}</p>
                        </div>
                        <div className="bg-green-500 text-white px-1.5 py-0.5 rounded-full text-[9px] font-bold">PROMOTED</div>
                    </div>

                    {/* Congratulations Banner */}
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded p-1.5 text-center mb-1.5">
                        <p className="text-white text-base font-black">CONGRATULATIONS!</p>
                    </div>

                    {/* Promotion Details */}
                    <div className="bg-purple-50 rounded p-1.5 border border-purple-200 mb-1.5">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-center flex-1 bg-white rounded p-1.5">
                                <p className="text-[9px] text-slate-500">Previous</p>
                                <p className="font-semibold text-slate-700 text-[10px]">{data.currentDesignation}</p>
                            </div>
                            <div className="text-lg text-purple-500 font-bold">→</div>
                            <div className="text-center flex-1 bg-purple-100 rounded p-1.5 border border-purple-300">
                                <p className="text-[9px] text-purple-500">New Role</p>
                                <p className="font-bold text-purple-700 text-[10px]">{data.newDesignation}</p>
                            </div>
                        </div>
                    </div>

                    {/* Salary Revision */}
                    <div className="bg-green-50 rounded p-1.5 border border-green-200 mb-1.5">
                        <div className="grid grid-cols-3 gap-1.5 items-center">
                            <div className="text-center p-1 bg-white rounded">
                                <p className="text-[9px] text-slate-500">Previous CTC</p>
                                <p className="font-bold text-slate-700 text-[10px]">{formatCurrency(data.currentCtc)}</p>
                            </div>
                            <div className="text-center p-1 bg-green-100 rounded border border-green-300">
                                <p className="text-[9px] text-green-600">New CTC</p>
                                <p className="font-black text-green-700 text-sm">{formatCurrency(data.newCtc)}</p>
                            </div>
                            <div className="text-center p-1 bg-white rounded">
                                <p className="text-[9px] text-slate-500">Effective</p>
                                <p className="font-bold text-slate-700 text-[10px]">{data.effectiveDate || '—'}</p>
                            </div>
                        </div>
                    </div>

                    {/* New Responsibilities */}
                    <div className="bg-slate-50 rounded p-1.5 border border-slate-200">
                        <p className="font-bold text-slate-800 text-[10px] mb-0.5">New Responsibilities:</p>
                        <p className="text-slate-600 text-[10px]">{data.newResponsibilities}</p>
                    </div>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Signature */}
                <div className="px-5 py-2 border-t border-slate-200">
                    <div className="flex items-end justify-between">
                        <div className="text-center">
                            <img src={signatureImage} alt="Signature" className="h-6 object-contain mx-auto" />
                            <div className="border-t border-slate-400 pt-0.5 w-24">
                                <p className="font-bold text-slate-800 text-[10px]">{data.hrName}</p>
                                <p className="text-[9px] text-slate-600">{data.hrDesignation}</p>
                            </div>
                        </div>
                        <CompanySeal companyName={data.companyName} size="sm" />
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-sky-900 px-5 py-1">
                    <div className="flex justify-between text-[10px] text-sky-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-sky-100">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

PromotionLetterTemplate.displayName = 'PromotionLetterTemplate';
