import { forwardRef } from 'react';
import { OfferLetterData, HR_SIGNATORY_OPTIONS, ROLE_PRESETS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface OfferLetterTemplateProps {
    data: OfferLetterData;
    showSeal?: boolean;
}

// Helper function to build full role string with custom roles
const getFullRoleTitle = (designation: string, customRole1?: string, customRole2?: string): string => {
    const roles = [designation];
    if (customRole1?.trim()) roles.push(customRole1.trim());
    if (customRole2?.trim()) roles.push(customRole2.trim());
    return roles.join(' + ');
};

export const OfferLetterTemplate = forwardRef<HTMLDivElement, OfferLetterTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const monthlySalary = Math.round(data.annualCtc / 12);
        const basicSalary = Math.round(monthlySalary * 0.50);
        const hra = Math.round(basicSalary * 0.50);
        const conveyance = Math.round(basicSalary * 0.10);
        const pfEmployer = 1800;
        const specialAllowance = Math.round(monthlySalary - basicSalary - hra - conveyance - pfEmployer);

        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = data.hrSignature || signatory?.signatureImage || '/prasun_signature.png';
        const rolePreset = ROLE_PRESETS.find(r => r.designation === data.designation);
        const responsibilities = rolePreset?.responsibilities || 'As assigned by your reporting manager';
        const fullRoleTitle = getFullRoleTitle(data.designation, data.customRole1, data.customRole2);

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none font-sans text-[11px] leading-relaxed"
                style={{ width: '210mm' }}
            >
                {/* ===== PAGE 1 ===== */}
                <div style={{ minHeight: '297mm' }} className="relative">
                    {/* Premium Header with Gradient */}
                    <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900"></div>
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                        </div>
                        <div className="relative px-10 py-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                    <p className="text-blue-300 text-xs mt-1 italic">{data.companyTagline}</p>
                                </div>
                                <div className="text-right text-xs text-blue-200">
                                    <p><strong>Head Office:</strong> {data.companyAddress}</p>
                                    <p><strong>YouTube:</strong> @DigitalMarketingHeroes (2.5M+ Subscribers)</p>
                                    <p>support@digitalheroes.co.in | <strong>Since:</strong> 2017</p>
                                    <p className="text-amber-300 text-[10px]">Google & HubSpot Certified</p>
                                </div>
                            </div>
                        </div>
                        {/* Gold accent bar */}
                        <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"></div>
                    </div>

                    {/* Reference & Date Bar */}
                    <div className="px-10 py-3 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200 flex justify-between text-xs">
                        <span><strong className="text-slate-600">Ref:</strong> <span className="font-mono text-blue-700">{data.refPrefix}/{data.refYear}/{data.refNumber}</span></span>
                        <span><strong className="text-slate-600">Date:</strong> <span className="text-slate-800">{data.date}</span></span>
                    </div>

                    {/* Title */}
                    <div className="text-center py-4">
                        <h2 className="inline-block text-xl font-black text-blue-800 tracking-widest uppercase">
                            Offer of Employment
                        </h2>
                        <div className="w-32 h-0.5 bg-amber-500 mx-auto mt-2"></div>
                    </div>

                    {/* Content */}
                    <div className="px-10 space-y-4">
                        {/* Recipient Card */}
                        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
                            <p className="text-lg font-bold text-slate-800">Dear {data.candidateName || 'Team Member'},</p>
                            {data.candidateAddress && <p className="text-slate-500 text-xs">{data.candidateAddress}</p>}
                        </div>

                        <p className="font-semibold text-blue-700">Subject: Offer of Employment at Digital Heroes</p>

                        {/* Introduction with premium styling */}
                        <div className="text-slate-700 space-y-2 text-justify">
                            <p>With reference to your application and subsequent discussions with us, we are pleased to offer you a position at Digital Heroes on the following terms and conditions of employment.</p>
                            <p>Digital Heroes is not just another digital agency; we are a movement. Since 2017, we've been on a mission to become a <strong className="text-blue-800">Top 100 Digital Agency globally</strong> by transforming struggling online businesses into profitable enterprises through strategic design, compelling storytelling, and technical excellence.</p>
                            <p>As a Google and HubSpot Certified agency trusted by 2.5+ million YouTube subscribers, we don't just build websites, we build dreams. Every project we deliver, every brand we elevate, every entrepreneur we empower brings us closer to our ultimate vision.</p>
                            <p>We believe your talent, hunger for growth, and commitment to excellence will not only accelerate your own career but also contribute to our collective journey toward greatness. <strong className="text-blue-800">This is not just a job</strong>: it's an opportunity to be part of something bigger than yourself, to learn from the best, to push boundaries, and to create wealth and impact together.</p>
                        </div>

                        {/* Excellence Expectations */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-600 rounded-r-lg p-3 text-xs">
                            <p className="font-bold text-indigo-800 mb-1">Our Excellence Standard: Will × Skill Framework</p>
                            <p className="text-slate-700">We build teams where every member strives to be the <strong>best in their field</strong>. We evaluate on: <strong className="text-indigo-700">Skill</strong> (domain-specific expertise, execution, growth) × <strong className="text-indigo-700">Will</strong> (positive attitude, adaptability, ownership). Competence and continuous improvement are non-negotiable.</p>
                        </div>

                        {/* Section 1: Position Details */}
                        <div className="border-l-4 border-blue-600 pl-4 mt-6">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide mb-3">1. Position Details</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {[
                                ['Position Title', fullRoleTitle],
                                ['Department', data.department],
                                ['Employment Type', 'Full-time'],
                                ['Work Location', data.location],
                                ['Reporting To', data.reportingTo],
                                ['Joining Date', data.joiningDate || 'To be mutually agreed'],
                                ['Probation Period', data.probationPeriod],
                                ['Notice Period', `${data.noticePeriod} (after confirmation)`],
                            ].map(([label, value], i) => (
                                <div key={i} className="flex bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                                    <span className="w-40 bg-slate-100 px-3 py-2 text-slate-600 font-medium text-xs">{label}</span>
                                    <span className="flex-1 px-3 py-2 text-slate-800 font-semibold text-xs">{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Section 2: Compensation - pushed to next page */}
                        <div className="page-break-before" style={{ height: '30px' }}></div>
                        <div className="border-l-4 border-green-600 pl-4 mt-2">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide mb-3">2. Compensation & Benefits</h3>
                        </div>

                        {/* CTC Hero Card */}
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-4 text-center text-white shadow-lg">
                            <p className="text-xs uppercase tracking-wider opacity-80">Annual Cost to Company (CTC)</p>
                            <p className="text-3xl font-black mt-1">₹{data.annualCtc.toLocaleString('en-IN')}</p>
                            <p className="text-xs opacity-70 mt-1">Monthly: ₹{monthlySalary.toLocaleString('en-IN')}</p>
                        </div>

                        {/* Salary Table */}
                        <table className="w-full text-xs border-collapse rounded-lg overflow-hidden shadow-sm">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                                    <th className="p-2 text-left font-semibold">Component</th>
                                    <th className="p-2 text-right font-semibold">Monthly (₹)</th>
                                    <th className="p-2 text-right font-semibold">Annual (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-slate-100"><td colSpan={3} className="p-2 font-bold text-slate-700">Fixed Components</td></tr>
                                {[
                                    ['Basic Salary', basicSalary],
                                    ['House Rent Allowance (HRA)', hra],
                                    ['Conveyance Allowance', conveyance],
                                    ['Special Allowance', specialAllowance],
                                    ['PF (Employer Contribution)', pfEmployer],
                                ].map(([name, val], i) => (
                                    <tr key={i} className={i % 2 ? 'bg-white' : 'bg-slate-50'}>
                                        <td className="p-2 border-b border-slate-100">{name}</td>
                                        <td className="p-2 text-right font-mono border-b border-slate-100">{(val as number).toLocaleString('en-IN')}</td>
                                        <td className="p-2 text-right font-mono border-b border-slate-100">{((val as number) * 12).toLocaleString('en-IN')}</td>
                                    </tr>
                                ))}
                                <tr className="bg-slate-100"><td colSpan={3} className="p-2 font-bold text-slate-700">Variable Components</td></tr>
                                <tr className="bg-white">
                                    <td className="p-2">Performance Bonus (Quarterly)</td>
                                    <td className="p-2 text-right text-slate-500">Based on KPI</td>
                                    <td className="p-2 text-right text-slate-500">5-20% of annual</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className="p-2">Commission (Sales Roles Only)</td>
                                    <td className="p-2 text-right text-slate-500">5% of order value</td>
                                    <td className="p-2 text-right text-emerald-600 font-semibold">Uncapped</td>
                                </tr>
                                <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold">
                                    <td className="p-2">TOTAL CTC</td>
                                    <td className="p-2 text-right font-mono">{monthlySalary.toLocaleString('en-IN')}</td>
                                    <td className="p-2 text-right font-mono">{data.annualCtc.toLocaleString('en-IN')}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Probation Box */}
                        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-3 text-xs">
                            <strong className="text-amber-800">Probation Period Salary:</strong>
                            <span className="text-amber-700"> During the first 3 months, your take-home will be as per "Fixed Components" above. Variable components apply after successful probation completion.</span>
                        </div>
                    </div>
                </div>

                {/* ===== PAGE 2 ===== */}
                <div style={{ minHeight: '297mm' }} className="px-10 py-6 ">
                    {/* Benefits */}
                    <p className="text-xs font-bold text-slate-700 mb-2">2.2 Additional Benefits</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                            ['ESOP Eligibility', 'After 1 year of service'],
                            ['Profit Sharing', 'As per company policy'],
                            ['Skill Development', 'Training programs & certifications'],
                            ['Hybrid Work', 'Post-probation (max 2 days/week)'],
                            ['Health & Wellness', 'Health insurance & wellness programs'],
                            ['Performance Incentives', '5-20% increment for top performers'],
                            ['Wealth Creation', 'Long-term growth initiatives'],
                        ].map(([title, desc], i) => (
                            <div key={i} className="flex items-start gap-2 bg-blue-50 p-2 rounded-lg border border-blue-100">
                                <span className="text-blue-600">✓</span>
                                <div>
                                    <p className="font-semibold text-slate-800 text-xs">{title}</p>
                                    <p className="text-slate-600 text-[10px]">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section 3: Working Hours - starts on page 3 */}
                    <div className="page-break-before" style={{ height: '30px' }}></div>
                    <div className="border-l-4 border-purple-600 pl-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">3. Working Hours & Attendance</h3>
                    </div>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                        {[
                            ['Standard Hours', '9:00 AM - 6:00 PM'],
                            ['Lunch Break', '1:00 PM - 2:00 PM'],
                            ['Tea Breaks', '15 min (AM & PM)'],
                            ['Working Days', 'Mon to Sat'],
                            ['Weekly Off', 'Sunday'],
                        ].map(([label, value], i) => (
                            <div key={i} className="bg-purple-50 p-2 rounded-lg text-center border border-purple-100">
                                <p className="text-[10px] text-purple-600 uppercase">{label}</p>
                                <p className="font-bold text-purple-800 text-xs">{value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-2 text-xs mb-2">
                        <strong className="text-amber-800">Sales Role:</strong>
                        <span className="text-amber-700"> Must be available/responsive 9:00 AM - 9:00 PM</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mb-1">Attendance Policy:</p>
                    <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc">
                        <li>Daily attendance must be marked in company system</li>
                        <li>Late arrival (after 9:15 AM) = Half-day deduction</li>
                        <li>3 late arrivals in a month = Verbal warning</li>
                        <li>5 late arrivals in a month = Written warning</li>
                        <li>Unexplained absence must be informed before 9:00 AM via WhatsApp/Discord</li>
                        <li>1 unexplained absence = Written warning</li>
                        <li>3 unexplained absences = Salary deduction (3 days)</li>
                        <li>5+ unexplained absences = Immediate termination</li>
                    </ul>

                    {/* Section 4: Leave Policy */}
                    <div className="border-l-4 border-rose-600 pl-4 mt-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">4. Leave Policy</h3>
                    </div>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                        {[
                            ['Casual Leave', '12 days/year'],
                            ['Sick Leave', '6 days/year'],
                            ['Earned Leave', '1 day/month*'],
                            ['National Holidays', '~10 days'],
                            ['Advance Notice', '3 days min'],
                        ].map(([label, value], i) => (
                            <div key={i} className="bg-rose-50 p-2 rounded-lg text-center border border-rose-100">
                                <p className="text-[10px] text-rose-600 uppercase">{label}</p>
                                <p className="font-bold text-rose-800 text-xs">{value}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-600 mb-1">*Earned Leave available after completing 1 year of service.</p>
                    <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc">
                        <li>Medical certificate required for more than 2 consecutive sick days</li>
                        <li><strong className="text-rose-700">Leave Restriction:</strong> No leave during month-end (25th-5th) unless emergency</li>
                        <li>Unused CL/SL do not carry forward to next year</li>
                    </ul>

                    {/* Section 5: Responsibilities */}
                    <div className="border-l-4 border-cyan-600 pl-4 mt-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">5. Key Responsibilities & Performance</h3>
                    </div>
                    <p className="text-xs text-slate-700 mb-2">Your KRAs will be based on your assigned role. Below is a summary of expectations:</p>
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-xl border border-cyan-200 mb-3">
                        <p className="font-bold text-cyan-800 text-xs mb-1">Your Role: {fullRoleTitle}</p>
                        <p className="text-slate-700 text-xs">{responsibilities}</p>
                    </div>
                    <table className="w-full text-xs border-collapse rounded-lg overflow-hidden shadow-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                                <th className="p-2 text-left w-1/4">Position</th>
                                <th className="p-2 text-left">Core Responsibilities & KRAs</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-cyan-50">
                                <td className="p-2 border-b border-cyan-100 font-semibold align-top">Project Manager / Team Lead</td>
                                <td className="p-2 border-b border-cyan-100 text-slate-600">Maintain multiple projects | Primary client contact (&lt;6hr response) | 60-point QA checklist | 95% on-time delivery | ≥4.8 star satisfaction | Team utilization 75-85% | Update SOPs quarterly</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="p-2 border-b border-cyan-100 font-semibold align-top">Developer + Client Success</td>
                                <td className="p-2 border-b border-cyan-100 text-slate-600">Build conversion-optimized websites (HTML, CSS, JS) | Professional onboarding | 75-85% billable | 90+ mobile PageSpeed | Zero critical bugs | &lt;2hr response | 30-day retention 90%+ | Upsell 30%+</td>
                            </tr>
                            <tr className="bg-cyan-50">
                                <td className="p-2 border-b border-cyan-100 font-semibold align-top">Sales Executive</td>
                                <td className="p-2 border-b border-cyan-100 text-slate-600">100% inquiry response within 1hr | Lead qualification | 15-25% inquiry-to-order | 25-40% proposal-to-order | Monthly revenue targets | Custom proposals in 24hrs | ≥4.8 star satisfaction</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="p-2 border-b border-cyan-100 font-semibold align-top">HR Manager</td>
                                <td className="p-2 border-b border-cyan-100 text-slate-600">End-to-end recruitment (JD to onboarding) | KRA/KPI/SOP documents | Interviews & reference checks | Attendance, leaves, payroll | Induction programs | Quarterly reviews | Grievance handling</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-slate-500 mt-2 italic">Note: Detailed SOPs and KPIs for your specific role will be shared during onboarding.</p>

                    {/* Section 6: KPIs - starts on page 4 */}
                    <div className="page-break-before" style={{ height: '30px' }}></div>
                    <div className="border-l-4 border-indigo-600 pl-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">6. Key Performance Indicators (KPIs)</h3>
                    </div>
                    <p className="text-xs text-slate-700 mb-2">Performance evaluated quarterly based on role-specific metrics:</p>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            ['On-Time Delivery', '≥95%'],
                            ['Client Satisfaction', '≥4.8/5'],
                            ['Response Time', '<2-6 hrs'],
                            ['Quality Score', '≥90%'],
                            ['PageSpeed Mobile', '90+'],
                            ['Retention/Conversion', 'Per Role'],
                            ['Utilization', '75-85%'],
                            ['Revenue (Sales)', '$15K-25K'],
                        ].map(([label, value], i) => (
                            <div key={i} className="bg-indigo-50 p-2 rounded-lg border border-indigo-100 text-center">
                                <p className="text-[10px] text-indigo-600 uppercase">{label}</p>
                                <p className="font-bold text-indigo-800 text-xs">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Section 7: Probation */}
                    <div className="border-l-4 border-orange-600 pl-4 mt-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">7. Probation Period</h3>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc">
                        <li>Duration: <strong>{data.probationPeriod}</strong> from date of joining</li>
                        <li>Required to match company culture and prove yourself in your role</li>
                        <li>Performance review conducted at end of probation</li>
                        <li>Either party may terminate with <strong>7 days notice</strong> during probation</li>
                        <li>Upon confirmation, <strong>{data.noticePeriod}</strong> notice period applies</li>
                    </ul>
                </div>

                {/* ===== PAGE 3 ===== */}
                <div style={{ minHeight: '297mm' }} className="px-10 py-6 ">
                    {/* Section 8: Notice & Termination */}
                    <div className="border-l-4 border-red-600 pl-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">8. Notice Period & Termination</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        {[
                            ['During Probation', '7 days'],
                            ['After Confirmation', data.noticePeriod],
                            ['Payment in Lieu', 'Negotiable'],
                        ].map(([label, value], i) => (
                            <div key={i} className="bg-red-50 p-2 rounded-lg text-center border border-red-100">
                                <p className="text-[10px] text-red-600 uppercase">{label}</p>
                                <p className="font-bold text-red-800 text-xs">{value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-red-50 border-l-4 border-red-600 rounded-r-lg p-3 text-xs mb-4">
                        <p className="font-bold text-red-800 mb-2">8.1 Immediate Termination (Without Notice)</p>
                        <p className="text-red-700 mb-2">Employment may be terminated immediately for:</p>
                        <ul className="text-red-700 space-y-1 ml-4 list-disc">
                            <li>Client data breach or confidentiality violation</li>
                            <li>Repeated poor communication (3+ penalties)</li>
                            <li>Unauthorized absence (5+ instances)</li>
                            <li>Negligence or non-performance</li>
                            <li>Data theft or misrepresentation</li>
                            <li>Willful disobedience of lawful instructions</li>
                            <li>Conduct damaging company reputation</li>
                            <li>Policy violations (attendance, leave, code of conduct)</li>
                            <li>Harassment, discrimination, or misconduct</li>
                            <li>Substance abuse at workplace</li>
                            <li>Integrity issues or fraud</li>
                            <li>Moonlighting for competitors without approval</li>
                            <li>Repeatedly ignoring team/management messages</li>
                        </ul>
                    </div>

                    {/* Section 9: Compensation Related */}
                    <div className="border-l-4 border-emerald-600 pl-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">9. Compensation & Salary Related</h3>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mb-1">9.1 Salary Payment:</p>
                    <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc mb-2">
                        <li>Salary credited <strong>before 10th of the upcoming month</strong> via NEFT/IMPS</li>
                        <li>Salary slips provided on request (optional, on-demand basis)</li>
                    </ul>
                    <p className="text-xs font-semibold text-slate-700 mb-1">9.2 Advance Salary Policy:</p>
                    <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc mb-2">
                        <li>Available only after completing <strong>3 months (probation)</strong></li>
                        <li>Maximum amount: <strong>50% of monthly salary</strong></li>
                        <li>Reason must be genuine (medical emergency, family emergency)</li>
                        <li>Recovery: Deducted equally over <strong>next 2 months</strong></li>
                        <li>Maximum <strong>2 advances per year</strong> | Requires manager approval</li>
                    </ul>
                    <div className="page-break-before" style={{ height: '30px' }}></div>
                    <p className="text-xs font-semibold text-slate-700 mb-1">9.3 Performance-Based Increments:</p>
                    <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc mb-4">
                        <li>Performance reviewed <strong>quarterly</strong> based on KPI achievement</li>
                        <li>Merit-based increments: <strong>5-20%</strong> for top performers</li>
                        <li>Annual increment: <strong>10-15%</strong> average</li>
                        <li>Exceptional performers eligible for out-of-cycle increments and promotions</li>
                    </ul>

                    {/* Section 10: Confidentiality */}
                    <div className="border-l-4 border-slate-800 pl-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">10. Confidentiality & Non-Disclosure Agreement</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                            <p className="font-bold text-slate-800 text-xs mb-1">Confidential Information</p>
                            <p className="text-[10px] text-slate-600">Client data | Company financials | Salary info | SOPs | Source code | Design files | Marketing strategies | Client contracts</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                            <p className="font-bold text-slate-800 text-xs mb-1">Your Obligations</p>
                            <p className="text-[10px] text-slate-600">Maintain strict confidentiality | No disclosure/copying | No personal use | Return all data on termination</p>
                        </div>
                    </div>
                    <div className="bg-red-100 border border-red-300 rounded-lg p-2 text-center text-xs mb-4">
                        <strong className="text-red-800">⚠️ CRITICAL:</strong> <span className="text-red-700">Data breach = Immediate termination + legal action under IT Act 2000</span>
                    </div>

                    {/* Section 11: IP & Non-Compete */}
                    <div className="border-l-4 border-violet-600 pl-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">11. Intellectual Property & Non-Compete</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="bg-violet-50 p-2 rounded-lg border border-violet-100">
                            <p className="font-bold text-violet-800 text-xs">IP Rights</p>
                            <p className="text-[10px] text-slate-600">All work is exclusive property of Digital Heroes. Portfolio use requires written permission with client identity concealed.</p>
                        </div>
                        <div className="bg-violet-50 p-2 rounded-lg border border-violet-100">
                            <p className="font-bold text-violet-800 text-xs">Non-Compete</p>
                            <p className="text-[10px] text-slate-600">During: No moonlighting without approval. Post: 6-month restriction (India region)</p>
                        </div>
                        <div className="bg-violet-50 p-2 rounded-lg border border-violet-100">
                            <p className="font-bold text-violet-800 text-xs">Non-Solicitation</p>
                            <p className="text-[10px] text-slate-600">12 months: Cannot solicit clients or recruit employees post-exit</p>
                        </div>
                    </div>

                    {/* Section 12: Code of Conduct */}
                    <div className="border-l-4 border-teal-600 pl-4 mb-3 mt-4">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">12. Company Assets & Code of Conduct</h3>
                    </div>
                    <p className="text-xs text-slate-700 mb-1"><strong>Assets (If Provided):</strong> Laptop, mobile, software licenses, ID card. For official use only. Return before final settlement.</p>
                    <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc mb-2">
                        <li>Accidental damage (1st instance): 50% company-paid | Negligence: 100% employee-paid</li>
                        <li>Theft/Loss: Police report required + employee bears full cost</li>
                    </ul>
                    <p className="text-xs text-slate-700 mb-1"><strong>Professional Conduct:</strong> Treat all with respect | Maintain punctuality | Respond to team/management within 2 hours | Take ownership | Meet deadlines | Be proactive</p>
                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-2 text-xs mb-2">
                        <strong className="text-amber-800">Communication Penalties:</strong>
                        <span className="text-amber-700"> Poor client communication: 1st offense = ₹500 + warning | 2nd offense = ₹1,000 + final warning | 3rd offense = Termination</span>
                    </div>
                    <div className="bg-red-100 border border-red-300 rounded-lg p-2 text-center text-xs">
                        <strong className="text-red-800">ZERO TOLERANCE:</strong> <span className="text-red-700">Harassment, discrimination, violence, theft, fraud, falsification = Immediate termination</span>
                    </div>
                </div>

                {/* ===== PAGE 4 ===== */}
                <div style={{ minHeight: '297mm' }} className="px-10 py-6 ">
                    {/* Section 13: Work Arrangements */}
                    <div className="border-l-4 border-sky-600 pl-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">13. Work Arrangements & Communication</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-sky-50 p-2 rounded-lg border border-sky-200">
                            <p className="font-bold text-sky-800 text-xs mb-1">Work From Home</p>
                            <p className="text-[10px] text-slate-600">Available post-probation with good performance | Max 2 days/week (<strong>non-consecutive</strong>) with manager approval | Requires 10+ Mbps internet | Must be on Discord/Slack | Respond within 30 min | <strong>Not allowed:</strong> during probation, peak periods, or when meetings scheduled</p>
                        </div>
                        <div className="bg-sky-50 p-2 rounded-lg border border-sky-200">
                            <p className="font-bold text-sky-800 text-xs mb-1">Response Time Requirements</p>
                            <p className="text-[10px] text-slate-600">Client messages: &lt;2hrs | Manager: &lt;1hr | Team members: &lt;2hrs | Emergency: &lt;15min</p>
                        </div>
                    </div>
                    <div className="bg-red-100 border border-red-300 rounded-lg p-2 text-center text-xs mb-3">
                        <strong className="text-red-800">⚠️ CRITICAL:</strong> <span className="text-red-700">Ignoring messages from team/management = Immediate termination. No exceptions.</span>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-2 text-xs mb-4">
                        <strong className="text-blue-800">Social Media Policy:</strong>
                        <span className="text-blue-700"> Do not mention company/clients without permission | Do not share internal work or screenshots | Do not badmouth company publicly | Professional behavior expected | LinkedIn mentions encouraged</span>
                    </div>

                    {/* Section 14: Performance Reviews - starts on page 6 */}
                    <div className="page-break-before" style={{ height: '30px' }}></div>
                    <div className="border-l-4 border-amber-600 pl-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">14. Performance Reviews</h3>
                    </div>
                    <p className="text-xs text-slate-700 mb-2"><strong>Review Schedule:</strong> Probation review (Month 3) | Quarterly reviews (every 3 months) | Annual comprehensive review</p>
                    <p className="text-xs text-slate-700 mb-2"><strong>Evaluation Based On:</strong> KPI achievement | Client satisfaction | Quality of work | Communication | Initiative | Attendance | Policy adherence</p>
                    <table className="w-full text-xs border-collapse rounded-lg overflow-hidden shadow-sm mb-4">
                        <thead>
                            <tr className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                                <th className="p-2 text-left">Rating</th>
                                <th className="p-2 text-center">Score</th>
                                <th className="p-2 text-left">Outcome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Exceptional', '90-100%', '15-20% increment + Bonus + Promotion'],
                                ['Exceeds Expectations', '75-89%', '10-15% increment + Bonus'],
                                ['Meets Expectations', '60-74%', '5-10% increment'],
                                ['Needs Improvement', '40-59%', 'No increment + PIP (30-60 days)'],
                                ['Unsatisfactory', '<40%', 'Termination or demotion'],
                            ].map(([rating, score, outcome], i) => (
                                <tr key={i} className={i % 2 ? 'bg-white' : 'bg-amber-50'}>
                                    <td className="p-2 border-b border-amber-100 font-medium">{rating}</td>
                                    <td className="p-2 border-b border-amber-100 text-center font-mono">{score}</td>
                                    <td className="p-2 border-b border-amber-100 text-slate-600">{outcome}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Section 15: Grievance */}
                    <div className="border-l-4 border-pink-600 pl-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">15. Grievance & Resignation</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-2">
                        <div className="bg-pink-50 p-2 rounded-lg border border-pink-200">
                            <p className="font-bold text-pink-800 text-xs mb-1">Grievance Process</p>
                            <p className="text-[10px] text-slate-600">Discuss with manager → Escalate to HR Manager → Contact Founder/Director for serious issues | <strong>Anonymous complaints via email accepted</strong> | All investigated confidentially | No retaliation for good-faith complaints</p>
                        </div>
                        <div className="bg-pink-50 p-2 rounded-lg border border-pink-200">
                            <p className="font-bold text-pink-800 text-xs mb-1">Resignation Process</p>
                            <p className="text-[10px] text-slate-600">Submit written resignation to manager & HR → Serve notice (7 days probation, 30 days post) → Complete handover & knowledge transfer → Exit interview → Return all assets → Delete all company data from personal devices</p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-700 mb-1"><strong>Full & Final Settlement:</strong> Processed within 30 days | Includes: unpaid salary + unused leave | Deductions: notice shortfall, asset damage, advances</p>
                    <p className="text-xs text-slate-700 mb-1"><strong>Exit Documents:</strong> Experience Letter | Relieving Letter | Service Certificate (if requested)</p>
                    <p className="text-xs text-slate-700 mb-4"><strong>Post-Exit:</strong> NDA continues indefinitely | Non-compete: 6 months | Non-solicitation: 12 months | Rehiring possible if left on good terms</p>

                    {/* Section 16: Joining */}
                    <div className="border-l-4 border-lime-600 pl-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">16. Joining Formalities</h3>
                    </div>
                    <p className="text-xs text-slate-700 mb-2">Please bring on joining date (originals for verification + 1 self-attested copy each):</p>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                        {[
                            ['Identity & Address', 'Aadhar, PAN, Address proof (if different), 4 passport photos'],
                            ['Education', '10th, 12th, Graduation (degrees + marksheets), Professional certifications'],
                            ['Previous Employment', 'Experience letters, Relieving letter, NOC (if employed), Last 6 months salary slips'],
                            ['Financial', 'Cancelled cheque/passbook copy, Account details (number, IFSC, branch)'],
                        ].map(([title, items], i) => (
                            <div key={i} className="bg-lime-50 p-2 rounded-lg border border-lime-200">
                                <p className="font-bold text-lime-800 text-xs mb-1">{title}</p>
                                <p className="text-[10px] text-slate-600">{items}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-2 text-xs mb-4">
                        <strong className="text-amber-800">IMPORTANT:</strong> <span className="text-amber-700">All documents verified against originals. Any discrepancy may lead to offer withdrawal.</span>
                    </div>

                    {/* Section 17: General */}
                    <div className="border-l-4 border-slate-600 pl-4 mb-3">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">17. General Provisions</h3>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1 ml-4 list-disc">
                        <li>Subject to satisfactory document verification and background check</li>
                        <li>Separate agreements for Employee, NDA, and Assets on joining</li>
                        <li>Company reserves right to assign work type/range as needed</li>
                        <li>Inform HR of any address/contact changes</li>
                        <li>Employment governed by Digital Heroes policies (subject to change)</li>
                        <li>Not a contract for specific duration</li>
                        <li>Disputes subject to <strong>Lucknow jurisdiction only</strong></li>
                    </ul>
                </div>

                {/* ===== PAGE 5: ACCEPTANCE ===== */}
                <div style={{ minHeight: '297mm' }} className="px-10 py-6  flex flex-col">
                    {/* Section 18: Acceptance - starts on page 7 */}
                    <div className="page-break-before" style={{ height: '30px' }}></div>
                    <div className="border-l-4 border-blue-600 pl-4 mb-4">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">18. Offer Acceptance</h3>
                    </div>
                    <p className="text-xs text-slate-700 mb-4">This offer is valid for <strong className="text-blue-700">7 days from date of issue</strong>. To accept: (1) Sign and return within 3 days (2) Confirm joining date via email (3) Submit all documents on joining day</p>

                    {/* Welcome Box */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-5 text-white mb-6 shadow-lg">
                        <p className="text-sm leading-relaxed">We look forward to welcoming you to the Digital Heroes family. Together, we will transform struggling online businesses into thriving enterprises, empower entrepreneurs worldwide, and prove that with relentless dedication and the right team, we can achieve our dream of becoming a <strong>Top 100 Digital Agency globally</strong>.</p>
                        <p className="mt-3 text-base font-bold text-blue-200">Welcome aboard! Your journey to excellence begins here. 🚀</p>
                    </div>

                    {/* Signature Section */}
                    <div className="flex justify-between items-end mt-8 mb-10">
                        <div>
                            <p className="text-xs text-slate-500 mb-1">For {data.companyName}</p>
                            <img src={signatureImage} alt="Signature" className="h-14 object-contain mb-1" />
                            <div className="border-t-2 border-slate-800 pt-2 w-52">
                                <p className="font-bold text-slate-800">{data.hrName}</p>
                                <p className="text-xs text-slate-600">{data.hrDesignation}</p>
                                <p className="text-xs text-slate-500">{data.companyName}</p>
                                <p className="text-xs text-slate-500">Date: {data.date}</p>
                            </div>
                        </div>
                        {showSeal && <CompanySeal companyName={data.companyName} size="lg" />}
                    </div>

                    {/* Candidate Acceptance */}
                    <div className="border-t-4 border-slate-800 pt-6 mt-6">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide border-l-4 border-green-600 pl-4 mb-4">Acceptance by Candidate</h3>
                        <p className="text-xs text-slate-700 mb-4">I have read, understood, and accept all terms and conditions mentioned in this offer letter including:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-6">
                            {[
                                'Position details and responsibilities',
                                'Compensation and benefits',
                                'Working hours and leave policy',
                                'Probation and notice period',
                                'Confidentiality & NDA',
                                'Non-Compete & Non-Solicitation',
                                'Intellectual Property Rights',
                                'Code of Conduct & policies',
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 bg-green-50 p-2 rounded border border-green-200">
                                    <div className="w-4 h-4 border-2 border-green-500 rounded"></div>
                                    <span className="text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-slate-700 mb-8">I confirm my acceptance and will join on the specified date with all required documents.</p>

                        <div className="flex justify-between items-end mt-6">
                            <div className="border-t-2 border-slate-800 pt-2 w-52">
                                <p className="font-bold text-slate-800">Candidate Signature</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 mb-1">Candidate Name:</p>
                                <p className="border-b-2 border-slate-400 pb-1 w-52 mb-4 font-semibold">{data.candidateName || '_________________________'}</p>
                                <p className="font-bold text-slate-800">Date: _______________</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer - stuck at bottom */}
                    <div className="mt-auto pt-4">
                        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 text-center text-white">
                            <p className="font-bold">{data.companyName}</p>
                            <p className="text-xs text-slate-300">{data.companyTagline}</p>
                            <p className="text-xs text-slate-400 mt-1">YouTube: @DigitalMarketingHeroes (2.5M+) | digitalheroes.co.in | Google & HubSpot Certified</p>
                            <p className="text-xs text-slate-500 mt-2">© {new Date().getFullYear()} All Rights Reserved | {data.companyAddress}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

OfferLetterTemplate.displayName = 'OfferLetterTemplate';
