import { forwardRef, useMemo } from 'react';
import { ExperienceCertificateData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, generateEmployeeId, DOC_TYPES } from '../../utils/refGenerator';

interface ExperienceCertificateTemplateProps {
    data: ExperienceCertificateData;
    showSeal?: boolean;
}

// Helper function to build full role string with custom roles
const getFullRoleTitle = (designation: string, customRole1?: string, customRole2?: string): string => {
    const roles = [designation];
    if (customRole1?.trim()) roles.push(customRole1.trim());
    if (customRole2?.trim()) roles.push(customRole2.trim());
    return roles.join(' + ');
};

// Generate unique certificate code
const generateCertificateCode = (name: string): string => {
    const initials = (name || 'XX')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 3)
        .padEnd(2, 'X');
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `DMH/EXP/${year}/${initials}-${randomNum}`;
};

export const ExperienceCertificateTemplate = forwardRef<HTMLDivElement, ExperienceCertificateTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const conductText = {
            exemplary: 'exemplary conduct and dedication',
            excellent: 'excellent conduct and professionalism',
            good: 'good conduct throughout their tenure',
            satisfactory: 'satisfactory conduct',
        }[data.conduct] || 'professional conduct';

        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const fullRoleTitle = getFullRoleTitle(data.designation, data.customRole1, data.customRole2);

        const certificateCode = useMemo(() =>
            generateCertificateCode(data.employeeName || ''),
            [data.employeeName]
        );

        const refNumber = useMemo(() =>
            generateCertificateCode(data.employeeName || ''),
            [data.employeeName]
        );

        return (
            <div
                ref={ref}
                className="bg-white shadow-2xl print:shadow-none text-[11px] flex flex-col overflow-hidden"
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-amber-100 text-xs">{data.companyTagline}</p>
                        </div>
                        <div className="text-right bg-white/20 rounded-lg px-4 py-2">
                            <p className="text-lg font-bold text-white">EXPERIENCE</p>
                            <p className="text-amber-100">CERTIFICATE</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-8 py-2 bg-amber-50 border-b border-amber-100 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                <div className="px-8 py-4">
                    {/* Title */}
                    <div className="text-center mb-4">
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-wider">To Whom It May Concern</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-2 rounded-full"></div>
                    </div>

                    {/* Employee Card */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-4 border border-amber-200 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div>
                            <p className="text-lg font-bold text-amber-800">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-amber-600 text-sm">{fullRoleTitle}</p>
                            <p className="text-slate-500 text-xs">{data.department} • ID: {data.employeeId}</p>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <div className="text-slate-700 leading-relaxed space-y-3 text-justify">
                        <p>
                            This is to certify that <strong className="text-amber-700">{data.employeeName || '[Employee Name]'}</strong> was
                            employed with <strong>{data.companyName}</strong> as a <strong>{fullRoleTitle}</strong> in
                            the <strong>{data.department}</strong> department from <strong>{data.joiningDate || '[Joining Date]'}</strong> to
                            <strong> {data.relievingDate || '[Relieving Date]'}</strong>.
                        </p>

                        <p>
                            During their tenure with us, they demonstrated {conductText}. They were responsible for
                            <strong> {data.responsibilities}</strong>.
                        </p>

                        <p>
                            At the time of leaving, their annual compensation (CTC) was
                            <strong> ₹{data.lastDrawnSalary?.toLocaleString('en-IN') || '—'}</strong>.
                        </p>

                        <p>
                            We found them to be sincere, hardworking, and a valuable team member. Their performance was
                            consistently up to our expectations and they made significant contributions to the team's success.
                        </p>

                        <p>We wish them all the best in their future endeavors.</p>
                    </div>

                    {/* Verification Badge */}
                    <div className="flex justify-center my-4">
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg px-6 py-3 border border-green-200 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-lg">✓</div>
                            <div>
                                <p className="font-bold text-green-800 text-xs">Verified & Authentic</p>
                                <p className="text-[10px] text-green-600">Officially issued by {data.companyName}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Signature Section */}
                <div className="mt-auto px-8 pt-4">
                    <div className="flex justify-between items-end">
                        {showSeal && <CompanySeal companyName={data.companyName} size="md" />}
                        <div className="text-center">
                            <p className="text-xs text-slate-500 mb-1">For {data.companyName}</p>
                            <img src={signatureImage} alt="Signature" className="h-12 object-contain mb-1 mx-auto" />
                            <div className="border-t border-slate-400 pt-1 w-48 mx-auto">
                                <p className="font-bold text-slate-800 text-xs">{data.hrName}</p>
                                <p className="text-[10px] text-slate-600">{data.hrDesignation}</p>
                                <p className="text-[10px] text-slate-400">{data.companyName}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-amber-900 px-8 py-2">
                    <div className="flex justify-between text-xs text-amber-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono font-bold text-amber-100">Certificate No: {certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

ExperienceCertificateTemplate.displayName = 'ExperienceCertificateTemplate';
