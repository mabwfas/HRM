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
                style={{ minHeight: '297mm', maxHeight: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 px-5 py-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-lg font-black text-white">{data.companyName}</h1>
                            <p className="text-slate-300 text-[10px]">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded px-2 py-1 text-center">
                            <p className="text-[10px] font-black text-white">ADDRESS PROOF</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-5 py-0.5 bg-slate-50 border-b border-slate-200 flex justify-between text-[10px]">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content - ~60% */}
                <div className="px-5 py-2">
                    {/* Title */}
                    <div className="text-center mb-2">
                        <h2 className="text-base font-black text-slate-800 uppercase">To Whom It May Concern</h2>
                        <div className="w-16 h-0.5 bg-slate-500 mx-auto mt-1 rounded-full"></div>
                    </div>

                    {/* Employee Info */}
                    <div className="bg-slate-50 rounded p-1.5 border border-slate-200 flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-slate-500 flex items-center justify-center text-white text-xs font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-sm">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-[10px] text-slate-600">{data.designation} • {data.department} • ID: {employeeId}</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <p className="text-slate-700 text-[10px] mb-2 leading-relaxed">
                        This is to certify that <strong>{data.employeeName || '[Employee Name]'}</strong> (ID: <strong>{employeeId}</strong>) is employed with <strong>{data.companyName}</strong> as a <strong>{data.designation}</strong> in the <strong>{data.department}</strong> department since <strong>{data.joiningDate || '[Joining Date]'}</strong>.
                    </p>

                    {/* Address Card */}
                    <div className="bg-blue-50 rounded p-2 border border-blue-200 mb-2">
                        <h3 className="font-bold text-blue-800 text-[10px] mb-0.5">Residential Address (As per records)</h3>
                        <p className="text-slate-700 text-[10px]">{data.employeeAddress || '[Employee Address]'}</p>
                    </div>

                    {/* Purpose & Company Address */}
                    <div className="grid grid-cols-2 gap-1.5">
                        <div className="bg-amber-50 rounded p-1.5 border border-amber-200">
                            <p className="text-[9px] text-amber-600 font-semibold">Purpose</p>
                            <p className="font-bold text-amber-800 text-[10px]">{data.purpose}</p>
                        </div>
                        <div className="bg-slate-50 rounded p-1.5 border border-slate-200">
                            <p className="text-[9px] text-slate-500 font-semibold">Company Address</p>
                            <p className="text-[9px] text-slate-800">{data.companyAddress}</p>
                        </div>
                    </div>

                    <p className="text-[10px] text-slate-600 mt-1.5">This certificate is issued upon request. For verification, contact HR.</p>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Signature */}
                <div className="px-5 py-2 border-t border-slate-200">
                    <div className="flex items-end justify-between">
                        <div className="text-center">
                            <img src={signatureImage} alt="Signature" className="h-6 object-contain mx-auto" />
                            <div className="border-t border-slate-400 pt-0.5 w-24">
                                <p className="font-bold text-slate-800 text-[10px]">{data.hrName}</p>
                                <p className="text-[9px] text-slate-600">{data.hrDesignation}</p>
                            </div>
                        </div>
                        <CompanySeal companyName={data.companyName} size="sm" />
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-900 px-5 py-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-slate-300">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

AddressProofLetterTemplate.displayName = 'AddressProofLetterTemplate';
