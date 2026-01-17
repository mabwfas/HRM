import { forwardRef, useMemo } from 'react';
import { AddressProofLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, DOC_TYPES } from '../../utils/refGenerator';

interface AddressProofLetterTemplateProps {
    data: AddressProofLetterData;
}

export const AddressProofLetterTemplate = forwardRef<HTMLDivElement, AddressProofLetterTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const refNumber = useMemo(() => generateRefNumber(data.employeeName || '', DOC_TYPES.ADR), [data.employeeName]);

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none flex flex-col"
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 px-12 py-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-black text-white">{data.companyName}</h1>
                            <p className="text-slate-300 text-base mt-2">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-2xl px-6 py-4 text-center">
                            <p className="text-xl font-black text-white">ADDRESS</p>
                            <p className="text-base font-bold text-slate-200">PROOF</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-12 py-4 bg-slate-50 border-b border-slate-200 flex justify-between text-base">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-12 py-8 flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-wide">To Whom It May Concern</h2>
                        <div className="w-40 h-1.5 bg-gradient-to-r from-slate-500 to-slate-600 mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Employee Info */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex items-center gap-6 mb-8">
                        <div className="w-16 h-16 rounded-full bg-slate-500 flex items-center justify-center text-white text-3xl font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-2xl">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-lg text-slate-600">{data.designation} • {data.department}</p>
                            <p className="text-base text-slate-400">ID: {data.employeeId}</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <p className="text-slate-700 text-lg mb-8 leading-relaxed">
                        This is to certify that <strong>{data.employeeName || '[Employee Name]'}</strong> (Employee ID: <strong>{data.employeeId}</strong>) is employed with <strong>{data.companyName}</strong> as a <strong>{data.designation}</strong> in the <strong>{data.department}</strong> department since <strong>{data.joiningDate || '[Joining Date]'}</strong>.
                    </p>

                    {/* Address Card */}
                    <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200 mb-8">
                        <h3 className="font-bold text-blue-800 mb-4 text-xl">Residential Address (As per records)</h3>
                        <p className="text-slate-700 text-xl">{data.employeeAddress || '[Employee Address]'}</p>
                    </div>

                    {/* Purpose & Company Address */}
                    <div className="grid grid-cols-2 gap-5 mb-8">
                        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                            <p className="text-sm text-amber-600 uppercase font-semibold mb-2">Purpose</p>
                            <p className="font-bold text-amber-800 text-lg">{data.purpose}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                            <p className="text-sm text-slate-500 uppercase font-semibold mb-2">Company Address</p>
                            <p className="text-base text-slate-800">{data.companyAddress}</p>
                        </div>
                    </div>

                    <p className="text-slate-700 text-lg mb-6">
                        This certificate is issued upon the request of the employee for the purpose mentioned above.
                        For any verification, please contact the HR department.
                    </p>

                    {/* Signature - Horizontal */}
                    <div className="mt-auto pt-6 border-t border-slate-200">
                        <div className="flex items-end justify-between">
                            <div className="text-center">
                                <p className="text-base text-slate-500 mb-3">For {data.companyName}</p>
                                <img src={signatureImage} alt="Signature" className="h-14 object-contain mx-auto" />
                                <div className="border-t-2 border-slate-400 pt-3 w-56">
                                    <p className="font-bold text-slate-800 text-lg">{data.hrName}</p>
                                    <p className="text-base text-slate-600">{data.hrDesignation}</p>
                                </div>
                            </div>
                            <CompanySeal companyName={data.companyName} size="lg" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-900 px-12 py-4 mt-auto">
                    <div className="flex justify-between text-base text-slate-400">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono font-bold text-slate-300">Ref: {refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

AddressProofLetterTemplate.displayName = 'AddressProofLetterTemplate';
