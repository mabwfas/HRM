import { forwardRef, useMemo } from 'react';
import { InternshipCompletionData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface InternshipCompletionTemplateProps {
    data: InternshipCompletionData;
}

// Generate unique certificate code based on employee initials and random numbers
const generateCertificateCode = (name: string, type: 'IC' | 'LOR' = 'IC'): string => {
    // Get employee initials (first letter of each word in name)
    const initials = (name || 'XX')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 3)
        .padEnd(2, 'X');
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `DMH/${type}/${year}/${initials}-${randomNum}`;
};

export const InternshipCompletionTemplate = forwardRef<HTMLDivElement, InternshipCompletionTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        // Generate stable certificate code based on intern name
        const certificateCode = useMemo(() =>
            generateCertificateCode(data.internName || '', 'IC'),
            [data.internName]
        );

        // Generate unique reference number
        const refNumber = useMemo(() =>
            generateCertificateCode(data.internName || '', 'IC'),
            [data.internName]
        );

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none"
                style={{ width: '210mm', minHeight: '297mm' }}
            >
                {/* Header */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-violet-100 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                                    <p className="text-lg font-black text-white">INTERNSHIP</p>
                                    <p className="text-base font-bold text-violet-100">CERTIFICATE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Reference */}
                <div className="px-10 py-4 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600"><strong>Ref:</strong> {refNumber}</span>
                        <span className="text-slate-600"><strong>Date:</strong> {data.date}</span>
                    </div>
                </div>

                {/* Main Title */}
                <div className="px-10 py-8 text-center">
                    <div className="inline-block">
                        <h2 className="text-3xl font-black text-slate-800 tracking-wide">CERTIFICATE OF COMPLETION</h2>
                        <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mt-2"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 space-y-6">
                    {/* Intern Card */}
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-200 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30 mx-auto mb-4">
                            <span className="text-4xl font-bold text-white">{data.internName?.charAt(0) || 'I'}</span>
                        </div>
                        <p className="text-2xl font-black text-violet-800">{data.internName || '[Intern Name]'}</p>
                        <p className="text-violet-600 font-medium">{data.internshipRole}</p>
                        <p className="text-sm text-slate-500">{data.department}</p>
                    </div>

                    {/* Certificate Text */}
                    <div className="text-slate-700 leading-loose space-y-4 text-justify text-center">
                        <p className="text-lg">
                            This is to certify that <strong className="text-violet-700">{data.internName || '[Intern Name]'}</strong> has
                            successfully completed an internship at <strong>{data.companyName}</strong> as a <strong>{data.internshipRole}</strong>.
                        </p>
                    </div>

                    {/* Duration Card */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                            <p className="text-xs text-green-600 uppercase">Start Date</p>
                            <p className="font-bold text-green-800">{data.startDate || '—'}</p>
                        </div>
                        <div className="bg-violet-50 rounded-xl p-4 text-center border border-violet-200">
                            <p className="text-xs text-violet-600 uppercase">Duration</p>
                            <p className="font-bold text-violet-800">{data.duration}</p>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
                            <p className="text-xs text-amber-600 uppercase">End Date</p>
                            <p className="font-bold text-amber-800">{data.endDate || '—'}</p>
                        </div>
                    </div>

                    {/* Performance & Skills */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                        <p className="text-center">
                            Performance Rating: <strong className="text-emerald-700 text-lg">{data.performanceRating}</strong>
                        </p>
                        <p className="text-center text-sm text-slate-600 mt-2">
                            Skills Demonstrated: <span className="font-medium">{data.skills}</span>
                        </p>
                    </div>

                    <p className="text-slate-700 text-center">
                        We wish them all the best in their future endeavors and professional career.
                    </p>
                </div>

                {/* Signature Section */}
                <div className="px-10 py-10 mt-8">
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-slate-500 mb-2">For {data.companyName}</p>
                        <img src={signatureImage} alt="Signature" className="h-14 object-contain mb-2" />
                        <div className="border-t border-slate-400 pt-2 w-56 text-center">
                            <p className="font-bold text-slate-800">{data.hrName}</p>
                            <p className="text-sm text-slate-600">{data.hrDesignation}</p>
                        </div>
                        <div className="mt-4">
                            <CompanySeal companyName={data.companyName} size="md" />
                        </div>
                    </div>
                </div>

                {/* Footer with Certificate Code */}
                <div className="bg-violet-900 px-10 py-4 mt-auto">
                    <div className="flex justify-between items-center text-xs text-violet-200">
                        <p>© {new Date().getFullYear()} {data.companyName}. All Rights Reserved.</p>
                        <p className="font-mono font-bold text-violet-100">Certificate No: {certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

InternshipCompletionTemplate.displayName = 'InternshipCompletionTemplate';

