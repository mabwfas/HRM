import { forwardRef } from 'react';
import { AppraisalLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface AppraisalLetterTemplateProps {
    data: AppraisalLetterData;
}

export const AppraisalLetterTemplate = forwardRef<HTMLDivElement, AppraisalLetterTemplateProps>(
    ({ data }, ref) => {
        const formatCurrency = (amount: number): string => {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
            }).format(amount);
        };

        // Get signatory image
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none"
                style={{ width: '210mm', minHeight: '297mm' }}
            >
                {/* Header */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-600"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-cyan-100 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                                    <p className="text-xl font-black text-white">APPRAISAL</p>
                                    <p className="text-lg font-bold text-cyan-100">LETTER</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Reference */}
                <div className="px-10 py-4 bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-cyan-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600"><strong>Ref:</strong> {data.refNumber}</span>
                        <span className="text-slate-600"><strong>Date:</strong> {data.date}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 py-8 space-y-6">
                    {/* Employee Card */}
                    <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 border border-cyan-200">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                <span className="text-2xl font-bold text-white">{data.employeeName?.charAt(0) || 'E'}</span>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-cyan-800">{data.employeeName || '[Employee Name]'}</p>
                                <p className="text-sm text-slate-600">{data.designation} • {data.department}</p>
                                <p className="text-xs text-slate-400">ID: {data.employeeId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Congratulations Banner */}
                    <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-2xl p-6 text-center">
                        <p className="text-white text-2xl font-black">CONGRATULATIONS!</p>
                        <p className="text-white/90 mt-1">On your well-deserved promotion and salary revision</p>
                    </div>

                    {/* Main Content */}
                    <div className="text-slate-700 leading-loose space-y-4">
                        <p>
                            We are pleased to inform you that based on your <strong className="text-cyan-700">{data.performanceRating}</strong> performance
                            during the review period, management has decided to revise your compensation and designation.
                        </p>

                        {/* Promotion Card */}
                        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200">
                            <h3 className="font-bold text-purple-800 mb-4">Promotion Details</h3>
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-center flex-1">
                                    <p className="text-xs text-slate-500 uppercase">Previous</p>
                                    <p className="font-semibold text-slate-700">{data.designation}</p>
                                </div>
                                <div className="text-3xl text-purple-500">→</div>
                                <div className="text-center flex-1">
                                    <p className="text-xs text-slate-500 uppercase">New</p>
                                    <p className="font-bold text-purple-700 text-lg">{data.newDesignation}</p>
                                </div>
                            </div>
                        </div>

                        {/* Salary Revision Card */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                            <h3 className="font-bold text-green-800 mb-4">Compensation Revision</h3>
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <div className="text-center p-4 bg-white rounded-xl">
                                    <p className="text-xs text-slate-500 uppercase">Previous CTC</p>
                                    <p className="font-bold text-slate-700 text-lg">{formatCurrency(data.currentCtc)}</p>
                                </div>
                                <div className="text-center">
                                    <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full font-black text-xl">
                                        +{data.incrementPercentage}%
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-green-100 rounded-xl border-2 border-green-300">
                                    <p className="text-xs text-green-600 uppercase">New CTC</p>
                                    <p className="font-black text-green-700 text-xl">{formatCurrency(data.newCtc)}</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-green-200 text-center">
                                <p className="text-sm text-slate-600">
                                    <strong>Effective From:</strong> {data.effectiveDate || '[Effective Date]'}
                                </p>
                            </div>
                        </div>

                        {/* Achievements */}
                        {data.achievements && (
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-3">Key Achievements</h3>
                                <p className="text-slate-600">{data.achievements}</p>
                            </div>
                        )}

                        <p>
                            We appreciate your dedication and contributions to <strong>{data.companyName}</strong>.
                            This recognition is a testament to your hard work and commitment to excellence.
                        </p>

                        <p>
                            We look forward to your continued success and contributions in your new role.
                            Keep up the excellent work!
                        </p>
                    </div>
                </div>

                {/* Signature Section */}
                <div className="px-10 py-10">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-sm text-slate-500 mb-2">For {data.companyName}</p>
                            <img
                                src={signatureImage}
                                alt="Signature"
                                className="h-12 object-contain mb-1"
                            />
                            <div className="border-t border-slate-400 pt-1 w-48">
                                <p className="font-bold text-slate-800">{data.hrName}</p>
                                <p className="text-sm text-slate-600">{data.hrDesignation}</p>
                            </div>
                        </div>

                        {/* Company Seal */}
                        <CompanySeal companyName={data.companyName} size="md" />

                        <div className="text-right">
                            <p className="text-sm text-slate-500 mb-10">Employee Acknowledgement</p>
                            <div className="border-t border-slate-400 pt-1 w-48 text-center">
                                <p className="font-bold text-slate-800">{data.employeeName || '________________'}</p>
                                <p className="text-sm text-slate-600">Date: ________________</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-cyan-900 px-10 py-4 mt-auto">
                    <div className="flex justify-between items-center text-xs text-cyan-200">
                        <p>© {new Date().getFullYear()} {data.companyName}. All Rights Reserved.</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

AppraisalLetterTemplate.displayName = 'AppraisalLetterTemplate';
