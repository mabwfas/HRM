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
                <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 px-12 py-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-black text-white">{data.companyName}</h1>
                            <p className="text-indigo-100 text-base italic mt-2">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 rounded-2xl px-6 py-4 text-center">
                            <p className="text-xl font-black text-white">TRAINING</p>
                            <p className="text-base font-bold text-indigo-100">CERTIFICATE</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-12 py-4 bg-indigo-50 border-b border-indigo-100 flex justify-between text-base">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-12 py-8 flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-wide">Certificate of Completion</h2>
                        <div className="w-40 h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Employee Card */}
                    <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-200 flex items-center gap-6 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-indigo-800">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-lg text-slate-600">{data.designation} • {data.department}</p>
                            <p className="text-base text-slate-400">ID: {employeeId}</p>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <p className="text-slate-700 text-lg text-center mb-6 leading-relaxed">
                        This is to certify that the above-named employee has successfully completed the training program:
                    </p>

                    {/* Training Program Card */}
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-200 text-center mb-6">
                        <p className="text-3xl font-black text-amber-800">{data.trainingProgram}</p>
                        <p className="text-amber-600 mt-3 text-xl">Duration: {data.trainingDuration}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-3 gap-5 mb-6">
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center">
                            <p className="text-sm text-slate-500 uppercase font-semibold">Training Date</p>
                            <p className="font-bold text-slate-800 text-xl mt-1">{data.trainingDate || '—'}</p>
                        </div>
                        <div className="bg-green-50 rounded-2xl p-5 border border-green-200 text-center">
                            <p className="text-sm text-green-600 uppercase font-semibold">Status</p>
                            <p className="font-bold text-green-800 text-xl mt-1">{data.completionStatus}</p>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200 text-center">
                            <p className="text-sm text-blue-600 uppercase font-semibold">Trainer</p>
                            <p className="font-bold text-blue-800 text-lg mt-1">{data.trainerName}</p>
                        </div>
                    </div>

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
                <div className="bg-indigo-900 px-12 py-4 mt-auto">
                    <div className="flex justify-between text-base text-indigo-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono font-bold text-indigo-100">Certificate No: {certificateCode}</p>
                    </div>
                </div>
            </div>
        );
    }
);

TrainingCertificateTemplate.displayName = 'TrainingCertificateTemplate';
