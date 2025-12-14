import { forwardRef } from 'react';
import { InternshipLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface InternshipLetterTemplateProps {
    data: InternshipLetterData;
}

export const InternshipLetterTemplate = forwardRef<HTMLDivElement, InternshipLetterTemplateProps>(
    ({ data }, ref) => {
        // Get signatory image
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        return (
            <div
                ref={ref}
                className="bg-white shadow-2xl print:shadow-none"
                style={{ width: '210mm', minHeight: '297mm' }}
            >
                {/* Header */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-purple-100 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                                    <p className="text-xl font-black text-white">INTERNSHIP OFFER</p>
                                    <p className="text-purple-100 text-xs mt-1">{data.refNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Reference */}
                <div className="px-10 py-4 bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600"><strong>Ref:</strong> {data.refNumber}</span>
                        <span className="text-slate-600"><strong>Date:</strong> {data.date}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 py-8 space-y-6">
                    {/* Recipient */}
                    <div className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-2xl p-6 border border-purple-100">
                        <p className="text-xl font-bold text-purple-700 mb-1">Dear {data.internName || '[Intern Name]'},</p>
                        {data.internAddress && <p className="text-sm text-slate-600">{data.internAddress}</p>}
                        {data.collegeName && <p className="text-sm text-slate-500 mt-1">{data.collegeName} • {data.course}</p>}
                    </div>

                    {/* Subject Line */}
                    <div className="bg-purple-600 text-white px-6 py-3 rounded-xl">
                        <p className="font-bold">Subject: Offer of Internship at {data.companyName}</p>
                    </div>

                    {/* Introduction */}
                    <div className="text-slate-700 leading-relaxed space-y-4">
                        <p>
                            We are pleased to offer you an internship position at <strong>{data.companyName}</strong>.
                            This is an exciting opportunity to work with a dynamic team and gain hands-on experience
                            in a fast-paced digital agency environment.
                        </p>
                    </div>

                    {/* Internship Details */}
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
                        <h3 className="text-lg font-bold text-purple-800 mb-4">Internship Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {[
                                { label: 'Role', value: data.internshipRole },
                                { label: 'Department', value: data.department },
                                { label: 'Duration', value: data.duration },
                                { label: 'Working Hours', value: data.workingHours },
                                { label: 'Start Date', value: data.startDate || 'To be confirmed' },
                                { label: 'End Date', value: data.endDate || 'To be confirmed' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex justify-between py-2 px-3 bg-white rounded-lg">
                                    <span className="text-slate-500">{item.label}</span>
                                    <span className="font-semibold text-slate-800">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stipend */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-slate-500 uppercase tracking-wider">Monthly Stipend</p>
                                <p className="text-3xl font-black text-green-600">₹{data.stipend.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Mentor */}
                    {data.mentorName && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                            <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">Your Mentor</p>
                            <p className="text-xl font-bold text-blue-700">{data.mentorName}</p>
                            <p className="text-sm text-slate-600">{data.mentorDesignation}</p>
                        </div>
                    )}

                    {/* Terms */}
                    <div className="space-y-3 text-sm text-slate-600">
                        <p><strong>Please note:</strong></p>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>This internship is subject to your maintaining satisfactory conduct and performance.</li>
                            <li>You will be expected to follow all company policies and maintain confidentiality.</li>
                            <li>Upon successful completion, you may be considered for a full-time position based on performance.</li>
                            <li>A certificate of completion will be provided at the end of the internship.</li>
                        </ul>
                    </div>

                    <p className="text-slate-700">
                        We look forward to having you as part of our team and wish you a rewarding internship experience.
                    </p>

                    <p className="text-slate-700 font-medium">Welcome to {data.companyName}!</p>
                </div>

                {/* Signature Section */}
                <div className="px-10 py-8 border-t border-slate-200">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-sm text-slate-500 mb-2">For {data.companyName}</p>
                            <img
                                src={signatureImage}
                                alt="Signature"
                                className="h-10 object-contain mb-1"
                            />
                            <div className="border-t border-slate-400 pt-1 w-48">
                                <p className="font-bold text-slate-800">{data.hrName}</p>
                                <p className="text-sm text-slate-600">{data.hrDesignation}</p>
                            </div>
                        </div>

                        {/* Company Seal */}
                        <CompanySeal companyName={data.companyName} size="md" />

                        <div className="text-right">
                            <p className="text-sm text-slate-500 mb-12">Intern's Acceptance</p>
                            <div className="border-t border-slate-400 pt-1 w-48 text-center">
                                <p className="font-bold text-slate-800">{data.internName || '________________'}</p>
                                <p className="text-sm text-slate-600">Date: ________________</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-purple-900 px-10 py-4 mt-auto">
                    <div className="flex justify-between items-center text-xs text-purple-200">
                        <p>© {new Date().getFullYear()} {data.companyName}. All Rights Reserved.</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

InternshipLetterTemplate.displayName = 'InternshipLetterTemplate';
