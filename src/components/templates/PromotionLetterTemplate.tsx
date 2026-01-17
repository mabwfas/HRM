import { forwardRef } from 'react';
import { PromotionLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface PromotionLetterTemplateProps {
    data: PromotionLetterData;
}

export const PromotionLetterTemplate = forwardRef<HTMLDivElement, PromotionLetterTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        const formatCurrency = (amount: number): string => {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
            }).format(amount);
        };

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none"
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-sky-100 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                                    <p className="text-xl font-black text-white">PROMOTION</p>
                                    <p className="text-lg font-bold text-sky-100">LETTER</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Reference */}
                <div className="px-10 py-4 bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600"><strong>Ref:</strong> {data.refNumber}</span>
                        <span className="text-slate-600"><strong>Date:</strong> {data.date}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 py-8 space-y-6">
                    {/* Employee Card */}
                    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-200">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
                                <span className="text-2xl font-bold text-white">{data.employeeName?.charAt(0) || 'E'}</span>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-sky-800">{data.employeeName || '[Employee Name]'}</p>
                                <p className="text-sm text-slate-600">{data.currentDesignation} • {data.department}</p>
                                <p className="text-xs text-slate-400">ID: {data.employeeId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Congratulations Banner */}
                    <div className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-2xl p-6 text-center">
                        <p className="text-white text-2xl font-black">🎉 CONGRATULATIONS! 🎉</p>
                        <p className="text-white/90 mt-1">On your well-deserved promotion</p>
                    </div>

                    {/* Promotion Card */}
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200">
                        <h3 className="font-bold text-purple-800 mb-4 text-center">Promotion Details</h3>
                        <div className="flex items-center justify-between gap-4">
                            <div className="text-center flex-1 bg-white rounded-xl p-4">
                                <p className="text-xs text-slate-500 uppercase">Previous Role</p>
                                <p className="font-semibold text-slate-700">{data.currentDesignation}</p>
                            </div>
                            <div className="text-3xl text-purple-500">→</div>
                            <div className="text-center flex-1 bg-purple-100 rounded-xl p-4 border-2 border-purple-300">
                                <p className="text-xs text-purple-500 uppercase">New Role</p>
                                <p className="font-bold text-purple-700 text-lg">{data.newDesignation}</p>
                            </div>
                        </div>
                    </div>

                    {/* Salary Revision Card */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                        <h3 className="font-bold text-green-800 mb-4 text-center">Compensation Revision</h3>
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <div className="text-center p-4 bg-white rounded-xl">
                                <p className="text-xs text-slate-500 uppercase">Previous CTC</p>
                                <p className="font-bold text-slate-700 text-lg">{formatCurrency(data.currentCtc)}</p>
                            </div>
                            <div className="text-center p-4 bg-green-100 rounded-xl border-2 border-green-300">
                                <p className="text-xs text-green-600 uppercase">New CTC</p>
                                <p className="font-black text-green-700 text-xl">{formatCurrency(data.newCtc)}</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-green-200 text-center">
                            <p className="text-sm text-slate-600"><strong>Effective From:</strong> {data.effectiveDate || '[Effective Date]'}</p>
                        </div>
                    </div>

                    {/* New Responsibilities */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-3">New Responsibilities</h3>
                        <p className="text-slate-600">{data.newResponsibilities}</p>
                    </div>

                    <p className="text-slate-700">
                        We appreciate your dedication and contributions to <strong>{data.companyName}</strong>.
                        Keep up the excellent work!
                    </p>
                </div>

                {/* Signature Section */}
                <div className="px-10 py-10">
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-slate-500 mb-2">For {data.companyName}</p>
                        <img src={signatureImage} alt="Signature" className="h-14 object-contain mb-2" />
                        <div className="border-t border-slate-400 pt-2 w-56 text-center">
                            <p className="font-bold text-slate-800">{data.hrName}</p>
                            <p className="text-sm text-slate-600">{data.hrDesignation}</p>
                        </div>
                        <div className="mt-4">
                            <CompanySeal companyName={data.companyName} size="md" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-sky-900 px-10 py-4 mt-auto">
                    <div className="flex justify-between items-center text-xs text-sky-200">
                        <p>© {new Date().getFullYear()} {data.companyName}. All Rights Reserved.</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

PromotionLetterTemplate.displayName = 'PromotionLetterTemplate';
