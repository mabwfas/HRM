import { forwardRef } from 'react';
import { AddressProofLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface AddressProofLetterTemplateProps {
    data: AddressProofLetterData;
}

export const AddressProofLetterTemplate = forwardRef<HTMLDivElement, AddressProofLetterTemplateProps>(
    ({ data }, ref) => {
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
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-slate-300 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                                    <p className="text-xl font-black text-white">ADDRESS</p>
                                    <p className="text-lg font-bold text-slate-200">PROOF</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Reference */}
                <div className="px-10 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600"><strong>Ref:</strong> {data.refNumber}</span>
                        <span className="text-slate-600"><strong>Date:</strong> {data.date}</span>
                    </div>
                </div>

                {/* Main Title */}
                <div className="px-10 py-8 text-center">
                    <div className="inline-block">
                        <h2 className="text-3xl font-black text-slate-800 tracking-wide">TO WHOM IT MAY CONCERN</h2>
                        <div className="h-1 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full mt-2"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 space-y-6">
                    {/* Employee Card */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg">
                                <span className="text-2xl font-bold text-white">{data.employeeName?.charAt(0) || 'E'}</span>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-slate-800">{data.employeeName || '[Employee Name]'}</p>
                                <p className="text-sm text-slate-600">{data.designation} • {data.department}</p>
                                <p className="text-xs text-slate-400">ID: {data.employeeId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="text-slate-700 leading-loose space-y-4">
                        <p>
                            This is to certify that <strong className="text-slate-900">{data.employeeName || '[Employee Name]'}</strong> (Employee ID: <strong>{data.employeeId}</strong>) is employed with <strong>{data.companyName}</strong> as a <strong>{data.designation}</strong> in the <strong>{data.department}</strong> department since <strong>{data.joiningDate || '[Joining Date]'}</strong>.
                        </p>
                    </div>

                    {/* Address Card */}
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="font-bold text-blue-800 mb-3">🏠 Residential Address (As per records)</h3>
                        <p className="text-slate-700 text-lg">{data.employeeAddress || '[Employee Address]'}</p>
                    </div>

                    {/* Purpose Card */}
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                        <p className="text-sm text-amber-600 uppercase mb-1">Purpose of Letter</p>
                        <p className="font-bold text-amber-800">{data.purpose}</p>
                    </div>

                    {/* Company Details */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <p className="text-sm text-slate-500 uppercase mb-1">Company Address</p>
                        <p className="font-medium text-slate-800">{data.companyAddress}</p>
                    </div>

                    <p className="text-slate-700">
                        This certificate is issued upon the request of the employee for the purpose mentioned above.
                        For any verification, please contact the HR department.
                    </p>
                </div>

                {/* Signature Section */}
                <div className="px-10 py-10 mt-8">
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
                <div className="bg-slate-900 px-10 py-4 mt-auto">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                        <p>© {new Date().getFullYear()} {data.companyName}. All Rights Reserved.</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

AddressProofLetterTemplate.displayName = 'AddressProofLetterTemplate';
