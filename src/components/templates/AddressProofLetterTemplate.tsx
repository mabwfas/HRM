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
                style={{ width: '210mm', minHeight: '270mm', maxHeight: '270mm', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 px-6 py-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-black text-white">{data.companyName}</h1>
                            <p className="text-slate-300 text-xs">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-3 py-1.5 text-center">
                            <p className="text-xs font-black text-white">ADDRESS PROOF</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-6 py-1 bg-slate-50 border-b border-slate-200 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-6 py-3 flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-3">
                        <h2 className="text-lg font-black text-slate-800 uppercase">To Whom It May Concern</h2>
                        <div className="w-20 h-0.5 bg-slate-500 mx-auto mt-1 rounded-full"></div>
                    </div>

                    {/* Employee Info */}
                    <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-white text-sm font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-xs text-slate-600">{data.designation} • {data.department} • ID: {employeeId}</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <p className="text-slate-700 text-xs mb-3 leading-relaxed">
                        This is to certify that <strong>{data.employeeName || '[Employee Name]'}</strong> (ID: <strong>{employeeId}</strong>) is employed with <strong>{data.companyName}</strong> as a <strong>{data.designation}</strong> in the <strong>{data.department}</strong> department since <strong>{data.joiningDate || '[Joining Date]'}</strong>.
                    </p>

                    {/* Address Card */}
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mb-3">
                        <h3 className="font-bold text-blue-800 text-xs mb-1">Residential Address (As per records)</h3>
                        <p className="text-slate-700 text-sm">{data.employeeAddress || '[Employee Address]'}</p>
                    </div>

                    {/* Purpose & Company Address */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-amber-50 rounded p-2 border border-amber-200">
                            <p className="text-xs text-amber-600 font-semibold">Purpose</p>
                            <p className="font-bold text-amber-800 text-sm">{data.purpose}</p>
                        </div>
                        <div className="bg-slate-50 rounded p-2 border border-slate-200">
                            <p className="text-xs text-slate-500 font-semibold">Company Address</p>
                            <p className="text-xs text-slate-800">{data.companyAddress}</p>
                        </div>
                    </div>

                    <p className="text-xs text-slate-600 mb-2">This certificate is issued upon request. For verification, contact HR.</p>

                    {/* Signature */}
                    <div className="mt-auto pt-2 border-t border-slate-200 flex items-end justify-between">
                        <div className="text-center">
                            <img src={signatureImage} alt="Signature" className="h-8 object-contain mx-auto" />
                            <div className="border-t border-slate-400 pt-1 w-32">
                                <p className="font-bold text-slate-800 text-xs">{data.hrName}</p>
                                <p className="text-xs text-slate-600">{data.hrDesignation}</p>
                            </div>
                        </div>
                        <CompanySeal companyName={data.companyName} size="sm" />
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-900 px-6 py-1.5">
                    <div className="flex justify-between text-xs text-slate-400">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-slate-300">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

AddressProofLetterTemplate.displayName = 'AddressProofLetterTemplate';
