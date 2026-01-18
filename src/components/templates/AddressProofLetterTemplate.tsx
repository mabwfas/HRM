import { forwardRef, useMemo } from 'react';
import { AddressProofLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, generateEmployeeId, DOC_TYPES } from '../../utils/refGenerator';

interface AddressProofLetterTemplateProps {
    data: AddressProofLetterData;
}

export const AddressProofLetterTemplate = forwardRef<HTMLDivElement, AddressProofLetterTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const refNumber = useMemo(() => generateRefNumber(data.employeeName || '', DOC_TYPES.ADR), [data.employeeName]);
        const employeeId = useMemo(() => generateEmployeeId(data.employeeName || ''), [data.employeeName]);

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none flex flex-col"
                style={{ width: '210mm', height: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 px-10 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-slate-300 text-sm">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                            <p className="text-base font-black text-white">ADDRESS PROOF LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-10 py-2 bg-slate-50 border-b border-slate-200 flex justify-between text-sm">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="px-10 py-6 flex-1 flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wide">To Whom It May Concern</h2>
                        <div className="w-24 h-1 bg-slate-500 mx-auto mt-2 rounded-full"></div>
                    </div>

                    {/* Employee Info */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex items-center gap-5 mb-6">
                        <div className="w-16 h-16 rounded-full bg-slate-500 flex items-center justify-center text-white text-2xl font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-xl">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-slate-600">{data.designation} • {data.department} • ID: {employeeId}</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="text-slate-700 text-base leading-relaxed space-y-4 mb-6">
                        <p className="text-justify">
                            This is to certify that <strong>{data.employeeName || '[Employee Name]'}</strong> (Employee ID: <strong>{employeeId}</strong>)
                            is employed with <strong>{data.companyName}</strong> as a <strong>{data.designation}</strong> in
                            the <strong>{data.department}</strong> department since <strong>{data.joiningDate || '[Joining Date]'}</strong>.
                        </p>
                    </div>

                    {/* Address Card */}
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
                        <h3 className="font-bold text-blue-800 text-lg mb-2">Residential Address (As per our records)</h3>
                        <p className="text-slate-700 text-base">{data.employeeAddress || '[Employee Address]'}</p>
                    </div>

                    {/* Purpose & Company Address */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
                            <p className="text-sm text-amber-600 font-semibold mb-1">Purpose of Certificate</p>
                            <p className="font-bold text-amber-800 text-lg">{data.purpose}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                            <p className="text-sm text-slate-500 font-semibold mb-1">Company Address</p>
                            <p className="text-slate-800">{data.companyAddress}</p>
                        </div>
                    </div>

                    <p className="text-base text-slate-600">This certificate is issued upon the request of the employee for the purpose mentioned above. For verification, please contact HR.</p>

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
                            <CompanySeal companyName={data.companyName} size="md" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-900 px-10 py-3">
                    <div className="flex justify-between text-sm text-slate-400">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-xs">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

AddressProofLetterTemplate.displayName = 'AddressProofLetterTemplate';
