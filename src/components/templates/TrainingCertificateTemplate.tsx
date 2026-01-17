import { forwardRef, useMemo } from 'react';
import { TrainingCertificateData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, generateEmployeeId, DOC_TYPES } from '../../utils/refGenerator';

interface TrainingCertificateTemplateProps {
    data: TrainingCertificateData;
}

export const TrainingCertificateTemplate = forwardRef<HTMLDivElement, TrainingCertificateTemplateProps>(
    ({ data }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        const refNumber = useMemo(() => generateRefNumber(data.employeeName || '', DOC_TYPES.TRN), [data.employeeName]);
        const certificateCode = useMemo(() => generateRefNumber(data.employeeName || '', DOC_TYPES.TRN), [data.employeeName]);
        const employeeId = useMemo(() => generateEmployeeId(data.employeeName || ''), [data.employeeName]);

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none flex flex-col"
                style={{ width: '210mm', minHeight: '270mm', maxHeight: '270mm', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 px-6 py-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-black text-white">{data.companyName}</h1>
                            <p className="text-indigo-100 text-xs italic">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-3 py-1.5 text-center">
                            <p className="text-xs font-black text-white">TRAINING CERTIFICATE</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-6 py-1 bg-indigo-50 border-b border-indigo-100 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-6 py-3 flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-3">
                        <h2 className="text-lg font-black text-slate-800 uppercase">Certificate of Completion</h2>
                        <div className="w-20 h-0.5 bg-indigo-500 mx-auto mt-1 rounded-full"></div>
                    </div>

                    {/* Employee Card */}
                    <div className="bg-indigo-50 rounded-lg p-2 border border-indigo-200 flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div>
                            <p className="font-bold text-indigo-800">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-xs text-slate-600">{data.designation} • {data.department} • ID: {employeeId}</p>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <p className="text-slate-700 text-xs text-center mb-2">
                        This is to certify that the above-named employee has successfully completed:
                    </p>

                    {/* Training Program Card */}
                    <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 text-center mb-3">
                        <p className="text-lg font-black text-amber-800">{data.trainingProgram}</p>
                        <p className="text-amber-600 text-sm">Duration: {data.trainingDuration}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-slate-50 rounded p-2 border border-slate-200 text-center">
                            <p className="text-xs text-slate-500 font-semibold">Date</p>
                            <p className="font-bold text-slate-800 text-sm">{data.trainingDate || '—'}</p>
                        </div>
                        <div className="bg-green-50 rounded p-2 border border-green-200 text-center">
                            <p className="text-xs text-green-600 font-semibold">Status</p>
                            <p className="font-bold text-green-800 text-sm">{data.completionStatus}</p>
                        </div>
                        <div className="bg-blue-50 rounded p-2 border border-blue-200 text-center">
                            <p className="text-xs text-blue-600 font-semibold">Trainer</p>
                            <p className="font-bold text-blue-800 text-xs">{data.trainerName}</p>
                        </div>
                    </div>

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
                <div className="bg-indigo-900 px-6 py-1.5">
                    <div className="flex justify-between text-xs text-indigo-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-indigo-100">{certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

TrainingCertificateTemplate.displayName = 'TrainingCertificateTemplate';
