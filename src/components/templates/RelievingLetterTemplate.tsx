import { forwardRef, useMemo } from 'react';
import { RelievingLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateEmployeeId, generateRefNumber, DOC_TYPES } from '../../utils/refGenerator';

interface RelievingLetterTemplateProps {
    data: RelievingLetterData;
    showSeal?: boolean;
}

// Helper function to build full role string with custom roles
const getFullRoleTitle = (designation: string, customRole1?: string, customRole2?: string): string => {
    const roles = [designation];
    if (customRole1?.trim()) roles.push(customRole1.trim());
    if (customRole2?.trim()) roles.push(customRole2.trim());
    return roles.join(' + ');
};

export const RelievingLetterTemplate = forwardRef<HTMLDivElement, RelievingLetterTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const employeeId = useMemo(() => generateEmployeeId(data.employeeName || ''), [data.employeeName]);
        const refNumber = useMemo(() => generateRefNumber(data.employeeName || '', DOC_TYPES.REL), [data.employeeName]);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const fullRoleTitle = getFullRoleTitle(data.designation, data.customRole1, data.customRole2);

        return (
            <div
                ref={ref}
                className="bg-white shadow-2xl print:shadow-none text-[11px] flex flex-col"
                style={{ minHeight: '297mm', maxHeight: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-700 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-rose-100 text-xs">{data.companyTagline}</p>
                        </div>
                        <div className="text-right bg-white/20 rounded-lg px-4 py-2">
                            <p className="text-lg font-bold text-white">RELIEVING</p>
                            <p className="text-rose-100">LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-8 py-2 bg-rose-50 border-b border-rose-100 flex justify-between text-xs">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                <div className="px-8 py-4">
                    {/* Employee Card */}
                    <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 mb-4 border border-rose-200 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white text-xl font-bold">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div>
                            <p className="text-lg font-bold text-rose-800">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-sm text-slate-600">{fullRoleTitle} • {data.department}</p>
                            <p className="text-xs text-slate-400">ID: {employeeId}</p>
                        </div>
                    </div>

                    {/* Subject */}
                    <p className="font-semibold text-rose-700 mb-3">Subject: Relieving Letter</p>

                    {/* Main Content */}
                    <div className="text-slate-700 leading-relaxed space-y-3">
                        <p>
                            This is to certify that <strong className="text-rose-700">{data.employeeName || '[Employee Name]'}</strong>
                            (Employee ID: <strong>{data.employeeId}</strong>) was employed with <strong>{data.companyName}</strong> as
                            a <strong>{fullRoleTitle}</strong> in the <strong>{data.department}</strong> department.
                        </p>

                        {/* Timeline */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-3 text-xs">Employment Timeline</h3>
                            <div className="space-y-2">
                                {[
                                    ['Date of Joining', data.joiningDate || '[Joining Date]', 'bg-green-500'],
                                    ['Resignation Submitted', data.resignationDate || '[Resignation Date]', 'bg-amber-500'],
                                    ['Last Working Day', data.lastWorkingDate || '[Last Working Date]', 'bg-rose-500'],
                                ].map(([label, value, color], i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${color}`}></div>
                                        <div className="flex-1 flex justify-between">
                                            <span className="text-slate-500 text-xs">{label}</span>
                                            <span className="font-semibold text-slate-800 text-xs">{value}</span>
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
                            was found to be satisfactory. All company assets and documents have been returned and all dues have been settled.
                        </p>

                        <p>We wish them all the best in their future endeavors.</p>
                    </div>

                    {/* Clearance Badge */}
                    <div className="flex justify-center my-4">
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg px-6 py-3 border border-green-200 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-lg">✓</div>
                            <div>
                                <p className="font-bold text-green-800 text-xs">Full & Final Settlement Complete</p>
                                <p className="text-[10px] text-green-600">All dues cleared • Assets returned</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Signature Section */}
                <div className="mt-auto px-8 pt-4">
                    <div className="flex justify-between items-end">
                        <div className="text-xs text-slate-500">
                            <p>This letter is issued without prejudice.</p>
                        </div>
                        {showSeal && <CompanySeal companyName={data.companyName} size="md" />}
                        <div className="text-right">
                            <p className="text-xs text-slate-500 mb-1">For {data.companyName}</p>
                            <img src={signatureImage} alt="Signature" className="h-10 object-contain mb-1 ml-auto" />
                            <div className="border-t border-slate-400 pt-1 w-48 text-center">
                                <p className="font-bold text-slate-800 text-xs">{data.hrName}</p>
                                <p className="text-[10px] text-slate-600">{data.hrDesignation}</p>
                                <p className="text-[10px] text-slate-400">{data.companyName}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-rose-900 px-8 py-2">
                    <div className="flex justify-between text-xs text-rose-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

RelievingLetterTemplate.displayName = 'RelievingLetterTemplate';
