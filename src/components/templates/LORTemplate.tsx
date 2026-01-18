import { forwardRef, useMemo } from 'react';
import { InternshipCompletionData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, DOC_TYPES } from '../../utils/refGenerator';

interface LORTemplateProps {
    data: InternshipCompletionData;
    showSeal?: boolean;
}

export const LORTemplate = forwardRef<HTMLDivElement, LORTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        const refNumber = useMemo(() =>
            generateRefNumber(data.internName || '', DOC_TYPES.LOR),
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
                <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 px-10 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight">{data.companyName}</h1>
                            <p className="text-amber-100 text-sm">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                            <p className="text-base font-black text-white tracking-wide">LETTER OF RECOMMENDATION</p>
                        </div>
                    </div>
                </div>

                {/* Reference & Date */}
                <div className="px-10 py-2 bg-amber-50 border-b border-amber-200 flex justify-between text-sm">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="px-10 py-5 flex-1 flex flex-col">
                    {/* Intern Profile Card */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 mb-5 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl font-black shadow-md">
                            {data.internName?.charAt(0) || 'I'}
                        </div>
                        <div className="flex-1">
                            <p className="font-black text-amber-900 text-xl">{data.internName || '[Intern Name]'}</p>
                            <p className="text-amber-700 text-sm">{data.internshipRole} • {data.department}</p>
                        </div>
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            ⭐ TOP PERFORMER
                        </div>
                    </div>

                    {/* Letter Body */}
                    <div className="text-slate-700 text-base leading-relaxed space-y-4">
                        <p className="font-bold text-lg">To Whom It May Concern,</p>

                        <p className="text-justify">
                            It is with great pleasure that I recommend <strong className="text-amber-700">{data.internName || '[Intern Name]'}</strong>,
                            who successfully completed an internship at <strong>{data.companyName}</strong> as a{' '}
                            <strong>{data.internshipRole}</strong> from <strong>{data.startDate || '[Start Date]'}</strong> to{' '}
                            <strong>{data.endDate || '[End Date]'}</strong>.
                        </p>

                        <p className="text-justify">
                            During their internship, {data.internName?.split(' ')[0] || 'they'} demonstrated exceptional proficiency in{' '}
                            <strong>{data.skills || 'their respective domain'}</strong>. Their overall performance was rated as{' '}
                            <strong className="text-emerald-600">{data.performanceRating || 'Excellent'}</strong>, placing them among
                            our <strong className="text-amber-700">Top 10% performers</strong>.
                        </p>

                        <p className="text-justify">
                            {data.internName?.split(' ')[0] || 'They'} consistently exhibited strong analytical abilities, excellent
                            communication skills, and a remarkable ability to collaborate effectively with team members. Their
                            dedication and professionalism made a significant positive impact on our organization.
                        </p>

                        <p className="text-justify">
                            I wholeheartedly recommend <strong className="text-amber-700">{data.internName || '[Intern Name]'}</strong> for
                            any future endeavors. I am confident they will be a valuable asset to any organization.
                        </p>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1"></div>

                    {/* Signature Section */}
                    <div className="pt-4 border-t border-slate-200 mt-4">
                        <p className="text-base text-slate-600 mb-3">Wishing them all the best,</p>
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
                <div className="bg-amber-800 px-10 py-3">
                    <div className="flex justify-between items-center text-amber-100">
                        <p className="text-sm">© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-xs">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

LORTemplate.displayName = 'LORTemplate';
