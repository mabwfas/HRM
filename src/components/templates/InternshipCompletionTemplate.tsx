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
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700 px-12 py-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-black text-white">{data.companyName}</h1>
                            <p className="text-violet-100 text-base italic mt-2">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-2xl px-6 py-4 text-center">
                            <p className="text-xl font-black text-white">INTERNSHIP</p>
                            <p className="text-base font-bold text-violet-100">CERTIFICATE</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-12 py-4 bg-violet-50 border-b border-violet-200 flex justify-between text-base">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-12 py-8 flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-wide">Certificate of Completion</h2>
                        <div className="w-40 h-1.5 bg-gradient-to-r from-violet-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Intern Card */}
                    <div className="bg-violet-50 rounded-2xl p-8 border border-violet-200 flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                            {data.internName?.charAt(0) || 'I'}
                        </div>
                        <div>
                            <p className="text-2xl font-black text-violet-800">{data.internName || '[Intern Name]'}</p>
                            <p className="text-violet-600 text-lg">{data.internshipRole}</p>
                            <p className="text-slate-500 text-base">{data.department}</p>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <p className="text-slate-700 text-lg text-center mb-8 leading-relaxed">
                        This is to certify that <strong className="text-violet-700">{data.internName || '[Intern Name]'}</strong> has
                        successfully completed an internship at <strong>{data.companyName}</strong> as a <strong>{data.internshipRole}</strong>.
                    </p>

                    {/* Duration Grid */}
                    <div className="grid grid-cols-3 gap-5 mb-8">
                        <div className="bg-green-50 rounded-2xl p-5 text-center border border-green-200">
                            <p className="text-sm text-green-600 uppercase font-semibold">Start Date</p>
                            <p className="font-bold text-green-800 text-xl mt-1">{data.startDate || '—'}</p>
                        </div>
                        <div className="bg-violet-50 rounded-2xl p-5 text-center border border-violet-200">
                            <p className="text-sm text-violet-600 uppercase font-semibold">Duration</p>
                            <p className="font-bold text-violet-800 text-xl mt-1">{data.duration}</p>
                        </div>
                        <div className="bg-amber-50 rounded-2xl p-5 text-center border border-amber-200">
                            <p className="text-sm text-amber-600 uppercase font-semibold">End Date</p>
                            <p className="font-bold text-amber-800 text-xl mt-1">{data.endDate || '—'}</p>
                        </div>
                    </div>

                    {/* Performance & Skills */}
                    <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 mb-8">
                        <div className="flex justify-between items-center">
                            <p className="text-lg">Performance: <strong className="text-emerald-700 text-xl">{data.performanceRating}</strong></p>
                            <p className="text-lg">Skills: <strong className="text-slate-700">{data.skills}</strong></p>
                        </div>
                    </div>

                    <p className="text-slate-700 text-center text-lg mb-6">
                        We wish them all the best in their future endeavors and professional career.
                    </p>

                    {/* Signature - Horizontal */}
                    <div className="mt-auto pt-8 border-t border-slate-200">
                        <div className="flex items-end justify-between">
                            <div className="text-center">
                                <p className="text-base text-slate-500 mb-3">For {data.companyName}</p>
                                <img src={signatureImage} alt="Signature" className="h-14 object-contain mx-auto" />
                                <div className="border-t-2 border-slate-400 pt-3 w-56">
                                    <p className="font-bold text-slate-800 text-lg">{data.hrName}</p>
                                    <p className="text-base text-slate-600">{data.hrDesignation}</p>
                                </div>
                            </div>
                            <CompanySeal companyName={data.companyName} size="lg" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-violet-900 px-12 py-4 mt-auto">
                    <div className="flex justify-between text-base text-violet-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono font-bold text-violet-100">Certificate No: {certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

InternshipCompletionTemplate.displayName = 'InternshipCompletionTemplate';
