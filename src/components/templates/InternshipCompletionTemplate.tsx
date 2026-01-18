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
                style={{ width: '210mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700 px-6 py-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-black text-white">{data.companyName}</h1>
                            <p className="text-violet-100 text-xs italic">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-3 py-1.5 text-center">
                            <p className="text-xs font-black text-white">INTERNSHIP CERTIFICATE</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-6 py-1 bg-violet-50 border-b border-violet-200 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="px-6 py-3 flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-3">
                        <h2 className="text-lg font-black text-slate-800 uppercase">Certificate of Completion</h2>
                        <div className="w-20 h-0.5 bg-violet-500 mx-auto mt-1 rounded-full"></div>
                    </div>

                    {/* Intern Card */}
                    <div className="bg-violet-50 rounded-lg p-2 border border-violet-200 flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-sm font-bold">
                            {data.internName?.charAt(0) || 'I'}
                        </div>
                        <div>
                            <p className="font-bold text-violet-800">{data.internName || '[Intern Name]'}</p>
                            <p className="text-violet-600 text-xs">{data.internshipRole} • {data.department}</p>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <p className="text-slate-700 text-xs text-center mb-3 leading-relaxed">
                        This is to certify that <strong className="text-violet-700">{data.internName || '[Intern Name]'}</strong> has
                        successfully completed an internship at <strong>{data.companyName}</strong> as a <strong>{data.internshipRole}</strong>.
                    </p>

                    {/* Duration Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-green-50 rounded p-2 text-center border border-green-200">
                            <p className="text-xs text-green-600 font-semibold">Start</p>
                            <p className="font-bold text-green-800 text-sm">{data.startDate || '—'}</p>
                        </div>
                        <div className="bg-violet-50 rounded p-2 text-center border border-violet-200">
                            <p className="text-xs text-violet-600 font-semibold">Duration</p>
                            <p className="font-bold text-violet-800 text-sm">{data.duration}</p>
                        </div>
                        <div className="bg-amber-50 rounded p-2 text-center border border-amber-200">
                            <p className="text-xs text-amber-600 font-semibold">End</p>
                            <p className="font-bold text-amber-800 text-sm">{data.endDate || '—'}</p>
                        </div>
                    </div>

                    {/* Performance & Skills */}
                    <div className="bg-emerald-50 rounded p-2 border border-emerald-200 mb-3 text-xs">
                        <span>Performance: <strong className="text-emerald-700">{data.performanceRating}</strong></span>
                        <span className="ml-4">Skills: <strong>{data.skills}</strong></span>
                    </div>

                    <p className="text-slate-600 text-center text-xs mb-2">We wish them all the best in their future endeavors.</p>

                    {/* Signature */}
                    <div className="pt-2 border-t border-slate-200 flex items-end justify-between">
                        <div className="text-center">
                            <img src={signatureImage} alt="Signature" className="h-8 object-contain mx-auto" />
                            <div className="border-t border-slate-400 pt-1 w-32">
                                <p className="font-bold text-slate-800 text-xs">{data.hrName}</p>
                                <p className="text-xs text-slate-600">{data.hrDesignation}</p>
                            </div>
                        </div>
                        <CompanySeal companyName={data.companyName} size="sm" />
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-violet-900 px-6 py-1.5">
                    <div className="flex justify-between text-xs text-violet-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-violet-100">{certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

InternshipCompletionTemplate.displayName = 'InternshipCompletionTemplate';
