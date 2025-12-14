import { forwardRef } from 'react';
import { SalarySlipData, HR_SIGNATORY_OPTIONS } from '../../types';
import { CompanySeal } from '../ui/CompanySeal';

interface SalarySlipTemplateProps {
    data: SalarySlipData;
}

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

export const SalarySlipTemplate = forwardRef<HTMLDivElement, SalarySlipTemplateProps>(
    ({ data }, ref) => {
        const earnings = [
            { label: 'Basic Salary', amount: data.basicSalary },
            { label: 'House Rent Allowance', amount: data.hra },
            { label: 'Conveyance Allowance', amount: data.conveyanceAllowance },
            { label: 'Special Allowance', amount: data.specialAllowance },
            ...(data.bonus > 0 ? [{ label: 'Bonus / Incentive', amount: data.bonus }] : []),
        ];

        const deductions = [
            { label: 'Provident Fund (Employee)', amount: data.pfEmployee },
            { label: 'Professional Tax', amount: data.professionalTax },
            ...(data.tds > 0 ? [{ label: 'TDS (Income Tax)', amount: data.tds }] : []),
            ...(data.otherDeductions > 0 ? [{ label: 'Other Deductions', amount: data.otherDeductions }] : []),
        ];

        // Get signatory image
        const signatory = HR_SIGNATORY_OPTIONS.find(s => s.name === data.signatoryName);
        const signatureImage = signatory?.signatureImage || '/prasun_signature.png';

        return (
            <div
                ref={ref}
                className="bg-white shadow-2xl print:shadow-none"
                style={{ width: '210mm', minHeight: '297mm' }}
            >
                {/* Header */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative px-10 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">{data.companyName}</h1>
                                <p className="text-emerald-100 mt-1 text-sm italic">{data.companyTagline}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                                    <p className="text-2xl font-black text-white">PAYSLIP</p>
                                    <p className="text-emerald-100 text-sm mt-1">{data.month} {data.year}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Employee Details */}
                <div className="px-10 py-8 bg-gradient-to-b from-slate-50 to-white">
                    <div className="grid grid-cols-4 gap-6">
                        {[
                            { label: 'Employee Name', value: data.employeeName || '—', highlight: true },
                            { label: 'Employee ID', value: data.employeeId },
                            { label: 'Designation', value: data.designation },
                            { label: 'Department', value: data.department },
                            { label: 'PAN Number', value: data.panNumber || '—', mono: true },
                            { label: 'Bank Account', value: data.bankAccount || '—', mono: true },
                            { label: 'Paid Days', value: `${data.paidDays} / ${data.totalDays}`, color: 'emerald' },
                            { label: 'LOP Days', value: data.lopDays.toString(), color: data.lopDays > 0 ? 'red' : 'slate' },
                        ].map((item, idx) => (
                            <div key={idx} className="group">
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">{item.label}</p>
                                <p className={`font-semibold ${item.mono ? 'font-mono' : ''} ${item.color === 'emerald' ? 'text-emerald-600' :
                                    item.color === 'red' ? 'text-red-600' :
                                        item.highlight ? 'text-slate-900 text-lg' : 'text-slate-700'
                                    }`}>
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Earnings & Deductions */}
                <div className="px-10 py-8">
                    <div className="grid grid-cols-2 gap-10">
                        {/* Earnings */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                    <span className="text-2xl text-white font-bold">+</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">Earnings</h3>
                            </div>
                            <div className="space-y-3">
                                {earnings.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center py-3 border-b border-emerald-100 last:border-0">
                                        <span className="text-slate-600">{item.label}</span>
                                        <span className="font-mono font-bold text-slate-900">{formatCurrency(item.amount)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t-2 border-emerald-200">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-emerald-800 text-lg">Gross Earnings</span>
                                    <span className="font-mono font-black text-2xl text-emerald-600">{formatCurrency(data.grossEarnings)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Deductions */}
                        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                                    <span className="text-2xl text-white font-bold">−</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">Deductions</h3>
                            </div>
                            <div className="space-y-3">
                                {deductions.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center py-3 border-b border-red-100 last:border-0">
                                        <span className="text-slate-600">{item.label}</span>
                                        <span className="font-mono font-bold text-red-600">{formatCurrency(item.amount)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t-2 border-red-200">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-red-800 text-lg">Total Deductions</span>
                                    <span className="font-mono font-black text-2xl text-red-600">{formatCurrency(data.totalDeductions)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Net Pay */}
                <div className="mx-10 mb-8">
                    <div className="relative overflow-hidden rounded-3xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500 rounded-full blur-3xl"></div>
                        </div>
                        <div className="relative px-10 py-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-slate-400 text-sm mb-2 font-medium">Net Pay for {data.month} {data.year}</p>
                                    <p className="text-5xl font-black text-white tracking-tight">{formatCurrency(data.netPay)}</p>
                                    <p className="text-slate-400 text-sm mt-3 italic">{data.netPayInWords}</p>
                                </div>
                                <div className="text-right">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Annual CTC</p>
                                        <p className="text-3xl font-black text-emerald-400">{formatCurrency(data.annualCtc)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Signature Section */}
                <div className="px-10 py-6 border-t border-slate-100">
                    <div className="flex justify-between items-end">
                        <div className="text-xs text-slate-400">
                            <p>This is a computer-generated payslip.</p>
                            <p>No signature required.</p>
                        </div>
                        <div className="flex items-end gap-8">
                            {/* Company Seal */}
                            <CompanySeal companyName={data.companyName} size="sm" />
                            {/* Signatory */}
                            <div className="text-center">
                                <img
                                    src={signatureImage}
                                    alt="Signature"
                                    className="h-10 object-contain mb-1"
                                />
                                <div className="border-t border-slate-300 pt-1 w-40">
                                    <p className="font-bold text-slate-800 text-sm">{data.signatoryName}</p>
                                    <p className="text-xs text-slate-500">{data.signatoryDesignation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-900 px-10 py-4">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                        <p>© {new Date().getFullYear()} {data.companyName}. All Rights Reserved.</p>
                        <p>{data.companyTagline}</p>
                    </div>
                </div>
            </div>
        );
    }
);

SalarySlipTemplate.displayName = 'SalarySlipTemplate';
