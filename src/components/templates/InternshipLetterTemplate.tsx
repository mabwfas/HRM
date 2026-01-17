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
            <div ref={ref}>
                {/* PAGE 1 - Internship Offer Letter */}
                <div
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
                                <li>You will follow all company policies as outlined in <strong>Annexure A</strong>.</li>
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

                {/* PAGE BREAK */}
                <div className="page-break-before" style={{ pageBreakBefore: 'always' }}></div>

                {/* PAGE 2 - Annexure A: Company Policies */}
                <div
                    className="bg-white shadow-2xl print:shadow-none text-[10px] flex flex-col overflow-hidden"
                    style={{ width: '210mm', minHeight: '297mm', pageBreakBefore: 'always' }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-800 px-8 py-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-xl font-black text-white">{data.companyName}</h1>
                                <p className="text-purple-200 text-xs">{data.companyTagline}</p>
                            </div>
                            <div className="text-right bg-white/20 rounded-lg px-4 py-2">
                                <p className="text-sm font-bold text-white">ANNEXURE A</p>
                                <p className="text-purple-200 text-[10px]">Company Policies</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-4 flex-1">
                        <h2 className="text-lg font-bold text-purple-800 mb-3 text-center border-b-2 border-purple-200 pb-2">
                            📋 Company Policies & Guidelines for Interns
                        </h2>

                        {/* Working Hours & Attendance */}
                        <div className="mb-4">
                            <h3 className="font-bold text-purple-700 text-xs mb-1 flex items-center gap-1">
                                <span className="bg-purple-100 rounded-full w-5 h-5 flex items-center justify-center text-[10px]">1</span>
                                Working Hours & Attendance
                            </h3>
                            <ul className="list-disc ml-6 text-slate-700 space-y-0.5">
                                <li>Working hours are Monday to Friday, 10:00 AM to 7:00 PM (with 1-hour lunch break).</li>
                                <li>Interns must mark their attendance daily through the company's attendance system.</li>
                                <li>Prior approval is required for any leave. Unapproved absences may affect stipend.</li>
                                <li>Punctuality is mandatory. Repeated late arrivals will be noted in performance review.</li>
                            </ul>
                        </div>

                        {/* Code of Conduct */}
                        <div className="mb-4">
                            <h3 className="font-bold text-purple-700 text-xs mb-1 flex items-center gap-1">
                                <span className="bg-purple-100 rounded-full w-5 h-5 flex items-center justify-center text-[10px]">2</span>
                                Code of Conduct
                            </h3>
                            <ul className="list-disc ml-6 text-slate-700 space-y-0.5">
                                <li>Maintain professional behavior with colleagues, clients, and vendors at all times.</li>
                                <li>Dress code is business casual. Avoid overly casual attire during client meetings.</li>
                                <li>Respectful communication is expected in all interactions (verbal, written, digital).</li>
                                <li>Any form of harassment, discrimination, or bullying is strictly prohibited.</li>
                            </ul>
                        </div>

                        {/* Confidentiality */}
                        <div className="mb-4">
                            <h3 className="font-bold text-purple-700 text-xs mb-1 flex items-center gap-1">
                                <span className="bg-purple-100 rounded-full w-5 h-5 flex items-center justify-center text-[10px]">3</span>
                                Confidentiality & Data Protection
                            </h3>
                            <ul className="list-disc ml-6 text-slate-700 space-y-0.5">
                                <li>All client information, project details, and company data are strictly confidential.</li>
                                <li>Do not share any work-related information on social media or with external parties.</li>
                                <li>Use company-provided tools and accounts for official work only.</li>
                                <li>All intellectual property created during internship belongs to the company.</li>
                            </ul>
                        </div>

                        {/* Use of Company Resources */}
                        <div className="mb-4">
                            <h3 className="font-bold text-purple-700 text-xs mb-1 flex items-center gap-1">
                                <span className="bg-purple-100 rounded-full w-5 h-5 flex items-center justify-center text-[10px]">4</span>
                                Use of Company Resources
                            </h3>
                            <ul className="list-disc ml-6 text-slate-700 space-y-0.5">
                                <li>Company equipment (laptops, software, accounts) must be used for work purposes only.</li>
                                <li>Personal use of company resources should be minimal and not interfere with work.</li>
                                <li>Report any loss, damage, or malfunction of equipment immediately to IT/Admin.</li>
                                <li>All company property must be returned upon completion or termination of internship.</li>
                            </ul>
                        </div>

                        {/* Communication */}
                        <div className="mb-4">
                            <h3 className="font-bold text-purple-700 text-xs mb-1 flex items-center gap-1">
                                <span className="bg-purple-100 rounded-full w-5 h-5 flex items-center justify-center text-[10px]">5</span>
                                Communication & Reporting
                            </h3>
                            <ul className="list-disc ml-6 text-slate-700 space-y-0.5">
                                <li>Submit daily End-of-Day (EOD) reports to your mentor summarizing work done.</li>
                                <li>Respond to work-related messages/emails within 2 hours during working hours.</li>
                                <li>Inform your mentor in advance if you are unable to complete assigned tasks.</li>
                                <li>Participate actively in team meetings and training sessions.</li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div className="mb-4">
                            <h3 className="font-bold text-purple-700 text-xs mb-1 flex items-center gap-1">
                                <span className="bg-purple-100 rounded-full w-5 h-5 flex items-center justify-center text-[10px]">6</span>
                                Social Media & Online Presence
                            </h3>
                            <ul className="list-disc ml-6 text-slate-700 space-y-0.5">
                                <li>Do not post client work or internal projects on personal social media without approval.</li>
                                <li>Maintain a professional online presence that reflects well on the company.</li>
                                <li>Any public statements about the company require prior approval from management.</li>
                            </ul>
                        </div>

                        {/* Termination */}
                        <div className="mb-4">
                            <h3 className="font-bold text-purple-700 text-xs mb-1 flex items-center gap-1">
                                <span className="bg-purple-100 rounded-full w-5 h-5 flex items-center justify-center text-[10px]">7</span>
                                Termination Policy
                            </h3>
                            <ul className="list-disc ml-6 text-slate-700 space-y-0.5">
                                <li>Either party may terminate the internship with a 7-day written notice.</li>
                                <li>Immediate termination may occur for gross misconduct, policy violations, or poor performance.</li>
                                <li>Stipend will be calculated on a pro-rata basis for the days worked.</li>
                                <li>No certificate will be issued if internship is terminated for misconduct.</li>
                            </ul>
                        </div>

                        {/* Acknowledgement Box */}
                        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4 border-2 border-purple-200 mt-4">
                            <p className="font-bold text-purple-800 text-xs mb-2">Intern's Acknowledgement:</p>
                            <p className="text-slate-700 text-[10px] mb-3">
                                I, <strong>{data.internName || '________________'}</strong>, hereby confirm that I have read, understood, and agree to abide by all the policies and guidelines mentioned in this Annexure A. I understand that violation of these policies may result in disciplinary action, including termination of my internship.
                            </p>
                            <div className="flex justify-between items-end mt-4">
                                <div>
                                    <div className="border-t border-slate-400 pt-1 w-48">
                                        <p className="text-[10px] text-slate-600">Intern's Signature</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="border-t border-slate-400 pt-1 w-32 text-center">
                                        <p className="text-[10px] text-slate-600">Date</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-purple-900 px-8 py-2 mt-auto">
                        <div className="flex justify-between text-xs text-purple-200">
                            <p>© {new Date().getFullYear()} {data.companyName} | Annexure A - Page 2</p>
                            <p>{data.companyTagline}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

InternshipLetterTemplate.displayName = 'InternshipLetterTemplate';

