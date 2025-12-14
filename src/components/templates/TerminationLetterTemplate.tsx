import { forwardRef } from 'react';
import { TerminationLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface TerminationLetterTemplateProps {
    data: TerminationLetterData;
}

export const TerminationLetterTemplate = forwardRef<HTMLDivElement, TerminationLetterTemplateProps>(
    ({ data }, ref) => {
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
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-rose-600 to-pink-700"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-red-100 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                                    <p className="text-xl font-black text-white">TERMINATION</p>
                                    <p className="text-lg font-bold text-red-100">LETTER</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Reference */}
                <div className="px-10 py-4 bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600"><strong>Ref:</strong> {data.refNumber}</span>
                        <span className="text-slate-600"><strong>Date:</strong> {data.date}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 py-8 space-y-6">
                    {/* Employee Card */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg">
                                <span className="text-2xl font-bold text-white">{data.employeeName?.charAt(0) || 'E'}</span>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-slate-800">{data.employeeName || '[Employee Name]'}</p>
                                <p className="text-sm text-slate-600">{data.designation} • {data.department}</p>
                                <p className="text-xs text-slate-400">ID: {data.employeeId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="text-slate-700">
                        <p className="font-semibold text-lg text-red-700">
                            Subject: {data.terminationType}
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="text-slate-700 leading-relaxed space-y-4">
                        <p>
                            This letter serves as official notice that your employment with <strong>{data.companyName}</strong> is
                            being terminated effective <strong>{data.lastWorkingDate || '[Last Working Date]'}</strong>.
                        </p>
                    </div>

                    {/* Reason Card */}
                    <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                        <h3 className="font-bold text-red-800 mb-3">Reason for Termination</h3>
                        <p className="text-slate-700">{data.terminationReason || '[Reason for termination]'}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <p className="text-xs text-slate-500 uppercase">Last Working Day</p>
                            <p className="font-bold text-slate-800">{data.lastWorkingDate || '—'}</p>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                            <p className="text-xs text-amber-600 uppercase">Notice Period Status</p>
                            <p className="font-bold text-amber-800">{data.noticePeriodStatus}</p>
                        </div>
                    </div>

                    {/* Settlement Details */}
                    <div className="bg-slate-800 rounded-2xl p-6 text-white">
                        <h3 className="font-bold mb-2">Settlement Details</h3>
                        <p className="text-slate-200">{data.settlementDetails}</p>
                    </div>

                    <div className="text-slate-700 leading-relaxed space-y-4">
                        <p>
                            Please ensure that all company property including laptops, access cards, and any other
                            equipment is returned on or before your last working day.
                        </p>
                        <p>
                            We wish you the best in your future endeavors.
                        </p>
                    </div>
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
                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-500 mb-8">Employee Acknowledgement</p>
                            <div className="border-t border-slate-400 pt-2 w-56">
                                <p className="font-bold text-slate-800">{data.employeeName || '________________'}</p>
                                <p className="text-sm text-slate-600">Date: ________________</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-red-900 px-10 py-4 mt-auto">
                    <div className="flex justify-between items-center text-xs text-red-200">
                        <p>© {new Date().getFullYear()} {data.companyName}. CONFIDENTIAL</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

TerminationLetterTemplate.displayName = 'TerminationLetterTemplate';
