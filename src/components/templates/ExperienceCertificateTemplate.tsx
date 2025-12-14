import { forwardRef } from 'react';
import { ExperienceCertificateData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface ExperienceCertificateTemplateProps {
    data: ExperienceCertificateData;
}

export const ExperienceCertificateTemplate = forwardRef<HTMLDivElement, ExperienceCertificateTemplateProps>(
    ({ data }, ref) => {
        const conductText = {
            exemplary: 'exemplary conduct and dedication',
            excellent: 'excellent conduct and professionalism',
            good: 'good conduct throughout their tenure',
            satisfactory: 'satisfactory conduct',
        }[data.conduct] || 'professional conduct';

        // Get signatory image
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none"
                style={{ width: '210mm', minHeight: '297mm' }}
            >
                {/* Header */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-amber-100 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                                    <p className="text-xl font-black text-white">EXPERIENCE</p>
                                    <p className="text-lg font-bold text-amber-100">CERTIFICATE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Reference */}
                <div className="px-10 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600"><strong>Ref:</strong> {data.refNumber}</span>
                        <span className="text-slate-600"><strong>Date:</strong> {data.date}</span>
                    </div>
                </div>

                {/* Main Title */}
                <div className="px-10 py-8 text-center">
                    <div className="inline-block">
                        <h2 className="text-3xl font-black text-slate-800 tracking-wide">TO WHOM IT MAY CONCERN</h2>
                        <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 space-y-6">
                    {/* Employee Card */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                                <span className="text-4xl font-bold text-white">{data.employeeName?.charAt(0) || 'E'}</span>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-amber-800">{data.employeeName || '[Employee Name]'}</p>
                                <p className="text-amber-600 font-medium">{data.designation}</p>
                                <p className="text-sm text-slate-500">{data.department} • ID: {data.employeeId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <div className="text-slate-700 leading-loose space-y-4 text-justify">
                        <p>
                            This is to certify that <strong className="text-amber-700">{data.employeeName || '[Employee Name]'}</strong> was
                            employed with <strong>{data.companyName}</strong> as a <strong>{data.designation}</strong> in
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

                        <p>
                            We wish them all the best in their future endeavors.
                        </p>
                    </div>

                    {/* Verification Badge */}
                    <div className="flex justify-center py-6">
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl px-8 py-4 border border-green-200 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">✓</span>
                            </div>
                            <div>
                                <p className="font-bold text-green-800">Verified & Authentic</p>
                                <p className="text-sm text-green-600">This certificate is officially issued by {data.companyName}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Signature Section - Centered */}
                <div className="px-10 py-10 mt-8">
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-slate-500 mb-2">For {data.companyName}</p>
                        <img
                            src={signatureImage}
                            alt="Signature"
                            className="h-14 object-contain mb-2"
                        />
                        <div className="border-t border-slate-400 pt-2 w-56 text-center">
                            <p className="font-bold text-slate-800">{data.hrName}</p>
                            <p className="text-sm text-slate-600">{data.hrDesignation}</p>
                            <p className="text-xs text-slate-400 mt-1">{data.companyName}</p>
                        </div>
                        <div className="mt-4">
                            <CompanySeal companyName={data.companyName} size="md" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-amber-900 px-10 py-4 mt-auto">
                    <div className="flex justify-between items-center text-xs text-amber-200">
                        <p>© {new Date().getFullYear()} {data.companyName}. All Rights Reserved.</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

ExperienceCertificateTemplate.displayName = 'ExperienceCertificateTemplate';
