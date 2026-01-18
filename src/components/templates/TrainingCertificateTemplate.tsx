import { forwardRef, useMemo } from 'react';
import { TrainingCertificateData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, generateEmployeeId, DOC_TYPES } from '../../utils/refGenerator';

interface TrainingCertificateTemplateProps {
    data: TrainingCertificateData;
    showSeal?: boolean;
}

export const TrainingCertificateTemplate = forwardRef<HTMLDivElement, TrainingCertificateTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const refNumber = useMemo(() => generateRefNumber(data.employeeName || '', DOC_TYPES.TRN), [data.employeeName]);
        const employeeId = useMemo(() => generateEmployeeId(data.employeeName || ''), [data.employeeName]);

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none flex flex-col"
                style={{ width: '210mm', height: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 px-10 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-teal-100 text-sm">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                            <p className="text-base font-black text-white">TRAINING CERTIFICATE</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-10 py-2 bg-teal-50 border-b border-teal-200 flex justify-between text-sm">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="px-10 py-6 flex-1 flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wide">📜 Certificate of Training Completion</h2>
                        <div className="w-24 h-1 bg-teal-500 mx-auto mt-2 rounded-full"></div>
                    </div>

                    {/* Participant Card */}
                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-5 border border-teal-200 flex items-center gap-5 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div>
                            <p className="font-bold text-teal-800 text-xl">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-teal-600">{data.designation} • {data.department} • ID: {employeeId}</p>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <div className="text-slate-700 text-base leading-relaxed space-y-4 mb-6">
                        <p className="text-justify">
                            This is to certify that <strong className="text-teal-700">{data.employeeName || '[Employee Name]'}</strong> has
                            successfully completed the <strong>"{data.trainingProgram}"</strong> training program conducted
                            by <strong>{data.companyName}</strong>.
                        </p>
                    </div>

                    {/* Training Details Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-teal-50 rounded-lg p-4 text-center border border-teal-200">
                            <p className="text-sm text-teal-600 font-semibold">Duration</p>
                            <p className="font-bold text-teal-800 text-lg">{data.trainingDuration}</p>
                        </div>
                        <div className="bg-cyan-50 rounded-lg p-4 text-center border border-cyan-200">
                            <p className="text-sm text-cyan-600 font-semibold">Completion Date</p>
                            <p className="font-bold text-cyan-800 text-lg">{data.trainingDate || '—'}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                            <p className="text-sm text-blue-600 font-semibold">Trainer</p>
                            <p className="font-bold text-blue-800">{data.trainerName || '—'}</p>
                        </div>
                    </div>

                    {/* Skills & Performance */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
                            <h3 className="font-bold text-purple-800 mb-2">Training Program</h3>
                            <p className="text-slate-700">{data.trainingProgram}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                            <h3 className="font-bold text-green-800 mb-2">Status</h3>
                            <p className="text-2xl font-black text-green-600">{data.completionStatus || 'Completed'}</p>
                        </div>
                    </div>

                    <p className="text-slate-600 text-center">We commend their dedication and commitment to professional development.</p>

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
                <div className="bg-teal-900 px-10 py-3">
                    <div className="flex justify-between text-sm text-teal-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-xs">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

TrainingCertificateTemplate.displayName = 'TrainingCertificateTemplate';
