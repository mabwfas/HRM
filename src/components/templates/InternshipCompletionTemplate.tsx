import { forwardRef, useMemo } from 'react';
import { InternshipCompletionData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, DOC_TYPES } from '../../utils/refGenerator';

interface InternshipCompletionTemplateProps {
    data: InternshipCompletionData;
    showSeal?: boolean;
}

export const InternshipCompletionTemplate = forwardRef<HTMLDivElement, InternshipCompletionTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        const refNumber = useMemo(() =>
            generateRefNumber(data.internName || '', DOC_TYPES.IC),
            [data.internName]
        );

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none flex flex-col"
                style={{ width: '210mm', height: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700 px-10 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-violet-100 text-sm">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                            <p className="text-base font-black text-white">INTERNSHIP CERTIFICATE</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-10 py-2 bg-violet-50 border-b border-violet-200 flex justify-between text-sm">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="px-10 py-6 flex-1 flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wide">🎓 Certificate of Completion</h2>
                        <div className="w-24 h-1 bg-violet-500 mx-auto mt-2 rounded-full"></div>
                    </div>

                    {/* Intern Card */}
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-5 border border-violet-200 flex items-center gap-5 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                            {data.internName?.charAt(0) || 'I'}
                        </div>
                        <div>
                            <p className="font-bold text-violet-800 text-xl">{data.internName || '[Intern Name]'}</p>
                            <p className="text-violet-600">{data.internshipRole} • {data.department}</p>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <div className="text-slate-700 text-base leading-relaxed space-y-4 mb-6">
                        <p className="text-justify">
                            This is to certify that <strong className="text-violet-700">{data.internName || '[Intern Name]'}</strong> has
                            successfully completed an internship at <strong>{data.companyName}</strong> as a <strong>{data.internshipRole}</strong> in
                            the <strong>{data.department}</strong> department.
                        </p>
                    </div>

                    {/* Duration Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                            <p className="text-sm text-green-600 font-semibold">Start Date</p>
                            <p className="font-bold text-green-800 text-lg">{data.startDate || '—'}</p>
                        </div>
                        <div className="bg-violet-50 rounded-lg p-4 text-center border border-violet-200">
                            <p className="text-sm text-violet-600 font-semibold">Duration</p>
                            <p className="font-bold text-violet-800 text-lg">{data.duration}</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4 text-center border border-amber-200">
                            <p className="text-sm text-amber-600 font-semibold">End Date</p>
                            <p className="font-bold text-amber-800 text-lg">{data.endDate || '—'}</p>
                        </div>
                    </div>

                    {/* Performance & Skills */}
                    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200 mb-6">
                        <div className="flex gap-8">
                            <span className="text-base"><strong>Performance:</strong> <span className="text-emerald-700 font-bold">{data.performanceRating}</span></span>
                            <span className="text-base"><strong>Skills:</strong> {data.skills}</span>
                        </div>
                    </div>

                    <p className="text-slate-600 text-center text-base">We wish them all the best in their future endeavors.</p>

                    {/* Spacer */}
                    <div className="flex-1"></div>

                    {/* Signature */}
                    <div className="pt-4 border-t border-slate-200 mt-4">
                        <div className="flex items-end justify-between">
                            <div>
                                <img src={signatureImage} alt="Signature" className="h-12 object-contain" />
                                <div className="border-t-2 border-slate-400 pt-1 mt-1 w-48">
                                    <p className="font-bold text-slate-800">{data.hrName}</p>
                                    <p className="text-slate-600 text-sm">{data.hrDesignation}</p>
                                </div>
                            </div>
                            {showSeal && <CompanySeal companyName={data.companyName} size="md" />}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-violet-900 px-10 py-3">
                    <div className="flex justify-between text-sm text-violet-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-xs">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

InternshipCompletionTemplate.displayName = 'InternshipCompletionTemplate';
