import { forwardRef, useMemo } from 'react';
import { InternshipCompletionData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface LORTemplateProps {
    data: InternshipCompletionData;
}

// Generate unique certificate code based on name and random numbers
const generateCertificateCode = (name: string): string => {
    const nameCode = (name || 'INTERN')
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .substring(0, 3)
        .padEnd(3, 'X');
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random
    const suffix = Math.floor(10 + Math.random() * 90); // 2-digit random
    return `DH/LOR/${year}/${nameCode}${randomNum}-${suffix}`;
};

export const LORTemplate = forwardRef<HTMLDivElement, LORTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        // Generate stable certificate code based on intern name
        const certificateCode = useMemo(() =>
            generateCertificateCode(data.internName || ''),
            [data.internName]
        );

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none"
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm', overflow: 'hidden' }}
            >
                {/* Header - Gold/Premium Theme */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-amber-100 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/30">
                                    <p className="text-lg font-black text-white">LETTER OF</p>
                                    <p className="text-base font-bold text-amber-100">RECOMMENDATION</p>
                                    <p className="text-xs text-amber-200 mt-1">★ TOP PERFORMER ★</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Reference */}
                <div className="px-10 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600"><strong>Ref:</strong> {data.refNumber}</span>
                        <span className="text-slate-600"><strong>Date:</strong> {data.date}</span>
                    </div>
                </div>

                {/* Main Title */}
                <div className="px-10 py-5 text-center">
                    <div className="inline-block">
                        <h2 className="text-3xl font-black text-slate-800 tracking-wide">LETTER OF RECOMMENDATION</h2>
                        <div className="h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mt-2"></div>
                        <p className="text-amber-600 text-sm mt-2 font-semibold">Reserved for Top 10% Performers</p>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 space-y-4">
                    {/* Intern Card - Premium Gold */}
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300 text-center shadow-lg">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30 mx-auto mb-3">
                            <span className="text-4xl font-bold text-white">{data.internName?.charAt(0) || 'I'}</span>
                        </div>
                        <p className="text-2xl font-black text-amber-800">{data.internName || '[Intern Name]'}</p>
                        <p className="text-amber-600 font-medium">{data.internshipRole}</p>
                        <p className="text-sm text-slate-500">{data.department}</p>
                        <div className="mt-3 inline-block bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                            ⭐ EXCEPTIONAL PERFORMER ⭐
                        </div>
                    </div>

                    {/* LOR Text */}
                    <div className="text-slate-700 leading-relaxed space-y-4 text-justify">
                        <p>To Whom It May Concern,</p>

                        <p>
                            It gives me great pleasure to recommend <strong className="text-amber-700">{data.internName || '[Intern Name]'}</strong> who
                            completed an internship at <strong>{data.companyName}</strong> as a <strong>{data.internshipRole}</strong> from{' '}
                            <strong>{data.startDate || '[Start Date]'}</strong> to <strong>{data.endDate || '[End Date]'}</strong>.
                        </p>

                        <p>
                            During their tenure, {data.internName?.split(' ')[0] || 'they'} demonstrated exceptional skills in{' '}
                            <strong>{data.skills || 'their respective domain'}</strong>. Their performance was consistently rated as{' '}
                            <strong className="text-emerald-700">{data.performanceRating || 'Excellent'}</strong>, placing them among our{' '}
                            <strong className="text-amber-700">Top 10% performers</strong>.
                        </p>

                        <p>
                            {data.internName?.split(' ')[0] || 'They'} exhibited remarkable qualities including:
                        </p>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>Strong analytical and problem-solving abilities</li>
                            <li>Excellent communication and interpersonal skills</li>
                            <li>Proactive approach to learning and continuous improvement</li>
                            <li>Outstanding work ethic and professional demeanor</li>
                            <li>Ability to work effectively both independently and in teams</li>
                        </ul>

                        <p>
                            Based on their exceptional performance and professional conduct, I wholeheartedly recommend{' '}
                            <strong className="text-amber-700">{data.internName || '[Intern Name]'}</strong> for any future academic or
                            professional endeavors. I am confident they will continue to excel and make significant contributions
                            wherever they go.
                        </p>

                        <p>
                            Please feel free to contact me for any further information.
                        </p>
                    </div>
                </div>

                {/* Signature Section */}
                <div className="px-10 py-4 mt-2">
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-slate-500 mb-2">With Best Regards,</p>
                        <p className="text-sm text-slate-500 mb-2">For {data.companyName}</p>
                        <img src={signatureImage} alt="Signature" className="h-14 object-contain mb-2" />
                        <div className="border-t border-slate-400 pt-2 w-56 text-center">
                            <p className="font-bold text-slate-800">{data.hrName}</p>
                            <p className="text-sm text-slate-600">{data.hrDesignation}</p>
                        </div>
                        <div className="mt-2">
                            <CompanySeal companyName={data.companyName} size="md" />
                        </div>
                    </div>
                </div>

                {/* Footer with Certificate Code */}
                <div className="bg-amber-800 px-10 py-4 mt-auto">
                    <div className="flex justify-between items-center text-xs text-amber-100">
                        <p>© {new Date().getFullYear()} {data.companyName}. All Rights Reserved.</p>
                        <p className="font-mono font-bold text-amber-50">LOR Certificate No: {certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

LORTemplate.displayName = 'LORTemplate';
