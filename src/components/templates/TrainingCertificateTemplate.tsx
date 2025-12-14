import { forwardRef } from 'react';
import { TrainingCertificateData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface TrainingCertificateTemplateProps {
    data: TrainingCertificateData;
}

export const TrainingCertificateTemplate = forwardRef<HTMLDivElement, TrainingCertificateTemplateProps>(
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
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-indigo-100 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                                    <p className="text-lg font-black text-white">TRAINING</p>
                                    <p className="text-base font-bold text-indigo-100">CERTIFICATE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Reference */}
                <div className="px-10 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600"><strong>Ref:</strong> {data.refNumber}</span>
                        <span className="text-slate-600"><strong>Date:</strong> {data.date}</span>
                    </div>
                </div>

                {/* Main Title */}
                <div className="px-10 py-8 text-center">
                    <div className="inline-block">
                        <h2 className="text-3xl font-black text-slate-800 tracking-wide">CERTIFICATE OF COMPLETION</h2>
                        <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mt-2"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 space-y-6">
                    {/* Employee Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <span className="text-2xl font-bold text-white">{data.employeeName?.charAt(0) || 'E'}</span>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-indigo-800">{data.employeeName || '[Employee Name]'}</p>
                                <p className="text-sm text-slate-600">{data.designation} • {data.department}</p>
                                <p className="text-xs text-slate-400">ID: {data.employeeId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Text */}
                    <div className="text-slate-700 leading-loose text-center">
                        <p className="text-lg">
                            This is to certify that the above-named employee has successfully completed the training program:
                        </p>
                    </div>

                    {/* Training Program Card */}
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-200 text-center">
                        <p className="text-2xl font-black text-amber-800">{data.trainingProgram}</p>
                        <p className="text-amber-600 mt-2">Duration: {data.trainingDuration}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <p className="text-xs text-slate-500 uppercase">Training Date</p>
                            <p className="font-bold text-slate-800">{data.trainingDate || '—'}</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                            <p className="text-xs text-green-600 uppercase">Status</p>
                            <p className="font-bold text-green-800">{data.completionStatus}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                        <p className="text-sm text-slate-500">Trainer / Conducted By</p>
                        <p className="font-bold text-slate-800">{data.trainerName}</p>
                    </div>
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
                <div className="bg-indigo-900 px-10 py-4 mt-auto">
                    <div className="flex justify-between items-center text-xs text-indigo-200">
                        <p>© {new Date().getFullYear()} {data.companyName}. All Rights Reserved.</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

TrainingCertificateTemplate.displayName = 'TrainingCertificateTemplate';
