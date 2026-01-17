import { forwardRef, useMemo } from 'react';
import { JoiningLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateEmployeeId } from '../../utils/refGenerator';

interface JoiningLetterTemplateProps {
    data: JoiningLetterData;
}

export const JoiningLetterTemplate = forwardRef<HTMLDivElement, JoiningLetterTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const employeeId = useMemo(() => generateEmployeeId(data.employeeName || ''), [data.employeeName]);

        const formatCurrency = (amount: number): string => {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
            }).format(amount);
        };

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none"
                style={{ width: '210mm' }}
            >
                {/* Header */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-green-100 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                                    <p className="text-xl font-black text-white">JOINING</p>
                                    <p className="text-lg font-bold text-green-100">CONFIRMATION</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Reference */}
                <div className="px-10 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600"><strong>Ref:</strong> {data.refNumber}</span>
                        <span className="text-slate-600"><strong>Date:</strong> {data.date}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 py-8 space-y-6">
                    {/* Employee Card */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                                <span className="text-2xl font-bold text-white">{data.employeeName?.charAt(0) || 'E'}</span>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-green-800">{data.employeeName || '[Employee Name]'}</p>
                                <p className="text-sm text-slate-600">{data.designation} • {data.department}</p>
                                <p className="text-xs text-slate-400">ID: {employeeId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-center">
                        <p className="text-white text-2xl font-black">WELCOME TO THE TEAM!</p>
                        <p className="text-white/90 mt-1">Your joining has been confirmed</p>
                    </div>

                    {/* Main Content */}
                    <div className="text-slate-700 leading-relaxed">
                        <p>
                            We are pleased to confirm your joining at <strong>{data.companyName}</strong>.
                            Please find below the details of your employment:
                        </p>
                    </div>

                    {/* Employment Details Grid */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-4">Employment Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {[
                                { label: 'Employee ID', value: data.employeeId },
                                { label: 'Designation', value: data.designation },
                                { label: 'Department', value: data.department },
                                { label: 'Reporting To', value: data.reportingTo },
                                { label: 'Date of Joining', value: data.joiningDate || '—' },
                                { label: 'Work Location', value: data.location },
                                { label: 'Probation Period', value: data.probationPeriod },
                                { label: 'Annual CTC', value: formatCurrency(data.annualCtc) },
                            ].map((item, idx) => (
                                <div key={idx} className="flex justify-between py-2 px-3 bg-white rounded-lg">
                                    <span className="text-slate-500">{item.label}</span>
                                    <span className="font-semibold text-slate-800">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Company Address */}
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <p className="text-sm text-green-600 uppercase mb-1">Company Address</p>
                        <p className="font-medium text-slate-800">{data.companyAddress}</p>
                    </div>

                    <p className="text-slate-700">
                        We look forward to a long and mutually rewarding association.
                        Please reach out to HR for any queries or assistance during your onboarding.
                    </p>
                </div>

                {/* Signature Section */}
                <div className="px-10 py-10">
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

                {/* Footer */}
                <div className="bg-green-900 px-10 py-4 mt-auto">
                    <div className="flex justify-between items-center text-xs text-green-200">
                        <p>© {new Date().getFullYear()} {data.companyName}. All Rights Reserved.</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

JoiningLetterTemplate.displayName = 'JoiningLetterTemplate';
