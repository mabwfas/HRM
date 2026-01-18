import { forwardRef, useMemo } from 'react';
import { ExperienceCertificateData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, generateEmployeeId, DOC_TYPES } from '../../utils/refGenerator';

interface ExperienceCertificateTemplateProps {
    data: ExperienceCertificateData;
    showSeal?: boolean;
}

export const ExperienceCertificateTemplate = forwardRef<HTMLDivElement, ExperienceCertificateTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        const refNumber = useMemo(() =>
            generateRefNumber(data.employeeName || '', DOC_TYPES.EXP),
            [data.employeeName]
        );

        const employeeId = useMemo(() =>
            generateEmployeeId(data.employeeName || ''),
            [data.employeeName]
        );

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none flex flex-col"
                style={{ width: '210mm', height: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 px-10 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-amber-100 text-sm">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                            <p className="text-base font-black text-white">EXPERIENCE CERTIFICATE</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-10 py-2 bg-amber-50 border-b border-amber-200 flex justify-between text-sm">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="px-10 py-6 flex-1 flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wide">🏆 Experience Certificate</h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto mt-2 rounded-full"></div>
                    </div>

                    {/* Employee Info Card */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 flex items-center gap-5 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div>
                            <p className="font-bold text-amber-800 text-xl">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-amber-600">{data.designation} • {data.department} • ID: {employeeId}</p>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <div className="text-slate-700 text-base leading-relaxed space-y-4 mb-6">
                        <p className="text-justify">
                            This is to certify that <strong className="text-amber-700">{data.employeeName || '[Employee Name]'}</strong> (Employee ID: <strong>{employeeId}</strong>)
                            was employed with <strong>{data.companyName}</strong> as a <strong>{data.designation}</strong> in
                            the <strong>{data.department}</strong> department from <strong>{data.joiningDate || '[Joining Date]'}</strong> to{' '}
                            <strong>{data.relievingDate || '[Relieving Date]'}</strong>.
                        </p>

                        <p className="text-justify">
                            During their tenure with our organization, {data.employeeName?.split(' ')[0] || 'they'} demonstrated
                            excellent professional skills, dedication, and a strong work ethic. Their contributions were valuable
                            to our team and they consistently met performance expectations.
                        </p>

                        <p className="text-justify">
                            We found {data.employeeName?.split(' ')[0] || 'them'} to be sincere, hardworking, and technically sound.
                            They maintained good relationships with colleagues and showed initiative in taking on responsibilities.
                        </p>
                    </div>

                    {/* Employment Details */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                            <p className="text-sm text-green-600 font-semibold">Joined On</p>
                            <p className="font-bold text-green-800 text-lg">{data.joiningDate || '—'}</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4 text-center border border-amber-200">
                            <p className="text-sm text-amber-600 font-semibold">Designation</p>
                            <p className="font-bold text-amber-800">{data.designation || '—'}</p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
                            <p className="text-sm text-red-600 font-semibold">Last Working Day</p>
                            <p className="font-bold text-red-800 text-lg">{data.relievingDate || '—'}</p>
                        </div>
                    </div>

                    <p className="text-slate-600 text-base">We wish them all the best in their future endeavors.</p>

                    {/* Spacer */}
                    <div className="flex-1"></div>

                    {/* Signature */}
                    <div className="pt-4 border-t border-slate-200 mt-4">
                        <div className="flex items-end justify-between">
                            <div>
                                <img src={signatureImage} alt="Signature" className="h-12 object-contain" />
                                <div className="border-t-2 border-slate-400 pt-1 mt-1 w-48">
                                    <p className="font-bold text-slate-800">{data.hrName}</p>
                                    <p className="text-slate-600 text-sm">{data.hrDesignation}</p>
                                </div>
                            </div>
                            {showSeal && <CompanySeal companyName={data.companyName} size="md" />}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-amber-900 px-10 py-3">
                    <div className="flex justify-between text-sm text-amber-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-xs">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

ExperienceCertificateTemplate.displayName = 'ExperienceCertificateTemplate';
