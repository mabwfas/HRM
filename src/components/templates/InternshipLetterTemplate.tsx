import { forwardRef } from 'react';
import { InternshipLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface InternshipLetterTemplateProps {
    data: InternshipLetterData;
    showSeal?: boolean;
}

export const InternshipLetterTemplate = forwardRef<HTMLDivElement, InternshipLetterTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        return (
            <div
                ref={ref}
                className="bg-white shadow-2xl print:shadow-none text-[11px] flex flex-col overflow-hidden"
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-800 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-purple-200 text-xs">{data.companyTagline}</p>
                        </div>
                        <div className="text-right bg-white/20 rounded-lg px-4 py-2">
                            <p className="text-lg font-bold text-white">INTERNSHIP OFFER</p>
                            <p className="text-purple-200 text-xs">{data.refNumber}</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-8 py-2 bg-purple-50 border-b border-purple-100 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {data.refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                <div className="px-8 py-4">
                    {/* Recipient */}
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-3 mb-3 border border-purple-100">
                        <p className="font-bold text-purple-800">Dear {data.internName || '[Intern Name]'},</p>
                        {data.internAddress && <p className="text-slate-600 text-xs">{data.internAddress}</p>}
                        {data.collegeName && <p className="text-slate-500 text-xs">{data.collegeName} • {data.course}</p>}
                    </div>

                    <p className="font-semibold text-purple-700 mb-3">Subject: Offer of Internship at {data.companyName}</p>

                    <p className="text-slate-700 mb-3">
                        We are pleased to offer you an internship position at <strong>{data.companyName}</strong>.
                        This is an exciting opportunity to work with a dynamic team and gain hands-on experience in a fast-paced digital agency environment.
                    </p>

                    {/* Internship Details */}
                    <div className="grid grid-cols-3 gap-3 mb-3">
                        {[
                            ['Role', data.internshipRole],
                            ['Department', data.department],
                            ['Duration', data.duration],
                            ['Working Hours', data.workingHours],
                            ['Start Date', data.startDate || 'TBC'],
                            ['End Date', data.endDate || 'TBC'],
                        ].map(([label, value], i) => (
                            <div key={i} className="bg-purple-50 rounded-lg p-2 border border-purple-100">
                                <p className="text-[10px] text-purple-600 uppercase">{label}</p>
                                <p className="font-semibold text-slate-800 text-xs">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Stipend */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-4 text-white text-center mb-3">
                        <p className="text-xs uppercase opacity-80">Monthly Stipend</p>
                        <p className="text-2xl font-black">₹{data.stipend.toLocaleString('en-IN')}</p>
                    </div>

                    {/* Mentor */}
                    {data.mentorName && (
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 mb-3">
                            <p className="text-[10px] text-blue-600 uppercase">Your Mentor</p>
                            <p className="font-bold text-blue-800">{data.mentorName}</p>
                            <p className="text-xs text-slate-600">{data.mentorDesignation}</p>
                        </div>
                    )}

                    {/* Terms */}
                    <div className="text-xs text-slate-600 mb-3">
                        <p className="font-semibold mb-1">Please note:</p>
                        <ul className="list-disc ml-4 space-y-0.5">
                            <li>This internship is subject to maintaining satisfactory conduct and performance.</li>
                            <li>You will follow all company policies and maintain confidentiality.</li>
                            <li>Upon successful completion, you may be considered for a full-time position.</li>
                            <li>A certificate of completion will be provided at the end.</li>
                        </ul>
                    </div>

                    <p className="text-slate-700 mb-1">We look forward to having you as part of our team!</p>
                    <p className="text-slate-700 font-semibold">Welcome to {data.companyName}!</p>
                </div>

                {/* Signature Section */}
                <div className="mt-auto px-8 pt-4">
                    <div className="flex justify-between items-end border-t border-slate-200 pt-4">
                        <div className="text-left">
                            <p className="text-xs text-slate-500 mb-1">For {data.companyName}</p>
                            <img src={signatureImage} alt="Signature" className="h-10 object-contain mb-1" />
                            <div className="border-t border-slate-400 pt-1 w-40">
                                <p className="font-bold text-slate-800 text-xs">{data.hrName}</p>
                                <p className="text-[10px] text-slate-600">{data.hrDesignation}</p>
                            </div>
                        </div>
                        {showSeal && <CompanySeal companyName={data.companyName} size="md" />}
                        <div className="text-right">
                            <p className="text-xs text-slate-500 mb-8">Intern's Acceptance</p>
                            <div className="border-t border-slate-400 pt-1 w-40 text-center">
                                <p className="font-bold text-slate-800 text-xs">{data.internName || '________________'}</p>
                                <p className="text-[10px] text-slate-600">Date: ________________</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-purple-900 px-8 py-2">
                    <div className="flex justify-between text-xs text-purple-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

InternshipLetterTemplate.displayName = 'InternshipLetterTemplate';
