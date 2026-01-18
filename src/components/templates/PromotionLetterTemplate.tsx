import { forwardRef, useMemo } from 'react';
import { PromotionLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, generateEmployeeId, DOC_TYPES } from '../../utils/refGenerator';

interface PromotionLetterTemplateProps {
    data: PromotionLetterData;
    showSeal?: boolean;
}

export const PromotionLetterTemplate = forwardRef<HTMLDivElement, PromotionLetterTemplateProps>(
    ({ data, showSeal = true }, ref) => {
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
                style={{ width: '210mm', height: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 px-10 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-sky-100 text-sm">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                            <p className="text-base font-black text-white">PROMOTION LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-10 py-2 bg-sky-50 border-b border-sky-200 flex justify-between text-sm">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="px-10 py-5 flex-1 flex flex-col">
                    {/* Employee Info */}
                    <div className="bg-sky-50 rounded-xl p-5 border border-sky-200 flex items-center gap-5 mb-5">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sky-800 text-xl">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-sky-600">{data.currentDesignation} • {data.department} • ID: {employeeId}</p>
                        </div>
                        <div className="bg-green-500 text-white px-4 py-1.5 rounded-full font-bold">
                            🎉 PROMOTED
                        </div>
                    </div>

                    {/* Congratulations Banner */}
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl p-4 text-center mb-5">
                        <p className="text-white text-2xl font-black">CONGRATULATIONS!</p>
                    </div>

                    {/* Promotion Details */}
                    <div className="bg-purple-50 rounded-xl p-5 border border-purple-200 mb-5">
                        <h3 className="text-center text-lg font-bold text-purple-800 mb-4">Role Transition</h3>
                        <div className="flex items-center justify-between gap-4">
                            <div className="text-center flex-1 bg-white rounded-lg p-4">
                                <p className="text-sm text-slate-500">Previous Role</p>
                                <p className="font-bold text-slate-700 text-lg">{data.currentDesignation}</p>
                            </div>
                            <div className="text-3xl text-purple-500 font-bold">→</div>
                            <div className="text-center flex-1 bg-purple-100 rounded-lg p-4 border-2 border-purple-300">
                                <p className="text-sm text-purple-600">New Role</p>
                                <p className="font-bold text-purple-800 text-lg">{data.newDesignation}</p>
                            </div>
                        </div>
                    </div>

                    {/* Salary Revision */}
                    <div className="bg-green-50 rounded-xl p-5 border border-green-200 mb-5">
                        <h3 className="text-center text-lg font-bold text-green-800 mb-4">Compensation Revision</h3>
                        <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-center p-3 bg-white rounded-lg">
                                <p className="text-sm text-slate-500">Previous CTC</p>
                                <p className="font-bold text-slate-700 text-lg">{formatCurrency(data.currentCtc)}</p>
                            </div>
                            <div className="text-center p-4 bg-green-100 rounded-lg border-2 border-green-300">
                                <p className="text-sm text-green-600">New CTC</p>
                                <p className="font-black text-green-700 text-2xl">{formatCurrency(data.newCtc)}</p>
                            </div>
                            <div className="text-center p-3 bg-white rounded-lg">
                                <p className="text-sm text-slate-500">Effective From</p>
                                <p className="font-bold text-slate-700 text-lg">{data.effectiveDate || '—'}</p>
                            </div>
                        </div>
                    </div>

                    {/* New Responsibilities */}
                    <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 mb-4">
                        <h3 className="font-bold text-slate-800 text-lg mb-2">New Responsibilities</h3>
                        <p className="text-slate-600">{data.newResponsibilities}</p>
                    </div>

                    <p className="text-slate-600">We appreciate your dedication and look forward to your continued success!</p>

                    {/* Spacer */}
                    <div className="flex-1"></div>

                    {/* Signature */}
                    <div className="pt-3 border-t border-slate-200 mt-3">
                        <div className="flex items-end justify-between">
                            <div>
                                <img src={signatureImage} alt="Signature" className="h-10 object-contain" />
                                <div className="border-t-2 border-slate-400 pt-1 mt-1 w-44">
                                    <p className="font-bold text-slate-800 text-sm">{data.hrName}</p>
                                    <p className="text-slate-600 text-xs">{data.hrDesignation}</p>
                                </div>
                            </div>
                            {showSeal && <CompanySeal companyName={data.companyName} size="sm" />}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-sky-900 px-10 py-3">
                    <div className="flex justify-between text-sm text-sky-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-xs">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

PromotionLetterTemplate.displayName = 'PromotionLetterTemplate';
