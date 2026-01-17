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
            <div ref={ref} className="bg-white">
                {/* ===== PAGE 1: MAIN OFFER LETTER ===== */}
                <div
                    className="bg-white shadow-2xl print:shadow-none text-[11px] flex flex-col"
                    style={{ width: '210mm' }}
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
                        <div className="bg-green-50 rounded-lg p-2 border border-green-200 mb-3 inline-block">
                            <span className="text-xs text-green-600">Monthly Stipend: </span>
                            <span className="font-bold text-green-800">₹{data.stipend.toLocaleString('en-IN')}</span>
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
                                <li><strong>Please read and acknowledge Annexure A (attached) carefully.</strong></li>
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
                            <p>Page 1 of 3</p>
                        </div>
                    </div>
                </div>

                {/* ===== PAGE 2: ANNEXURE A - PART 1 ===== */}
                <div
                    className="bg-white shadow-2xl print:shadow-none text-[10px] flex flex-col"
                    style={{ width: '210mm' }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-800 px-8 py-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-xl font-black text-white">ANNEXURE A</h1>
                                <p className="text-purple-200 text-xs">Internship Terms, Policies & Code of Conduct</p>
                            </div>
                            <div className="text-right bg-white/20 rounded-lg px-3 py-1">
                                <p className="text-sm font-bold text-white">{data.companyName}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-4 flex-1">
                        {/* Section 1: General Terms */}
                        <div className="mb-4">
                            <h2 className="text-sm font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">1. GENERAL TERMS & CONDITIONS</h2>
                            <ul className="list-disc ml-4 space-y-1 text-slate-700">
                                <li>This internship is a <strong>training program</strong> and does not constitute employment.</li>
                                <li>The internship period is fixed as mentioned in the offer letter and may be extended or shortened at the company's discretion.</li>
                                <li>The stipend is a <strong>training allowance</strong>, not a salary, and is subject to attendance and performance.</li>
                                <li>No benefits such as PF, ESI, gratuity, or leave encashment are applicable to interns.</li>
                                <li>The company reserves the right to modify internship terms with reasonable notice.</li>
                            </ul>
                        </div>

                        {/* Section 2: Attendance & Punctuality */}
                        <div className="mb-4">
                            <h2 className="text-sm font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">2. ATTENDANCE & PUNCTUALITY</h2>
                            <ul className="list-disc ml-4 space-y-1 text-slate-700">
                                <li><strong>Working days:</strong> Monday to Saturday (unless otherwise specified).</li>
                                <li><strong>Minimum attendance:</strong> 90% attendance is mandatory for certificate issuance.</li>
                                <li><strong>Late arrivals:</strong> 3 late arrivals (beyond 15 minutes) = 1 absence.</li>
                                <li><strong>Leave requests:</strong> Must be submitted at least 24 hours in advance via official channels.</li>
                                <li><strong>Unapproved absence:</strong> More than 3 consecutive days without approval = automatic termination.</li>
                                <li><strong>Daily reporting:</strong> Check-in/out times must be logged accurately.</li>
                            </ul>
                        </div>

                        {/* Section 3: Code of Conduct */}
                        <div className="mb-4">
                            <h2 className="text-sm font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">3. CODE OF CONDUCT</h2>
                            <ul className="list-disc ml-4 space-y-1 text-slate-700">
                                <li>Maintain <strong>professional behavior</strong> at all times with colleagues, mentors, and clients.</li>
                                <li>Follow the company <strong>dress code</strong> (business casual or as specified).</li>
                                <li>Use of <strong>mobile phones</strong> is restricted during working hours except for work purposes.</li>
                                <li><strong>Social media:</strong> Do not post any work-related content without prior approval.</li>
                                <li><strong>Harassment:</strong> Zero tolerance for any form of harassment (verbal, physical, sexual, cyber).</li>
                                <li><strong>Substance abuse:</strong> Consumption of alcohol or drugs on premises is strictly prohibited.</li>
                                <li>Maintain <strong>cleanliness</strong> of your workspace and common areas.</li>
                            </ul>
                        </div>

                        {/* Section 4: Confidentiality */}
                        <div className="mb-4">
                            <h2 className="text-sm font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">4. CONFIDENTIALITY & INTELLECTUAL PROPERTY</h2>
                            <ul className="list-disc ml-4 space-y-1 text-slate-700">
                                <li>All client information, project details, and business strategies are <strong>strictly confidential</strong>.</li>
                                <li>Do not share, copy, or transfer any company data to personal devices or external parties.</li>
                                <li>All work created during internship is <strong>company property</strong> (code, designs, documents, etc.).</li>
                                <li>Confidentiality obligations continue <strong>even after internship ends</strong>.</li>
                                <li>Breach of confidentiality may result in <strong>legal action</strong> and immediate termination.</li>
                            </ul>
                        </div>

                        {/* Section 5: Work & Performance */}
                        <div className="mb-4">
                            <h2 className="text-sm font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">5. WORK EXPECTATIONS & PERFORMANCE</h2>
                            <ul className="list-disc ml-4 space-y-1 text-slate-700">
                                <li>Complete assigned tasks within <strong>given deadlines</strong>.</li>
                                <li>Communicate proactively if facing any blockers or delays.</li>
                                <li>Participate actively in <strong>team meetings and training sessions</strong>.</li>
                                <li>Submit <strong>daily/weekly progress reports</strong> as required.</li>
                                <li>Seek feedback and show <strong>continuous improvement</strong>.</li>
                                <li>Quality of work will be evaluated for final assessment and certificate.</li>
                            </ul>
                        </div>

                        {/* Section 6: IT & Security */}
                        <div className="mb-3">
                            <h2 className="text-sm font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">6. IT USAGE & SECURITY POLICY</h2>
                            <ul className="list-disc ml-4 space-y-1 text-slate-700">
                                <li>Use company systems <strong>only for work purposes</strong>.</li>
                                <li>Do not install unauthorized software or browser extensions.</li>
                                <li>Do not access inappropriate websites or download copyrighted content.</li>
                                <li>Protect login credentials - do not share with anyone.</li>
                                <li>Report any security incidents immediately to IT/HR.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-purple-900 px-8 py-2 mt-auto">
                        <div className="flex justify-between text-xs text-purple-200">
                            <p>© {new Date().getFullYear()} {data.companyName} - Annexure A</p>
                            <p>Page 2 of 3</p>
                        </div>
                    </div>
                </div>

                {/* ===== PAGE 3: ANNEXURE A - PART 2 (Termination & Suspension) ===== */}
                <div
                    className="bg-white shadow-2xl print:shadow-none text-[10px] flex flex-col"
                    style={{ width: '210mm' }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-800 px-8 py-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-xl font-black text-white">ANNEXURE A (Continued)</h1>
                                <p className="text-purple-200 text-xs">Suspension, Termination & Acknowledgment</p>
                            </div>
                            <div className="text-right bg-white/20 rounded-lg px-3 py-1">
                                <p className="text-sm font-bold text-white">{data.companyName}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-4 flex-1">
                        {/* Section 7: Grounds for Suspension */}
                        <div className="mb-4">
                            <h2 className="text-sm font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">7. GROUNDS FOR SUSPENSION (Temporary)</h2>
                            <p className="text-slate-600 mb-2">The company may suspend an intern temporarily pending investigation for:</p>
                            <ul className="list-disc ml-4 space-y-1 text-slate-700">
                                <li>Alleged misconduct or policy violation under investigation.</li>
                                <li>Suspected breach of confidentiality or data theft.</li>
                                <li>Involvement in workplace conflict requiring resolution.</li>
                                <li>Pending background verification issues.</li>
                            </ul>
                            <p className="text-slate-600 mt-2 italic">During suspension, stipend may be withheld. Upon clearance, intern may resume or be terminated.</p>
                        </div>

                        {/* Section 8: Grounds for Immediate Termination */}
                        <div className="mb-3 bg-amber-50 rounded-lg p-2 border-2 border-amber-200">
                            <h2 className="text-[10px] font-bold text-amber-800 border-b border-amber-300 pb-1 mb-1">⚠️ 8. GROUNDS FOR IMMEDIATE TERMINATION</h2>
                            <p className="text-amber-700 mb-1 font-semibold text-[9px]">The internship will be terminated immediately without notice if the intern:</p>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[9px] text-slate-800">
                                <div>• <strong>Theft/fraud:</strong> Stealing property, data, financial fraud</div>
                                <div>• <strong>Data breach:</strong> Sharing confidential info</div>
                                <div>• <strong>Harassment:</strong> Any form against colleagues/clients</div>
                                <div>• <strong>Violence:</strong> Physical altercation or threats</div>
                                <div>• <strong>Substance abuse:</strong> Alcohol/drugs at work</div>
                                <div>• <strong>Falsification:</strong> False documents or info</div>
                                <div>• <strong>Insubordination:</strong> Refusing work instructions</div>
                                <div>• <strong>Property damage:</strong> Intentional damage</div>
                                <div>• <strong>AWOL:</strong> 3+ days absent without approval</div>
                                <div>• <strong>Gross negligence:</strong> Harming reputation</div>
                                <div>• <strong>Criminal activity:</strong> Illegal activities</div>
                                <div>• <strong>Social media misconduct:</strong> Defamatory posts</div>
                            </div>
                        </div>

                        {/* Section 9: Termination by Company */}
                        <div className="mb-4">
                            <h2 className="text-sm font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">9. TERMINATION BY COMPANY (With Notice)</h2>
                            <p className="text-slate-600 mb-2">The company may terminate the internship with 7 days notice for:</p>
                            <ul className="list-disc ml-4 space-y-1 text-slate-700">
                                <li>Consistent poor performance despite feedback and support.</li>
                                <li>Repeated policy violations (3 written warnings).</li>
                                <li>Attendance below 70% without valid reasons.</li>
                                <li>Business restructuring or project discontinuation.</li>
                                <li>Mutual agreement that the internship is not the right fit.</li>
                            </ul>
                        </div>

                        {/* Section 10: Resignation by Intern */}
                        <div className="mb-4">
                            <h2 className="text-sm font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">10. RESIGNATION BY INTERN</h2>
                            <ul className="list-disc ml-4 space-y-1 text-slate-700">
                                <li>Intern may resign by providing <strong>minimum 7 days written notice</strong>.</li>
                                <li>All company property (laptop, ID card, access cards) must be returned.</li>
                                <li>Pending tasks must be handed over properly.</li>
                                <li>Certificate will be issued only if intern completes <strong>minimum 75% of internship duration</strong>.</li>
                                <li>Leaving without notice will result in <strong>no certificate and negative reference</strong>.</li>
                            </ul>
                        </div>

                        {/* Section 11: Certificate & PPO */}
                        <div className="mb-4">
                            <h2 className="text-sm font-bold text-emerald-700 border-b border-emerald-200 pb-1 mb-2">11. CERTIFICATE, LOR & PRE-PLACEMENT OFFER (PPO)</h2>
                            <ul className="list-disc ml-4 space-y-1 text-slate-700">
                                <li>Certificate of completion issued upon <strong>successful completion</strong> of internship.</li>
                                <li>Certificate requires: 90%+ attendance, satisfactory performance, proper handover.</li>
                                <li><strong>Letter of Recommendation (LOR)</strong> is reserved for <strong>TOP performing interns ONLY</strong> (top 10%).</li>
                                <li>Top performers may receive <strong>Pre-Placement Offer (PPO)</strong> for full-time role.</li>
                                <li>PPO is discretionary and based on performance, attitude, and business needs.</li>
                            </ul>
                        </div>

                        {/* Acknowledgment */}
                        <div className="bg-slate-100 rounded-lg p-3 border-2 border-slate-300">
                            <h2 className="text-sm font-bold text-slate-800 mb-2">ACKNOWLEDGMENT & ACCEPTANCE</h2>
                            <p className="text-slate-700 mb-3 text-[9px]">
                                I, <strong>{data.internName || '________________________'}</strong>, have read and understood all terms,
                                conditions, and policies mentioned in this Annexure A. I agree to abide by all rules and understand
                                that violation may result in suspension or termination of my internship.
                            </p>
                            <div className="flex justify-between items-end pt-2">
                                <div>
                                    <p className="text-[9px] text-slate-500 mb-4">Intern's Signature</p>
                                    <div className="border-t border-slate-400 pt-1 w-40">
                                        <p className="font-bold text-slate-800 text-[9px]">{data.internName || '________________________'}</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-[9px] text-slate-500 mb-4">Date</p>
                                    <div className="border-t border-slate-400 pt-1 w-28">
                                        <p className="text-[9px] text-slate-600">____/____/________</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] text-slate-500 mb-4">Witness (HR)</p>
                                    <div className="border-t border-slate-400 pt-1 w-40">
                                        <p className="font-bold text-slate-800 text-[9px]">{data.hrName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-purple-900 px-8 py-2 mt-auto">
                        <div className="flex justify-between text-xs text-purple-200">
                            <p>© {new Date().getFullYear()} {data.companyName} - Annexure A</p>
                            <p>Page 3 of 3</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

InternshipLetterTemplate.displayName = 'InternshipLetterTemplate';

