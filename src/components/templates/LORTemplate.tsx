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
                <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 px-10 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                            <p className="text-amber-100 text-base mt-1">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3">
                            <p className="text-xl font-black text-white tracking-wide">LETTER OF</p>
                            <p className="text-xl font-black text-white tracking-wide">RECOMMENDATION</p>
                        </div>
                    </div>
                </div>

                {/* Reference & Date */}
                <div className="px-10 py-3 bg-amber-50 border-b-2 border-amber-200 flex justify-between text-base">
                    <span className="text-slate-700"><strong className="text-amber-800">Ref:</strong> {refNumber}</span>
                    <span className="text-slate-700"><strong className="text-amber-800">Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="px-10 py-8 flex-1">
                    {/* Intern Profile Card */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 mb-8 flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                            {data.internName?.charAt(0) || 'I'}
                        </div>
                        <div className="flex-1">
                            <p className="font-black text-amber-900 text-2xl">{data.internName || '[Intern Name]'}</p>
                            <p className="text-amber-700 text-lg mt-1">{data.internshipRole} • {data.department}</p>
                        </div>
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 rounded-full text-base font-bold shadow-md">
                            ⭐ TOP PERFORMER
                        </div>
                    </div>

                    {/* Letter Body */}
                    <div className="text-slate-800 text-lg leading-[2] space-y-6">
                        <p className="font-bold text-xl text-slate-700">To Whom It May Concern,</p>

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
                            dedication, professionalism, and eagerness to learn made a significant positive impact on our organization.
                        </p>

                        <p className="text-justify">
                            I wholeheartedly recommend <strong className="text-amber-700">{data.internName || '[Intern Name]'}</strong> for
                            any future endeavors. I am confident that they will continue to excel and be a valuable asset to any
                            organization fortunate enough to have them.
                        </p>
                    </div>
                </div>

                {/* Signature Section */}
                <div className="px-10 py-6 border-t-2 border-slate-200 bg-slate-50">
                    <p className="text-lg text-slate-600 mb-4">Wishing them all the best,</p>
                    <div className="flex items-end justify-between">
                        <div>
                            <img src={signatureImage} alt="Signature" className="h-16 object-contain" />
                            <div className="border-t-2 border-slate-400 pt-2 mt-2 w-56">
                                <p className="font-bold text-slate-800 text-lg">{data.hrName}</p>
                                <p className="text-slate-600">{data.hrDesignation}</p>
                                <p className="text-slate-500 text-sm">{data.companyName}</p>
                            </div>
                        </div>
                        <CompanySeal companyName={data.companyName} size="lg" />
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-amber-800 px-10 py-4">
                    <div className="flex justify-between items-center text-amber-100">
                        <p className="text-base">© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-sm">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

LORTemplate.displayName = 'LORTemplate';
