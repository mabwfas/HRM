import { forwardRef, useMemo } from 'react';
import { InternshipCompletionData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, DOC_TYPES } from '../../utils/refGenerator';

interface LORTemplateProps {
    data: InternshipCompletionData;
}

export const LORTemplate = forwardRef<HTMLDivElement, LORTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        const certificateCode = useMemo(() =>
            generateRefNumber(data.internName || '', DOC_TYPES.LOR),
            [data.internName]
        );

        const uniqueRefNumber = useMemo(() =>
            generateRefNumber(data.internName || '', DOC_TYPES.LOR),
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
                <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 px-10 py-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-black text-white">{data.companyName}</h1>
                            <p className="text-amber-100 text-sm italic mt-1">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-xl px-5 py-3 text-center">
                            <p className="text-base font-black text-white">LETTER OF</p>
                            <p className="text-sm font-bold text-amber-100">RECOMMENDATION</p>
                            <p className="text-xs text-amber-200">★ TOP PERFORMER ★</p>
                        </div>
                    </div>
                </div>

                {/* Reference & Date Bar */}
                <div className="px-10 py-2 bg-amber-50 border-b border-amber-200 flex justify-between text-sm">
                    <span><strong>Ref:</strong> {uniqueRefNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 px-10 py-5 flex flex-col">
                    {/* Intern Info */}
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200 mb-4 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <span className="text-2xl font-bold text-white">{data.internName?.charAt(0) || 'I'}</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-xl font-black text-amber-800">{data.internName || '[Intern Name]'}</p>
                            <p className="text-amber-600">{data.internshipRole} • {data.department}</p>
                        </div>
                        <div className="bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                            ⭐ EXCEPTIONAL
                        </div>
                    </div>

                    {/* LOR Body Text */}
                    <div className="text-slate-700 leading-relaxed space-y-4 text-justify flex-1">
                        <p className="text-base"><strong>To Whom It May Concern,</strong></p>

                        <p className="text-base">
                            It gives me great pleasure to recommend <strong className="text-amber-700">{data.internName || '[Intern Name]'}</strong> who
                            completed an internship at <strong>{data.companyName}</strong> as a <strong>{data.internshipRole}</strong> from{' '}
                            <strong>{data.startDate || '[Start Date]'}</strong> to <strong>{data.endDate || '[End Date]'}</strong>.
                        </p>

                        <p className="text-base">
                            During their tenure, {data.internName?.split(' ')[0] || 'they'} demonstrated exceptional skills in{' '}
                            <strong>{data.skills || 'their respective domain'}</strong>. Their performance was rated as{' '}
                            <strong className="text-emerald-700">{data.performanceRating || 'Excellent'}</strong>, placing them among our{' '}
                            <strong className="text-amber-700">Top 10% performers</strong>.
                        </p>

                        <p className="text-base">{data.internName?.split(' ')[0] || 'They'} exhibited strong analytical abilities, excellent communication skills, proactive learning approach, and effective teamwork.</p>

                        <p className="text-base">
                            I wholeheartedly recommend <strong className="text-amber-700">{data.internName || '[Intern Name]'}</strong> for any future endeavors.
                        </p>
                    </div>

                    {/* Signature - Horizontal Layout */}
                    <div className="mt-5 pt-4 border-t border-slate-200">
                        <div className="flex items-end justify-between">
                            <div className="text-center">
                                <p className="text-sm text-slate-500 mb-2">With Best Regards, For {data.companyName}</p>
                                <img src={signatureImage} alt="Signature" className="h-12 object-contain mx-auto" />
                                <div className="border-t border-slate-400 pt-2 mt-1 w-48">
                                    <p className="font-bold text-slate-800">{data.hrName}</p>
                                    <p className="text-sm text-slate-600">{data.hrDesignation}</p>
                                </div>
                            </div>
                            <CompanySeal companyName={data.companyName} size="md" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-amber-800 px-10 py-3 mt-auto">
                    <div className="flex justify-between items-center text-sm text-amber-100">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono font-bold text-amber-50">LOR No: {certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

LORTemplate.displayName = 'LORTemplate';
