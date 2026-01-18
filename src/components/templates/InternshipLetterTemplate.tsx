import { forwardRef, useMemo } from 'react';
import { InternshipLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, DOC_TYPES } from '../../utils/refGenerator';

interface InternshipLetterTemplateProps {
    data: InternshipLetterData;
    showSeal?: boolean;
}

export const InternshipLetterTemplate = forwardRef<HTMLDivElement, InternshipLetterTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const refNumber = useMemo(() => generateRefNumber(data.internName || '', DOC_TYPES.INT), [data.internName]);

        return (
            <div ref={ref} className="bg-white">
                {/* ===== PAGE 1: MAIN OFFER LETTER ===== */}
                <div
                    className="bg-white shadow-2xl print:shadow-none flex flex-col"
                    style={{ width: '210mm', height: '297mm' }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-800 px-10 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                                <p className="text-purple-200 text-sm">{data.companyTagline}</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                                <p className="text-base font-black text-white">INTERNSHIP OFFER</p>
                            </div>
                        </div>
                    </div>

                    {/* Ref & Date */}
                    <div className="px-10 py-2 bg-purple-50 border-b border-purple-200 flex justify-between text-sm">
                        <span><strong>Ref:</strong> {refNumber}</span>
                        <span><strong>Date:</strong> {data.date}</span>
                    </div>

                    <div className="px-10 py-5 flex-1 flex flex-col">
                        {/* Recipient */}
                        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-5 mb-5 border border-purple-200 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                                {data.internName?.charAt(0) || 'I'}
                            </div>
                            <div>
                                <p className="font-bold text-purple-800 text-xl">{data.internName || '[Intern Name]'}</p>
                                {data.collegeName && <p className="text-purple-600">{data.collegeName} • {data.course}</p>}
                            </div>
                        </div>

                        <p className="font-bold text-purple-700 text-lg mb-4">Subject: Offer of Internship at {data.companyName}</p>

                        <p className="text-slate-700 text-base mb-5 text-justify">
                            We are pleased to offer you an internship position at <strong>{data.companyName}</strong>.
                            This is an exciting opportunity to work with a dynamic team and gain hands-on experience in a fast-paced digital agency environment.
                        </p>

                        {/* Internship Details */}
                        <div className="grid grid-cols-3 gap-4 mb-5">
                            {[
                                ['Role', data.internshipRole],
                                ['Department', data.department],
                                ['Duration', data.duration],
                                ['Working Hours', data.workingHours],
                                ['Start Date', data.startDate || 'TBC'],
                                ['End Date', data.endDate || 'TBC'],
                            ].map(([label, value], i) => (
                                <div key={i} className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                    <p className="text-sm text-purple-600">{label}</p>
                                    <p className="font-bold text-slate-800">{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Stipend */}
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-5 inline-block">
                            <span className="text-base text-green-600">Monthly Stipend: </span>
                            <span className="font-black text-green-800 text-xl">₹{data.stipend.toLocaleString('en-IN')}</span>
                        </div>

                        {/* Mentor */}
                        {data.mentorName && (
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-5">
                                <p className="text-sm text-blue-600">Your Mentor</p>
                                <p className="font-bold text-blue-800 text-lg">{data.mentorName}</p>
                                <p className="text-slate-600">{data.mentorDesignation}</p>
                            </div>
                        )}

                        <p className="text-slate-700 text-base">We look forward to having you as part of our team! <strong>Please read Annexure A (attached) carefully.</strong></p>

                        {/* Spacer */}
                        <div className="flex-1"></div>

                        {/* Signature */}
                        <div className="pt-4 border-t border-slate-200 mt-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <img src={signatureImage} alt="Signature" className="h-10 object-contain" />
                                    <div className="border-t-2 border-slate-400 pt-1 mt-1 w-40">
                                        <p className="font-bold text-slate-800 text-sm">{data.hrName}</p>
                                        <p className="text-slate-600 text-xs">{data.hrDesignation}</p>
                                    </div>
                                </div>
                                {showSeal && <CompanySeal companyName={data.companyName} size="sm" />}
                                <div>
                                    <div className="h-10"></div>
                                    <div className="border-t-2 border-slate-400 pt-1 mt-1 w-40 text-center">
                                        <p className="font-bold text-slate-800 text-sm">{data.internName || '________________'}</p>
                                        <p className="text-slate-600 text-xs">Intern's Acceptance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-purple-900 px-10 py-3">
                        <div className="flex justify-between text-sm text-purple-200">
                            <p>© {new Date().getFullYear()} {data.companyName}</p>
                            <p>Page 1 of 3</p>
                        </div>
                    </div>
                </div>

                {/* ===== PAGE 2: ANNEXURE A - PART 1 ===== */}
                <div
                    className="bg-white shadow-2xl print:shadow-none flex flex-col"
                    style={{ width: '210mm', height: '297mm' }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-800 px-10 py-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-xl font-black text-white">ANNEXURE A</h1>
                                <p className="text-purple-200 text-sm">Internship Terms, Policies & Code of Conduct</p>
                            </div>
                            <div className="bg-white/20 rounded-lg px-4 py-1">
                                <p className="font-bold text-white">{data.companyName}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-10 py-4 flex-1 text-sm">
                        {/* Section 1 */}
                        <div className="mb-4">
                            <h2 className="font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">1. GENERAL TERMS & CONDITIONS</h2>
                            <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                <li>This internship is a <strong>training program</strong> and does not constitute employment.</li>
                                <li>The internship period is fixed and may be extended or shortened at the company's discretion.</li>
                                <li>The stipend is a <strong>training allowance</strong>, not a salary.</li>
                                <li>No benefits such as PF, ESI, gratuity, or leave encashment are applicable.</li>
                            </ul>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-4">
                            <h2 className="font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">2. ATTENDANCE & PUNCTUALITY</h2>
                            <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                <li><strong>Working days:</strong> Monday to Saturday (unless otherwise specified).</li>
                                <li><strong>Minimum attendance:</strong> 90% is mandatory for certificate issuance.</li>
                                <li><strong>Late arrivals:</strong> 3 late arrivals (beyond 15 min) = 1 absence.</li>
                                <li><strong>Unapproved absence:</strong> 3+ consecutive days = automatic termination.</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-4">
                            <h2 className="font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">3. CODE OF CONDUCT</h2>
                            <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                <li>Maintain <strong>professional behavior</strong> at all times.</li>
                                <li>Follow the company <strong>dress code</strong> (business casual).</li>
                                <li><strong>Harassment:</strong> Zero tolerance for any form of harassment.</li>
                                <li>Maintain <strong>cleanliness</strong> of workspace and common areas.</li>
                            </ul>
                        </div>

                        {/* Section 4 */}
                        <div className="mb-4">
                            <h2 className="font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">4. CONFIDENTIALITY & INTELLECTUAL PROPERTY</h2>
                            <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                <li>All client information and project details are <strong>strictly confidential</strong>.</li>
                                <li>All work created during internship is <strong>company property</strong>.</li>
                                <li>Confidentiality obligations continue <strong>even after internship ends</strong>.</li>
                                <li>Breach may result in <strong>legal action</strong> and immediate termination.</li>
                            </ul>
                        </div>

                        {/* Section 5 */}
                        <div className="mb-4">
                            <h2 className="font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">5. WORK EXPECTATIONS & PERFORMANCE</h2>
                            <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                <li>Complete assigned tasks within <strong>given deadlines</strong>.</li>
                                <li>Participate actively in <strong>team meetings and training sessions</strong>.</li>
                                <li>Submit <strong>daily/weekly progress reports</strong> as required.</li>
                                <li>Seek feedback and show <strong>continuous improvement</strong>.</li>
                            </ul>
                        </div>

                        {/* Section 6 */}
                        <div className="mb-3">
                            <h2 className="font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">6. IT USAGE & SECURITY POLICY</h2>
                            <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                <li>Use company systems <strong>only for work purposes</strong>.</li>
                                <li>Do not install unauthorized software or browser extensions.</li>
                                <li>Protect login credentials - do not share with anyone.</li>
                                <li>Report any security incidents immediately to IT/HR.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-purple-900 px-10 py-3 mt-auto">
                        <div className="flex justify-between text-sm text-purple-200">
                            <p>© {new Date().getFullYear()} {data.companyName} - Annexure A</p>
                            <p>Page 2 of 3</p>
                        </div>
                    </div>
                </div>

                {/* ===== PAGE 3: ANNEXURE A - PART 2 ===== */}
                <div
                    className="bg-white shadow-2xl print:shadow-none flex flex-col"
                    style={{ width: '210mm', height: '297mm' }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-800 px-10 py-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-xl font-black text-white">ANNEXURE A (Continued)</h1>
                                <p className="text-purple-200 text-sm">Suspension, Termination & Acknowledgment</p>
                            </div>
                            <div className="bg-white/20 rounded-lg px-4 py-1">
                                <p className="font-bold text-white">{data.companyName}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-10 py-4 flex-1 text-sm">
                        {/* Section 7 */}
                        <div className="mb-4">
                            <h2 className="font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">7. GROUNDS FOR SUSPENSION</h2>
                            <p className="text-slate-600 mb-2">The company may suspend an intern temporarily pending investigation for:</p>
                            <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                <li>Alleged misconduct or policy violation under investigation.</li>
                                <li>Suspected breach of confidentiality or data theft.</li>
                                <li>Involvement in workplace conflict requiring resolution.</li>
                            </ul>
                        </div>

                        {/* Section 8 */}
                        <div className="mb-4 bg-amber-50 rounded-lg p-4 border-2 border-amber-200">
                            <h2 className="font-bold text-amber-800 border-b border-amber-300 pb-1 mb-2">⚠️ 8. GROUNDS FOR IMMEDIATE TERMINATION</h2>
                            <div className="grid grid-cols-2 gap-2 text-slate-800">
                                <div>• <strong>Theft/fraud</strong></div>
                                <div>• <strong>Data breach</strong></div>
                                <div>• <strong>Harassment</strong></div>
                                <div>• <strong>Violence/threats</strong></div>
                                <div>• <strong>Substance abuse at work</strong></div>
                                <div>• <strong>Falsification of documents</strong></div>
                                <div>• <strong>Insubordination</strong></div>
                                <div>• <strong>AWOL (3+ days)</strong></div>
                            </div>
                        </div>

                        {/* Section 9-10 */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <h2 className="font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">9. TERMINATION BY COMPANY</h2>
                                <ul className="list-disc ml-5 space-y-1 text-slate-700 text-xs">
                                    <li>Consistent poor performance</li>
                                    <li>Repeated policy violations (3 warnings)</li>
                                    <li>Attendance below 70%</li>
                                    <li>Business restructuring</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="font-bold text-purple-700 border-b border-purple-200 pb-1 mb-2">10. RESIGNATION BY INTERN</h2>
                                <ul className="list-disc ml-5 space-y-1 text-slate-700 text-xs">
                                    <li>Minimum 7 days written notice</li>
                                    <li>Return all company property</li>
                                    <li>Proper handover of tasks</li>
                                    <li>Min 75% duration for certificate</li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 11 */}
                        <div className="mb-4">
                            <h2 className="font-bold text-emerald-700 border-b border-emerald-200 pb-1 mb-2">11. CERTIFICATE, LOR & PRE-PLACEMENT OFFER (PPO)</h2>
                            <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                <li>Certificate requires: 90%+ attendance, satisfactory performance, proper handover.</li>
                                <li><strong>Letter of Recommendation (LOR)</strong> is for <strong>TOP 10% performers ONLY</strong>.</li>
                                <li>Top performers may receive <strong>Pre-Placement Offer (PPO)</strong> for full-time role.</li>
                            </ul>
                        </div>

                        {/* Acknowledgment */}
                        <div className="bg-slate-100 rounded-lg p-4 border-2 border-slate-300">
                            <h2 className="font-bold text-slate-800 mb-2">ACKNOWLEDGMENT & ACCEPTANCE</h2>
                            <p className="text-slate-700 mb-4">
                                I, <strong>{data.internName || '________________________'}</strong>, have read and understood all terms,
                                conditions, and policies. I agree to abide by all rules and understand that violation may result in termination.
                            </p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-sm text-slate-500 mb-6">Intern's Signature</p>
                                    <div className="border-t-2 border-slate-400 pt-1 w-40">
                                        <p className="font-bold text-slate-800">{data.internName || '________________________'}</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-slate-500 mb-6">Date</p>
                                    <div className="border-t-2 border-slate-400 pt-1 w-28">
                                        <p className="text-slate-600">____/____/________</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-500 mb-6">Witness (HR)</p>
                                    <div className="border-t-2 border-slate-400 pt-1 w-40">
                                        <p className="font-bold text-slate-800">{data.hrName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-purple-900 px-10 py-3 mt-auto">
                        <div className="flex justify-between text-sm text-purple-200">
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
