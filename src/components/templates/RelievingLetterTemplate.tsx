import { forwardRef } from 'react';
import { RelievingLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface RelievingLetterTemplateProps {
    data: RelievingLetterData;
}

export const RelievingLetterTemplate = forwardRef<HTMLDivElement, RelievingLetterTemplateProps>(
    ({ data }, ref) => {
        // Get signatory image
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
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-rose-100 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                                    <p className="text-xl font-black text-white">RELIEVING</p>
                                    <p className="text-lg font-bold text-rose-100">LETTER</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Reference */}
                <div className="px-10 py-4 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600"><strong>Ref:</strong> {data.refNumber}</span>
                        <span className="text-slate-600"><strong>Date:</strong> {data.date}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 py-8 space-y-6">
                    {/* Employee Card */}
                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-200">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
                                <span className="text-2xl font-bold text-white">{data.employeeName?.charAt(0) || 'E'}</span>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-rose-800">{data.employeeName || '[Employee Name]'}</p>
                                <p className="text-sm text-slate-600">{data.designation} • {data.department}</p>
                                <p className="text-xs text-slate-400">ID: {data.employeeId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="text-slate-700 leading-loose space-y-4">
                        <p className="font-semibold text-lg text-rose-700">
                            Subject: Relieving Letter
                        </p>

                        <p>
                            This is to certify that <strong className="text-rose-700">{data.employeeName || '[Employee Name]'}</strong>
                            (Employee ID: <strong>{data.employeeId}</strong>) was employed with <strong>{data.companyName}</strong> as
                            a <strong>{data.designation}</strong> in the <strong>{data.department}</strong> department.
                        </p>

                        {/* Timeline */}
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-4">Employment Timeline</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Date of Joining', value: data.joiningDate || '[Joining Date]', color: 'green' },
                                    { label: 'Resignation Submitted', value: data.resignationDate || '[Resignation Date]', color: 'amber' },
                                    { label: 'Last Working Day', value: data.lastWorkingDate || '[Last Working Date]', color: 'rose' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-slate-500">{item.label}</p>
                                            <p className="font-semibold text-slate-800">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p>
                            They have been relieved from their duties with effect from <strong>{data.lastWorkingDate || '[Last Working Date]'}</strong>
                            after completing all necessary handover formalities and clearance procedures.
                        </p>

                        <p>
                            During their tenure with us, they performed their duties to our satisfaction and their conduct
                            was found to be satisfactory. All company assets and documents have been returned and all
                            dues have been settled.
                        </p>

                        <p>
                            We wish them all the best in their future endeavors.
                        </p>
                    </div>

                    {/* Clearance Badge */}
                    <div className="flex justify-center py-4">
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl px-8 py-4 border border-green-200 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">✓</span>
                            </div>
                            <div>
                                <p className="font-bold text-green-800">Full & Final Settlement Complete</p>
                                <p className="text-sm text-green-600">All dues cleared • Assets returned</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Signature Section - Centered */}
                <div className="px-10 py-10">
                    <p className="text-sm text-slate-500 mb-6">This letter is issued without prejudice.</p>
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-slate-500 mb-2">For {data.companyName}</p>
                        <img
                            src={signatureImage}
                            alt="Signature"
                            className="h-14 object-contain mb-2"
                        />
                        <div className="border-t border-slate-400 pt-2 w-56 text-center">
                            <p className="font-bold text-slate-800">{data.hrName}</p>
                            <p className="text-sm text-slate-600">{data.hrDesignation}</p>
                            <p className="text-xs text-slate-400 mt-1">{data.companyName}</p>
                        </div>
                        <div className="mt-4">
                            <CompanySeal companyName={data.companyName} size="md" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-rose-900 px-10 py-4 mt-auto">
                    <div className="flex justify-between items-center text-xs text-rose-200">
                        <p>© {new Date().getFullYear()} {data.companyName}. All Rights Reserved.</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

RelievingLetterTemplate.displayName = 'RelievingLetterTemplate';
