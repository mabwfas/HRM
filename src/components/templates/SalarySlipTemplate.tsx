import { forwardRef } from 'react';
import { SalarySlipData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface SalarySlipTemplateProps {
    data: SalarySlipData;
    showSeal?: boolean;
}

// Helper function to build full role string with custom roles
const getFullRoleTitle = (designation: string, customRole1?: string, customRole2?: string): string => {
    const roles = [designation];
    if (customRole1?.trim()) roles.push(customRole1.trim());
    if (customRole2?.trim()) roles.push(customRole2.trim());
    return roles.join(' + ');
};

export const SalarySlipTemplate = forwardRef<HTMLDivElement, SalarySlipTemplateProps>(
    ({ data, showSeal = true }, ref) => {
        const earnings = [
            { label: 'Basic Salary', amount: data.basicSalary },
            { label: 'HRA', amount: data.hra },
            { label: 'Conveyance', amount: data.conveyanceAllowance },
            { label: 'Special Allowance', amount: data.specialAllowance },
            ...(data.bonus > 0 ? [{ label: 'Bonus', amount: data.bonus }] : []),
        ];

        const deductions = [
            { label: 'PF (Employee)', amount: data.pfEmployee },
            { label: 'Professional Tax', amount: data.professionalTax },
            ...(data.tds > 0 ? [{ label: 'TDS', amount: data.tds }] : []),
            ...(data.otherDeductions > 0 ? [{ label: 'Other', amount: data.otherDeductions }] : []),
        ];

        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.signatoryName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';
        const fullRoleTitle = getFullRoleTitle(data.designation, data.customRole1, data.customRole2);

        return (
            <div
                ref={ref}
                className="bg-white shadow-2xl print:shadow-none text-[11px] flex flex-col"
                style={{ minHeight: '297mm', maxHeight: '297mm' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-white">{data.companyName}</h1>
                            <p className="text-slate-400 text-xs">{data.companyTagline}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-emerald-400">PAYSLIP</p>
                            <p className="text-slate-300 text-sm">{data.month} {data.year}</p>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-4">
                    {/* Employee Info Grid */}
                    <div className="grid grid-cols-4 gap-3 mb-4 p-4 bg-slate-50 rounded-lg">
                        {[
                            ['Employee Name', data.employeeName || '—'],
                            ['Employee ID', data.employeeId],
                            ['Designation', fullRoleTitle],
                            ['Department', data.department],
                            ['PAN Number', data.panNumber || '—'],
                            ['Bank Account', data.bankAccount || '—'],
                            ['Paid Days', `${data.paidDays} / ${data.totalDays}`],
                            ['LOP Days', data.lopDays.toString()],
                        ].map(([label, value], i) => (
                            <div key={i}>
                                <p className="text-[10px] text-slate-500 uppercase">{label}</p>
                                <p className="font-semibold text-slate-800">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Earnings & Deductions */}
                    <div className="grid grid-cols-2 gap-6 mb-4">
                        {/* Earnings */}
                        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                            <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 bg-emerald-600 text-white rounded flex items-center justify-center text-sm">+</span>
                                Earnings
                            </h3>
                            <div className="space-y-2">
                                {earnings.map((item, i) => (
                                    <div key={i} className="flex justify-between">
                                        <span className="text-slate-600">{item.label}</span>
                                        <span className="font-mono font-semibold">₹{item.amount.toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                                <div className="border-t border-emerald-300 pt-2 flex justify-between font-bold text-emerald-800">
                                    <span>Gross Earnings</span>
                                    <span className="font-mono">₹{data.grossEarnings.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Deductions */}
                        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                            <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 bg-red-600 text-white rounded flex items-center justify-center text-sm">−</span>
                                Deductions
                            </h3>
                            <div className="space-y-2">
                                {deductions.map((item, i) => (
                                    <div key={i} className="flex justify-between">
                                        <span className="text-slate-600">{item.label}</span>
                                        <span className="font-mono font-semibold">₹{item.amount.toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                                <div className="border-t border-red-300 pt-2 flex justify-between font-bold text-red-800">
                                    <span>Total Deductions</span>
                                    <span className="font-mono">₹{data.totalDeductions.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Net Pay Hero */}
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white text-center mb-4">
                        <p className="text-sm opacity-80 uppercase tracking-wider">Net Pay for {data.month} {data.year}</p>
                        <p className="text-4xl font-black mt-1">₹{data.netPay.toLocaleString('en-IN')}</p>
                        <p className="text-sm opacity-70 mt-1 italic">{data.netPayInWords}</p>
                    </div>

                    {/* CTC Info */}
                    <div className="flex justify-between items-center bg-slate-100 rounded-lg p-3 mb-6">
                        <span className="text-slate-600">Annual CTC</span>
                        <span className="text-xl font-bold text-slate-800">₹{data.annualCtc.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Signature Section */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-end gap-6 justify-center">
                            {showSeal && <CompanySeal companyName={data.companyName} size="sm" />}
                            <div className="text-center">
                                <img src={signatureImage} alt="Signature" className="h-12 object-contain mb-1 mx-auto" />
                                <div className="border-t border-slate-300 pt-1 w-40 mx-auto">
                                    <p className="font-bold text-slate-800 text-xs">{data.signatoryName}</p>
                                    <p className="text-[10px] text-slate-500">{data.signatoryDesignation}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-3">This is a computer-generated payslip. No signature required.</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto bg-slate-800 px-8 py-3">
                    <div className="flex justify-between text-xs text-slate-400">
                        <p>© {new Date().getFullYear()} {data.companyName}</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

SalarySlipTemplate.displayName = 'SalarySlipTemplate';
