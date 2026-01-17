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
                style={{ width: '210mm', height: '297mm', maxHeight: '297mm', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 px-10 py-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-black text-white">{data.companyName}</h1>
                            <p className="text-indigo-100 text-sm italic mt-1">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-xl px-5 py-3 text-center">
                            <p className="text-base font-black text-white">TRAINING</p>
                            <p className="text-sm font-bold text-indigo-100">CERTIFICATE</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-10 py-2 bg-indigo-50 border-b border-indigo-100 flex justify-between text-sm">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-10 py-5 flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-5">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wide">Certificate of Completion</h2>
                        <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mt-2 rounded-full"></div>
                    </div>

                    {/* Employee Card */}
                    <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200 flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div>
                            <p className="text-xl font-bold text-indigo-800">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-slate-600">{data.designation} • {data.department}</p>
                            <p className="text-sm text-slate-400">ID: {employeeId}</p>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <p className="text-slate-700 text-base text-center mb-4 leading-relaxed">
                        This is to certify that the above-named employee has successfully completed the training program:
                    </p>

                    {/* Training Program Card */}
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-5 border border-yellow-200 text-center mb-5">
                        <p className="text-2xl font-black text-amber-800">{data.trainingProgram}</p>
                        <p className="text-amber-600 mt-2 text-lg">Duration: {data.trainingDuration}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-5">
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center">
                            <p className="text-xs text-slate-500 uppercase font-semibold">Training Date</p>
                            <p className="font-bold text-slate-800 text-lg">{data.trainingDate || '—'}</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-3 border border-green-200 text-center">
                            <p className="text-xs text-green-600 uppercase font-semibold">Status</p>
                            <p className="font-bold text-green-800 text-lg">{data.completionStatus}</p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-3 border border-blue-200 text-center">
                            <p className="text-xs text-blue-600 uppercase font-semibold">Trainer</p>
                            <p className="font-bold text-blue-800">{data.trainerName}</p>
                        </div>
                    </div>

                    {/* Signature - Horizontal */}
                    <div className="mt-auto pt-4 border-t border-slate-200">
                        <div className="flex items-end justify-between">
                            <div className="text-center">
                                <p className="text-sm text-slate-500 mb-2">For {data.companyName}</p>
                                <img src={signatureImage} alt="Signature" className="h-12 object-contain mx-auto" />
                                <div className="border-t border-slate-400 pt-2 w-48">
                                    <p className="font-bold text-slate-800">{data.hrName}</p>
                                    <p className="text-sm text-slate-600">{data.hrDesignation}</p>
                                </div>
                            </div>
                            <CompanySeal companyName={data.companyName} size="md" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-indigo-900 px-10 py-3 mt-auto">
                    <div className="flex justify-between text-sm text-indigo-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono font-bold text-indigo-100">Certificate No: {certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

TrainingCertificateTemplate.displayName = 'TrainingCertificateTemplate';
