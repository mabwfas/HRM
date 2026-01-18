import { forwardRef } from 'react';
import { JoiningLetterData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';
import { generateRefNumber, generateEmployeeId, DOC_TYPES } from '../../utils/refGenerator';

interface JoiningLetterTemplateProps {
    data: JoiningLetterData;
    showSeal?: boolean;
}

export const JoiningLetterTemplate = forwardRef<HTMLDivElement, JoiningLetterTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.hrName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const refNumber = generateRefNumber(data.employeeName || '', DOC_TYPES.JON);
        const employeeId = generateEmployeeId(data.employeeName || '');

        const formatCurrency = (amount: number): string => {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
        };

        return (
            <div
                ref={ref}
                data-print="document"
                className="bg-white shadow-2xl print:shadow-none flex flex-col"
                style={{ width: '210mm', height: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 px-10 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-green-100 text-sm">{data.companyTagline}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                            <p className="text-base font-black text-white">JOINING LETTER</p>
                        </div>
                    </div>
                </div>

                {/* Ref & Date */}
                <div className="px-10 py-2 bg-green-50 border-b border-green-200 flex justify-between text-sm">
                    <span><strong>Ref:</strong> {refNumber}</span>
                    <span><strong>Date:</strong> {data.date}</span>
                </div>

                {/* Main Content */}
                <div className="px-10 py-5 flex-1 flex flex-col">
                    {/* Employee Info */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 flex items-center gap-5 mb-5">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                            {data.employeeName?.charAt(0) || 'E'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-green-800 text-xl">{data.employeeName || '[Employee Name]'}</p>
                            <p className="text-green-600">{data.designation} • {data.department} • ID: {employeeId}</p>
                        </div>
                        <div className="bg-green-500 text-white px-4 py-1.5 rounded-full font-bold">
                            🎉 WELCOME ABOARD!
                        </div>
                    </div>

                    {/* Welcome Text */}
                    <div className="text-slate-700 text-base leading-relaxed space-y-3 mb-5">
                        <p>Dear <strong>{data.employeeName || '[Employee Name]'}</strong>,</p>
                        <p className="text-justify">
                            We are pleased to confirm your appointment as <strong>{data.designation}</strong> in
                            the <strong>{data.department}</strong> department at <strong>{data.companyName}</strong>,
                            effective from <strong>{data.joiningDate || '[Joining Date]'}</strong>.
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-5">
                        <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                            <p className="text-sm text-green-600 font-semibold">Joining Date</p>
                            <p className="font-bold text-green-800 text-lg">{data.joiningDate || '—'}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                            <p className="text-sm text-blue-600 font-semibold">Reporting To</p>
                            <p className="font-bold text-blue-800">{data.reportingTo || '—'}</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
                            <p className="text-sm text-purple-600 font-semibold">Probation Period</p>
                            <p className="font-bold text-purple-800">{data.probationPeriod || '—'}</p>
                        </div>
                    </div>

                    {/* CTC Card */}
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-5 text-white text-center mb-5">
                        <p className="text-sm opacity-80">Annual CTC</p>
                        <p className="text-3xl font-black">{formatCurrency(data.annualCtc || 0)}</p>
                    </div>

                    {/* Terms */}
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
                        <h3 className="font-bold text-slate-800 mb-2">Terms & Conditions</h3>
                        <ul className="text-sm text-slate-600 space-y-1">
                            <li>• You will be on probation for {data.probationPeriod || '6 months'}</li>
                            <li>• Location: {data.location || 'As assigned'}</li>
                        </ul>
                    </div>

                    <p className="text-slate-600">We look forward to your valuable contribution. Welcome to the team!</p>

                    {/* Spacer */}
                    <div className="flex-1"></div>

                    {/* Signature */}
                    <div className="pt-3 border-t border-slate-200 mt-3">
                        <div className="flex items-end justify-between">
                            <div>
                                <img src={signatureImage} alt="Signature" className="h-10 object-contain" />
                                <div className="border-t-2 border-slate-400 pt-1 mt-1 w-44">
                                    <p className="font-bold text-slate-800 text-sm">{data.hrName}</p>
                                    <p className="text-slate-600 text-xs">{data.hrDesignation}</p>
                                </div>
                            </div>
                            {showSeal && <CompanySeal companyName={data.companyName} size="sm" />}
                            <div>
                                <div className="h-10"></div>
                                <div className="border-t-2 border-slate-400 pt-1 mt-1 w-44">
                                    <p className="font-bold text-slate-800 text-sm">{data.employeeName || '______'}</p>
                                    <p className="text-slate-600 text-xs">Employee Acceptance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-green-900 px-10 py-3">
                    <div className="flex justify-between text-sm text-green-200">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p className="font-mono text-xs">{refNumber}</p>
                    </div>
                </div>
            </div>
        );
    }
);

JoiningLetterTemplate.displayName = 'JoiningLetterTemplate';
