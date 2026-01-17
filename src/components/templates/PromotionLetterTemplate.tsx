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
                <div className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 px-12 py-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-black text-white">{data.companyName}</h1>
                            <p className="text-sky-100 text-base mt-2">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-2xl px-6 py-4 text-center">
                            <p className="text-xl font-black text-white">PROMOTION</p>
                            <p className="text-base font-bold text-sky-100">LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-12 py-4 bg-sky-50 border-b border-sky-200 flex justify-between text-base">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-12 py-8 flex flex-col">
                    {/* Employee Info */}
                    <div className="bg-sky-50 rounded-2xl p-5 border border-sky-200 flex items-center gap-5 mb-6">
                        <div className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center text-white text-2xl font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sky-800 text-xl">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-base text-slate-600">{data.currentDesignation} • {data.department} • ID: {data.employeeId}</p>
                        </div>
                        <div className="bg-green-500 text-white px-5 py-2 rounded-full text-base font-bold">
                            PROMOTED
                        </div>
                    </div>

                    {/* Congratulations Banner */}
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 text-center mb-6">
                        <p className="text-white text-3xl font-black">CONGRATULATIONS!</p>
                        <p className="text-white/90 mt-2 text-lg">On your well-deserved promotion</p>
                    </div>

                    {/* Promotion Details */}
                    <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200 mb-6">
                        <h3 className="font-bold text-purple-800 mb-5 text-center text-xl">Promotion Details</h3>
                        <div className="flex items-center justify-between gap-5">
                            <div className="text-center flex-1 bg-white rounded-2xl p-5">
                                <p className="text-sm text-slate-500 uppercase font-semibold">Previous Role</p>
                                <p className="font-semibold text-slate-700 text-xl mt-1">{data.currentDesignation}</p>
                            </div>
                            <div className="text-4xl text-purple-500 font-bold">→</div>
                            <div className="text-center flex-1 bg-purple-100 rounded-2xl p-5 border-2 border-purple-300">
                                <p className="text-sm text-purple-500 uppercase font-semibold">New Role</p>
                                <p className="font-bold text-purple-700 text-xl mt-1">{data.newDesignation}</p>
                            </div>
                        </div>
                    </div>

                    {/* Salary Revision */}
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-200 mb-6">
                        <h3 className="font-bold text-green-800 mb-5 text-center text-xl">Compensation Revision</h3>
                        <div className="grid grid-cols-3 gap-5 items-center">
                            <div className="text-center p-4 bg-white rounded-2xl">
                                <p className="text-sm text-slate-500 uppercase font-semibold">Previous CTC</p>
                                <p className="font-bold text-slate-700 text-xl mt-1">{formatCurrency(data.currentCtc)}</p>
                            </div>
                            <div className="text-center p-4 bg-green-100 rounded-2xl border-2 border-green-300">
                                <p className="text-sm text-green-600 uppercase font-semibold">New CTC</p>
                                <p className="font-black text-green-700 text-2xl mt-1">{formatCurrency(data.newCtc)}</p>
                            </div>
                            <div className="text-center p-4 bg-white rounded-2xl">
                                <p className="text-sm text-slate-500 uppercase font-semibold">Effective From</p>
                                <p className="font-bold text-slate-700 text-lg mt-1">{data.effectiveDate || '—'}</p>
                            </div>
                        </div>
                    </div>

                    {/* New Responsibilities */}
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-5">
                        <h3 className="font-bold text-slate-800 mb-3 text-lg">New Responsibilities</h3>
                        <p className="text-slate-600 text-base">{data.newResponsibilities}</p>
                    </div>

                    {/* Signature - Horizontal */}
                    <div className="mt-auto pt-5 border-t border-slate-200">
                        <div className="flex items-end justify-between">
                            <div className="text-center">
                                <p className="text-base text-slate-500 mb-2">For {data.companyName}</p>
                                <img src={signatureImage} alt="Signature" className="h-14 object-contain mx-auto" />
                                <div className="border-t-2 border-slate-400 pt-2 w-52">
                                    <p className="font-bold text-slate-800">{data.hrName}</p>
                                    <p className="text-sm text-slate-600">{data.hrDesignation}</p>
                                </div>
                            </div>
                            <CompanySeal companyName={data.companyName} size="lg" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-sky-900 px-12 py-4 mt-auto">
                    <div className="flex justify-between text-base text-sky-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono font-bold text-sky-100">Ref: {refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

PromotionLetterTemplate.displayName = 'PromotionLetterTemplate';
