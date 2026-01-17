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
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const suffix = Math.floor(10 + Math.random() * 90);
    return `DMH/LOR/${year}/${nameCode}${randomNum}-${suffix}`;
};

export const LORTemplate = forwardRef<HTMLDivElement, LORTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        const certificateCode = useMemo(() =>
            generateCertificateCode(data.internName || ''),
            [data.internName]
        );

        const uniqueRefNumber = useMemo(() => {
            // Get employee initials (first letter of each word in name)
            const initials = (data.internName || 'XX')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase())
                .join('')
                .substring(0, 3);
            const year = new Date().getFullYear();
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            return `DMH/LOR/${year}/${initials}-${randomNum}`;
        }, [data.internName, data.date]);

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none text-[11px] flex flex-col"
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm', overflow: 'hidden' }}
            >
                {/* Compact Header */}
                <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-amber-100 text-xs italic">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                            <p className="text-sm font-black text-white">LETTER OF RECOMMENDATION</p>
                            <p className="text-xs text-amber-200">★ TOP 10% PERFORMER ★</p>
                        </div>
                    </div>
                </div>

                {/* Reference & Date Bar */}
                <div className="px-8 py-2 bg-amber-50 border-b border-amber-200 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {uniqueRefNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content Area - flex-1 to take remaining space */}
                <div className="flex-1 px-8 py-4 flex flex-col">
                    {/* Intern Info - Compact Inline */}
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200 mb-4 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-bold text-white">{data.internName?.charAt(0) || 'I'}</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-lg font-black text-amber-800">{data.internName || '[Intern Name]'}</p>
                            <p className="text-amber-600 text-sm">{data.internshipRole} • {data.department}</p>
                        </div>
                        <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            ⭐ EXCEPTIONAL
                        </div>
                    </div>

                    {/* LOR Body Text - Compact */}
                    <div className="text-slate-700 leading-relaxed space-y-3 text-justify flex-1">
                        <p><strong>To Whom It May Concern,</strong></p>

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

                        <p>{data.internName?.split(' ')[0] || 'They'} exhibited remarkable qualities including strong analytical abilities, excellent communication skills, proactive learning approach, outstanding work ethic, and effective teamwork.</p>

                        <p>
                            Based on their exceptional performance and professional conduct, I wholeheartedly recommend{' '}
                            <strong className="text-amber-700">{data.internName || '[Intern Name]'}</strong> for any future academic or
                            professional endeavors. I am confident they will excel wherever they go.
                        </p>

                        <p>Please feel free to contact me for any further information.</p>
                    </div>

                    {/* Signature - Horizontal Layout */}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex items-end justify-between">
                            <div className="text-center">
                                <p className="text-xs text-slate-500 mb-1">With Best Regards, For {data.companyName}</p>
                                <img src={signatureImage} alt="Signature" className="h-10 object-contain mx-auto" />
                                <div className="border-t border-slate-400 pt-1 mt-1 w-48">
                                    <p className="font-bold text-slate-800 text-sm">{data.hrName}</p>
                                    <p className="text-xs text-slate-600">{data.hrDesignation}</p>
                                </div>
                            </div>
                            <CompanySeal companyName={data.companyName} size="sm" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-amber-800 px-8 py-2 mt-auto">
                    <div className="flex justify-between items-center text-xs text-amber-100">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono font-bold text-amber-50">LOR No: {certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

LORTemplate.displayName = 'LORTemplate';
