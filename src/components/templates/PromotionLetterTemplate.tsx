import { forwardRef, useMemo } from 'react';
import { PromotionLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, DOC_TYPES } from '../../utils/refGenerator';

interface PromotionLetterTemplateProps {
    data: PromotionLetterData;
}

export const PromotionLetterTemplate = forwardRef<HTMLDivElement, PromotionLetterTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const refNumber = useMemo(() => generateRefNumber(data.employeeName || '', DOC_TYPES.PRM), [data.employeeName]);

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
                <div className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 px-10 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-black text-white">{data.companyName}</h1>
                            <p className="text-sky-100 text-sm mt-1">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-xl px-5 py-3 text-center">
                            <p className="text-lg font-black text-white">PROMOTION</p>
                            <p className="text-sm font-bold text-sky-100">LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-10 py-3 bg-sky-50 border-b border-sky-200 flex justify-between text-sm">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-10 py-6 flex flex-col">
                    {/* Employee Info */}
                    <div className="bg-sky-50 rounded-xl p-4 border border-sky-200 flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white text-xl font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sky-800 text-lg">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-sm text-slate-600">{data.currentDesignation} • {data.department} • ID: {data.employeeId}</p>
                        </div>
                        <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            PROMOTED
                        </div>
                    </div>

                    {/* Congratulations Banner */}
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl p-5 text-center mb-5">
                        <p className="text-white text-2xl font-black">CONGRATULATIONS!</p>
                        <p className="text-white/90 mt-1">On your well-deserved promotion</p>
                    </div>

                    {/* Promotion Details */}
                    <div className="bg-purple-50 rounded-xl p-5 border border-purple-200 mb-5">
                        <h3 className="font-bold text-purple-800 mb-4 text-center text-lg">Promotion Details</h3>
                        <div className="flex items-center justify-between gap-4">
                            <div className="text-center flex-1 bg-white rounded-xl p-4">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Previous Role</p>
                                <p className="font-semibold text-slate-700 text-lg">{data.currentDesignation}</p>
                            </div>
                            <div className="text-3xl text-purple-500 font-bold">→</div>
                            <div className="text-center flex-1 bg-purple-100 rounded-xl p-4 border-2 border-purple-300">
                                <p className="text-xs text-purple-500 uppercase font-semibold">New Role</p>
                                <p className="font-bold text-purple-700 text-lg">{data.newDesignation}</p>
                            </div>
                        </div>
                    </div>

                    {/* Salary Revision */}
                    <div className="bg-green-50 rounded-xl p-5 border border-green-200 mb-5">
                        <h3 className="font-bold text-green-800 mb-4 text-center text-lg">Compensation Revision</h3>
                        <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-center p-3 bg-white rounded-xl">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Previous CTC</p>
                                <p className="font-bold text-slate-700 text-lg">{formatCurrency(data.currentCtc)}</p>
                            </div>
                            <div className="text-center p-3 bg-green-100 rounded-xl border-2 border-green-300">
                                <p className="text-xs text-green-600 uppercase font-semibold">New CTC</p>
                                <p className="font-black text-green-700 text-xl">{formatCurrency(data.newCtc)}</p>
                            </div>
                            <div className="text-center p-3 bg-white rounded-xl">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Effective From</p>
                                <p className="font-bold text-slate-700">{data.effectiveDate || '—'}</p>
                            </div>
                        </div>
                    </div>

                    {/* New Responsibilities */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
                        <h3 className="font-bold text-slate-800 mb-2">New Responsibilities</h3>
                        <p className="text-slate-600">{data.newResponsibilities}</p>
                    </div>

                    <p className="text-slate-700 text-sm">
                        We appreciate your dedication to <strong>{data.companyName}</strong>. Keep up the excellent work!
                    </p>

                    {/* Signature - Horizontal */}
                    <div className="mt-auto pt-4 border-t border-slate-200">
                        <div className="flex items-end justify-between">
                            <div className="text-center">
                                <p className="text-sm text-slate-500 mb-2">For {data.companyName}</p>
                                <img src={signatureImage} alt="Signature" className="h-12 object-contain mx-auto" />
                                <div className="border-t border-slate-400 pt-2 w-48">
                                    <p className="font-bold text-slate-800 text-sm">{data.hrName}</p>
                                    <p className="text-xs text-slate-600">{data.hrDesignation}</p>
                                </div>
                            </div>
                            <CompanySeal companyName={data.companyName} size="md" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-sky-900 px-10 py-3 mt-auto">
                    <div className="flex justify-between text-sm text-sky-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono font-bold text-sky-100">Ref: {refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

PromotionLetterTemplate.displayName = 'PromotionLetterTemplate';
