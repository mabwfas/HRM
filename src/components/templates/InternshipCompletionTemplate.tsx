import { forwardRef, useMemo } from 'react';
import { InternshipCompletionData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, generateEmployeeId, DOC_TYPES } from '../../utils/refGenerator';

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
                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-violet-100 text-xs italic">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                            <p className="text-sm font-black text-white">INTERNSHIP</p>
                            <p className="text-xs font-bold text-violet-100">CERTIFICATE</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-8 py-1.5 bg-violet-50 border-b border-violet-200 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-8 py-4 flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-4">
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-wide">Certificate of Completion</h2>
                        <div className="w-24 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 mx-auto mt-2 rounded-full"></div>
                    </div>

                    {/* Intern Card */}
                    <div className="bg-violet-50 rounded-lg p-3 border border-violet-200 flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow">
                            {data.internName?.charAt(0) || 'I'}
                        </div>
                        <div>
                            <p className="text-lg font-black text-violet-800">{data.internName || '[Intern Name]'}</p>
                            <p className="text-violet-600 text-sm">{data.internshipRole}</p>
                            <p className="text-slate-500 text-xs">{data.department}</p>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <p className="text-slate-700 text-sm text-center mb-4 leading-relaxed">
                        This is to certify that <strong className="text-violet-700">{data.internName || '[Intern Name]'}</strong> has
                        successfully completed an internship at <strong>{data.companyName}</strong> as a <strong>{data.internshipRole}</strong>.
                    </p>

                    {/* Duration Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                            <p className="text-xs text-green-600 uppercase font-semibold">Start Date</p>
                            <p className="font-bold text-green-800">{data.startDate || '—'}</p>
                        </div>
                        <div className="bg-violet-50 rounded-lg p-3 text-center border border-violet-200">
                            <p className="text-xs text-violet-600 uppercase font-semibold">Duration</p>
                            <p className="font-bold text-violet-800">{data.duration}</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-200">
                            <p className="text-xs text-amber-600 uppercase font-semibold">End Date</p>
                            <p className="font-bold text-amber-800">{data.endDate || '—'}</p>
                        </div>
                    </div>

                    {/* Performance & Skills */}
                    <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200 mb-4">
                        <div className="flex justify-between items-center text-sm">
                            <p>Performance: <strong className="text-emerald-700">{data.performanceRating}</strong></p>
                            <p>Skills: <strong className="text-slate-700">{data.skills}</strong></p>
                        </div>
                    </div>

                    <p className="text-slate-700 text-center text-sm mb-3">
                        We wish them all the best in their future endeavors.
                    </p>

                    {/* Signature - Horizontal */}
                    <div className="mt-auto pt-3 border-t border-slate-200">
                        <div className="flex items-end justify-between">
                            <div className="text-center">
                                <p className="text-xs text-slate-500 mb-1">For {data.companyName}</p>
                                <img src={signatureImage} alt="Signature" className="h-10 object-contain mx-auto" />
                                <div className="border-t border-slate-400 pt-1 w-40">
                                    <p className="font-bold text-slate-800 text-sm">{data.hrName}</p>
                                    <p className="text-xs text-slate-600">{data.hrDesignation}</p>
                                </div>
                            </div>
                            <CompanySeal companyName={data.companyName} size="sm" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-violet-900 px-8 py-2 mt-auto">
                    <div className="flex justify-between text-xs text-violet-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono font-bold text-violet-100">Certificate No: {certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

InternshipCompletionTemplate.displayName = 'InternshipCompletionTemplate';
