import { forwardRef, useMemo } from 'react';
import { InternshipCompletionData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, DOC_TYPES } from '../../utils/refGenerator';

interface InternshipCompletionTemplateProps {
    data: InternshipCompletionData;
}

export const InternshipCompletionTemplate = forwardRef<HTMLDivElement, InternshipCompletionTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        const certificateCode = useMemo(() =>
            generateRefNumber(data.internName || '', DOC_TYPES.IC),
            [data.internName]
        );

        const refNumber = useMemo(() =>
            generateRefNumber(data.internName || '', DOC_TYPES.IC),
            [data.internName]
        );

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none flex flex-col"
                style={{ minHeight: '297mm', maxHeight: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700 px-5 py-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-lg font-black text-white">{data.companyName}</h1>
                            <p className="text-violet-100 text-[10px] italic">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded px-2 py-1 text-center">
                            <p className="text-[10px] font-black text-white">INTERNSHIP CERTIFICATE</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-5 py-0.5 bg-violet-50 border-b border-violet-200 flex justify-between text-[10px]">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content - takes ~60% of remaining space */}
                <div className="px-5 py-2">
                    {/* Title */}
                    <div className="text-center mb-2">
                        <h2 className="text-base font-black text-slate-800 uppercase">Certificate of Completion</h2>
                        <div className="w-16 h-0.5 bg-violet-500 mx-auto mt-1 rounded-full"></div>
                    </div>

                    {/* Intern Card */}
                    <div className="bg-violet-50 rounded p-1.5 border border-violet-200 flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">
                            {data.internName?.charAt(0) || 'I'}
                        </div>
                        <div>
                            <p className="font-bold text-violet-800 text-sm">{data.internName || '[Intern Name]'}</p>
                            <p className="text-violet-600 text-[10px]">{data.internshipRole} • {data.department}</p>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <p className="text-slate-700 text-[10px] text-center mb-2 leading-relaxed">
                        This is to certify that <strong className="text-violet-700">{data.internName || '[Intern Name]'}</strong> has
                        successfully completed an internship at <strong>{data.companyName}</strong> as a <strong>{data.internshipRole}</strong>.
                    </p>

                    {/* Duration Grid */}
                    <div className="grid grid-cols-3 gap-1.5 mb-2">
                        <div className="bg-green-50 rounded p-1.5 text-center border border-green-200">
                            <p className="text-[9px] text-green-600 font-semibold">Start</p>
                            <p className="font-bold text-green-800 text-[10px]">{data.startDate || '—'}</p>
                        </div>
                        <div className="bg-violet-50 rounded p-1.5 text-center border border-violet-200">
                            <p className="text-[9px] text-violet-600 font-semibold">Duration</p>
                            <p className="font-bold text-violet-800 text-[10px]">{data.duration}</p>
                        </div>
                        <div className="bg-amber-50 rounded p-1.5 text-center border border-amber-200">
                            <p className="text-[9px] text-amber-600 font-semibold">End</p>
                            <p className="font-bold text-amber-800 text-[10px]">{data.endDate || '—'}</p>
                        </div>
                    </div>

                    {/* Performance & Skills */}
                    <div className="bg-emerald-50 rounded p-1.5 border border-emerald-200 mb-2 text-[10px]">
                        <span>Performance: <strong className="text-emerald-700">{data.performanceRating}</strong></span>
                        <span className="ml-3">Skills: <strong>{data.skills}</strong></span>
                    </div>

                    <p className="text-slate-600 text-center text-[10px]">We wish them all the best in their future endeavors.</p>
                </div>

                {/* Spacer to push signature to bottom */}
                <div className="flex-1"></div>

                {/* Signature Section - at bottom */}
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

                {/* Footer - Always at bottom */}
                <div className="bg-violet-900 px-5 py-1">
                    <div className="flex justify-between text-[10px] text-violet-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-violet-100">{certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

InternshipCompletionTemplate.displayName = 'InternshipCompletionTemplate';
