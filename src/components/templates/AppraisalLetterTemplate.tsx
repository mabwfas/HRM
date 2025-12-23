import { forwardRef } from 'react';
import { AppraisalLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface AppraisalLetterTemplateProps {
    data: AppraisalLetterData;
    showSeal?: boolean;
}

export const AppraisalLetterTemplate = forwardRef<HTMLDivElement, AppraisalLetterTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

        return (
            <div
                ref={ref}
                className="bg-white shadow-2xl print:shadow-none text-[11px] flex flex-col overflow-hidden"
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-700 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-cyan-100 text-xs">{data.companyTagline}</p>
                        </div>
                        <div className="text-right bg-white/20 rounded-lg px-4 py-2">
                            <p className="text-lg font-bold text-white">APPRAISAL</p>
                            <p className="text-cyan-100">LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-8 py-2 bg-cyan-50 border-b border-cyan-100 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {data.refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                <div className="px-8 py-3">
                    {/* Employee Card */}
                    <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-3 mb-3 border border-cyan-200 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div>
                            <p className="text-lg font-bold text-cyan-800">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-sm text-slate-600">{data.designation} • {data.department}</p>
                            <p className="text-xs text-slate-400">ID: {data.employeeId}</p>
                        </div>
                    </div>

                    {/* Congratulations Banner */}
                    <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-lg p-3 text-center mb-3">
                        <p className="text-white text-lg font-black">🎉 CONGRATULATIONS!</p>
                        <p className="text-white/90 text-xs">On your well-deserved promotion and salary revision</p>
                    </div>

                    {/* Main Content */}
                    <p className="text-slate-700 mb-3">
                        We are pleased to inform you that based on your <strong className="text-cyan-700">{data.performanceRating}</strong> performance
                        during the review period, management has decided to revise your compensation and designation.
                    </p>

                    {/* Promotion Card */}
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-3 mb-3 border border-purple-200">
                        <h3 className="font-bold text-purple-800 mb-2 text-xs">Promotion Details</h3>
                        <div className="flex items-center justify-between gap-4">
                            <div className="text-center flex-1 bg-white rounded-lg p-2">
                                <p className="text-[10px] text-slate-500 uppercase">Previous</p>
                                <p className="font-semibold text-slate-700 text-xs">{data.designation}</p>
                            </div>
                            <div className="text-2xl text-purple-500">→</div>
                            <div className="text-center flex-1 bg-purple-100 rounded-lg p-2 border border-purple-300">
                                <p className="text-[10px] text-purple-600 uppercase">New</p>
                                <p className="font-bold text-purple-700 text-sm">{data.newDesignation}</p>
                            </div>
                        </div>
                    </div>

                    {/* Salary Revision Card */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 mb-3 border border-green-200">
                        <h3 className="font-bold text-green-800 mb-2 text-xs">Compensation Revision</h3>
                        <div className="grid grid-cols-3 gap-3 items-center">
                            <div className="text-center p-2 bg-white rounded-lg">
                                <p className="text-[10px] text-slate-500 uppercase">Previous CTC</p>
                                <p className="font-bold text-slate-700">{formatCurrency(data.currentCtc)}</p>
                            </div>
                            <div className="text-center">
                                <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full font-black text-lg">
                                    +{data.incrementPercentage}%
                                </div>
                            </div>
                            <div className="text-center p-2 bg-green-100 rounded-lg border-2 border-green-300">
                                <p className="text-[10px] text-green-600 uppercase">New CTC</p>
                                <p className="font-black text-green-700 text-lg">{formatCurrency(data.newCtc)}</p>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-green-200 text-center">
                            <p className="text-xs text-slate-600"><strong>Effective From:</strong> {data.effectiveDate || '[Effective Date]'}</p>
                        </div>
                    </div>

                    {/* Achievements */}
                    {data.achievements && (
                        <div className="bg-slate-50 rounded-lg p-3 mb-3 border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-1 text-xs">Key Achievements</h3>
                            <p className="text-slate-600 text-xs">{data.achievements}</p>
                        </div>
                    )}

                    <p className="text-slate-700 text-xs">
                        We appreciate your dedication and contributions to <strong>{data.companyName}</strong>.
                        This recognition is a testament to your hard work. Keep up the excellent work!
                    </p>
                </div>

                {/* Signature Section */}
                <div className="mt-auto px-8 pt-3">
                    <div className="flex justify-between items-end border-t border-slate-200 pt-3">
                        <div className="text-left">
                            <p className="text-xs text-slate-500 mb-1">For {data.companyName}</p>
                            <img src={signatureImage} alt="Signature" className="h-10 object-contain mb-1" />
                            <div className="border-t border-slate-400 pt-1 w-40">
                                <p className="font-bold text-slate-800 text-xs">{data.hrName}</p>
                                <p className="text-[10px] text-slate-600">{data.hrDesignation}</p>
                            </div>
                        </div>
                        {showSeal && <CompanySeal companyName={data.companyName} size="md" />}
                        <div className="text-right">
                            <p className="text-xs text-slate-500 mb-6">Employee Acknowledgement</p>
                            <div className="border-t border-slate-400 pt-1 w-40 text-center">
                                <p className="font-bold text-slate-800 text-xs">{data.employeeName || '________________'}</p>
                                <p className="text-[10px] text-slate-600">Date: ________________</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-cyan-900 px-8 py-2">
                    <div className="flex justify-between text-xs text-cyan-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

AppraisalLetterTemplate.displayName = 'AppraisalLetterTemplate';
