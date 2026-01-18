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
                style={{ width: '210mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 px-5 py-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-lg font-black text-white">{data.companyName}</h1>
                            <p className="text-amber-100 text-[10px] italic">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded px-2 py-1 text-center">
                            <p className="text-[10px] font-black text-white">LETTER OF RECOMMENDATION</p>
                        </div>
                    </div>
                </div>

                {/* Reference & Date Bar */}
                <div className="px-5 py-0.5 bg-amber-50 border-b border-amber-200 flex justify-between text-[10px]">
                    <span><strong>Ref:</strong> {uniqueRefNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content Area */}
                <div className="px-5 py-2 flex flex-col">
                    {/* Intern Info */}
                    <div className="bg-amber-50 rounded p-1.5 border border-amber-200 mb-2 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                            {data.internName?.charAt(0) || 'I'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-amber-800 text-sm">{data.internName || '[Intern Name]'}</p>
                            <p className="text-amber-600 text-[10px]">{data.internshipRole} • {data.department}</p>
                        </div>
                        <div className="bg-amber-600 text-white px-1.5 py-0.5 rounded-full text-[9px] font-bold">⭐ TOP PERFORMER</div>
                    </div>

                    {/* LOR Body Text */}
                    <div className="text-slate-700 leading-relaxed space-y-1.5 text-justify text-[10px]">
                        <p><strong>To Whom It May Concern,</strong></p>

                        <p>
                            It gives me great pleasure to recommend <strong className="text-amber-700">{data.internName || '[Intern Name]'}</strong> who
                            completed an internship at <strong>{data.companyName}</strong> as a <strong>{data.internshipRole}</strong> from{' '}
                            <strong>{data.startDate || '[Start Date]'}</strong> to <strong>{data.endDate || '[End Date]'}</strong>.
                        </p>

                        <p>
                            During their tenure, {data.internName?.split(' ')[0] || 'they'} demonstrated exceptional skills in{' '}
                            <strong>{data.skills || 'their respective domain'}</strong>. Their performance was rated as{' '}
                            <strong className="text-emerald-700">{data.performanceRating || 'Excellent'}</strong>, placing them among our{' '}
                            <strong className="text-amber-700">Top 10% performers</strong>.
                        </p>

                        <p>{data.internName?.split(' ')[0] || 'They'} exhibited strong analytical abilities, excellent communication skills, and effective teamwork.</p>

                        <p>I wholeheartedly recommend <strong className="text-amber-700">{data.internName || '[Intern Name]'}</strong> for any future endeavors.</p>
                    </div>

                    {/* Signature */}
                    <div className="mt-2 pt-1.5 border-t border-slate-200 flex items-end justify-between">
                        <div className="text-center">
                            <p className="text-[9px] text-slate-500 mb-0.5">Best Regards</p>
                            <img src={signatureImage} alt="Signature" className="h-6 object-contain mx-auto" />
                            <div className="border-t border-slate-400 pt-0.5 w-24">
                                <p className="font-bold text-slate-800 text-[10px]">{data.hrName}</p>
                                <p className="text-[9px] text-slate-600">{data.hrDesignation}</p>
                            </div>
                        </div>
                        <CompanySeal companyName={data.companyName} size="sm" />
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-amber-800 px-5 py-1 mt-auto">
                    <div className="flex justify-between text-[10px] text-amber-100">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-amber-50">{certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

LORTemplate.displayName = 'LORTemplate';
