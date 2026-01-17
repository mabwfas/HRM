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
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-sky-100 text-xs">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                            <p className="text-sm font-black text-white">PROMOTION</p>
                            <p className="text-xs font-bold text-sky-100">LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-8 py-1.5 bg-sky-50 border-b border-sky-200 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-8 py-4 flex flex-col">
                    {/* Employee Info */}
                    <div className="bg-sky-50 rounded-lg p-3 border border-sky-200 flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white text-lg font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sky-800">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-xs text-slate-600">{data.currentDesignation} • {data.department} • ID: {employeeId}</p>
                        </div>
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            PROMOTED
                        </div>
                    </div>

                    {/* Congratulations Banner */}
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg p-3 text-center mb-3">
                        <p className="text-white text-xl font-black">CONGRATULATIONS!</p>
                        <p className="text-white/90 text-sm">On your well-deserved promotion</p>
                    </div>

                    {/* Promotion Details */}
                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200 mb-3">
                        <h3 className="font-bold text-purple-800 mb-2 text-center text-sm">Promotion Details</h3>
                        <div className="flex items-center justify-between gap-3">
                            <div className="text-center flex-1 bg-white rounded-lg p-2">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Previous Role</p>
                                <p className="font-semibold text-slate-700 text-sm">{data.currentDesignation}</p>
                            </div>
                            <div className="text-2xl text-purple-500 font-bold">→</div>
                            <div className="text-center flex-1 bg-purple-100 rounded-lg p-2 border border-purple-300">
                                <p className="text-xs text-purple-500 uppercase font-semibold">New Role</p>
                                <p className="font-bold text-purple-700 text-sm">{data.newDesignation}</p>
                            </div>
                        </div>
                    </div>

                    {/* Salary Revision */}
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200 mb-3">
                        <h3 className="font-bold text-green-800 mb-2 text-center text-sm">Compensation Revision</h3>
                        <div className="grid grid-cols-3 gap-2 items-center">
                            <div className="text-center p-2 bg-white rounded-lg">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Previous CTC</p>
                                <p className="font-bold text-slate-700 text-sm">{formatCurrency(data.currentCtc)}</p>
                            </div>
                            <div className="text-center p-2 bg-green-100 rounded-lg border border-green-300">
                                <p className="text-xs text-green-600 uppercase font-semibold">New CTC</p>
                                <p className="font-black text-green-700">{formatCurrency(data.newCtc)}</p>
                            </div>
                            <div className="text-center p-2 bg-white rounded-lg">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Effective From</p>
                                <p className="font-bold text-slate-700 text-sm">{data.effectiveDate || '—'}</p>
                            </div>
                        </div>
                    </div>

                    {/* New Responsibilities */}
                    <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 mb-3">
                        <h3 className="font-bold text-slate-800 text-sm mb-1">New Responsibilities</h3>
                        <p className="text-slate-600 text-xs">{data.newResponsibilities}</p>
                    </div>

                    {/* Signature - Horizontal */}
                    <div className="mt-auto pt-3 border-t border-slate-200">
                        <div className="flex items-end justify-between">
                            <div className="text-center">
                                <p className="text-xs text-slate-500 mb-1">For {data.companyName}</p>
                                <img src={signatureImage} alt="Signature" className="h-10 object-contain mx-auto" />
                                <div className="border-t border-slate-400 pt-1 w-40">
                                    <p className="font-bold text-slate-800 text-sm">{data.hrName}</p>
                                    <p className="text-xs text-slate-600">{data.hrDesignation}</p>
                                </div>
                            </div>
                            <CompanySeal companyName={data.companyName} size="sm" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-sky-900 px-8 py-2 mt-auto">
                    <div className="flex justify-between text-xs text-sky-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono font-bold text-sky-100">Ref: {refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

PromotionLetterTemplate.displayName = 'PromotionLetterTemplate';
