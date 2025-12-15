import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Select, Card, TextArea, DatePicker, SignatureSelector } from './components/ui';
import { OfferLetterTemplate } from './components/templates/OfferLetterTemplate';
import { SalarySlipTemplate } from './components/templates/SalarySlipTemplate';
import { InternshipLetterTemplate } from './components/templates/InternshipLetterTemplate';
import { ExperienceCertificateTemplate } from './components/templates/ExperienceCertificateTemplate';
import { RelievingLetterTemplate } from './components/templates/RelievingLetterTemplate';
import { AppraisalLetterTemplate } from './components/templates/AppraisalLetterTemplate';
import { InternshipCompletionTemplate } from './components/templates/InternshipCompletionTemplate';
import { TrainingCertificateTemplate } from './components/templates/TrainingCertificateTemplate';
import { PromotionLetterTemplate } from './components/templates/PromotionLetterTemplate';
import { WarningLetterTemplate } from './components/templates/WarningLetterTemplate';
import { TerminationLetterTemplate } from './components/templates/TerminationLetterTemplate';
import { JoiningLetterTemplate } from './components/templates/JoiningLetterTemplate';
import { AddressProofLetterTemplate } from './components/templates/AddressProofLetterTemplate';
import {
    DocumentType,
    DOCUMENT_OPTIONS,
    OfferLetterData,
    SalarySlipData,
    InternshipLetterData,
    ExperienceCertificateData,
    RelievingLetterData,
    AppraisalLetterData,
    InternshipCompletionData,
    TrainingCertificateData,
    PromotionLetterData,
    WarningLetterData,
    TerminationLetterData,
    JoiningLetterData,
    AddressProofLetterData,
    initialOfferLetterData,
    initialSalarySlipData,
    initialInternshipLetterData,
    initialExperienceCertificateData,
    initialRelievingLetterData,
    initialAppraisalLetterData,
    initialInternshipCompletionData,
    initialTrainingCertificateData,
    initialPromotionLetterData,
    initialWarningLetterData,
    initialTerminationLetterData,
    initialJoiningLetterData,
    initialAddressProofLetterData,
    MONTHS,
    ROLE_PRESETS,
    DEPARTMENT_OPTIONS,
    LOCATION_OPTIONS,
    PROBATION_OPTIONS,
    NOTICE_PERIOD_OPTIONS,
    HR_SIGNATORY_OPTIONS,
    INTERNSHIP_ROLE_PRESETS,
    INTERNSHIP_DURATION_OPTIONS,
    WORKING_HOURS_OPTIONS,
    CONDUCT_OPTIONS,
    PERFORMANCE_RATING_OPTIONS,
} from './types';

// Number to words utility
const numberToWords = (num: number): string => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (num === 0) return 'Zero';

    const numToWords = (n: number): string => {
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
        if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + numToWords(n % 100) : '');
        if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
        if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + numToWords(n % 100000) : '');
        return numToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + numToWords(n % 10000000) : '');
    };

    return numToWords(num) + ' Rupees Only';
};

function App() {
    const [selectedDoc, setSelectedDoc] = useState<DocumentType>('offer-letter');
    const previewRef = useRef<HTMLDivElement>(null);
    const [showSeal, setShowSeal] = useState(true);

    // Dark Mode
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('hr_darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    // Full-screen Preview Mode
    const [fullscreenPreview, setFullscreenPreview] = useState(false);

    // Employee Database
    interface SavedEmployee {
        id: string;
        name: string;
        employeeId: string;
        designation: string;
        department: string;
        email?: string;
        phone?: string;
        address?: string;
        joiningDate?: string;
    }
    const [savedEmployees, setSavedEmployees] = useState<SavedEmployee[]>(() => {
        try {
            const saved = localStorage.getItem('hr_employees');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);

    // Persist dark mode
    useEffect(() => {
        localStorage.setItem('hr_darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Persist employees
    useEffect(() => {
        localStorage.setItem('hr_employees', JSON.stringify(savedEmployees));
    }, [savedEmployees]);

    // Load saved data from localStorage or use initial data
    const loadFromStorage = <T,>(key: string, initial: T): T => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initial;
        } catch {
            return initial;
        }
    };

    // All document data states - load from localStorage
    const [offerData, setOfferData] = useState<OfferLetterData>(() => loadFromStorage('hr_offerData', initialOfferLetterData));
    const [salaryData, setSalaryData] = useState<SalarySlipData>(() => loadFromStorage('hr_salaryData', initialSalarySlipData));
    const [internshipData, setInternshipData] = useState<InternshipLetterData>(() => loadFromStorage('hr_internshipData', initialInternshipLetterData));
    const [experienceData, setExperienceData] = useState<ExperienceCertificateData>(() => loadFromStorage('hr_experienceData', initialExperienceCertificateData));
    const [relievingData, setRelievingData] = useState<RelievingLetterData>(() => loadFromStorage('hr_relievingData', initialRelievingLetterData));
    const [appraisalData, setAppraisalData] = useState<AppraisalLetterData>(() => loadFromStorage('hr_appraisalData', initialAppraisalLetterData));
    const [internshipCompletionData, setInternshipCompletionData] = useState<InternshipCompletionData>(() => loadFromStorage('hr_internshipCompletionData', initialInternshipCompletionData));
    const [trainingCertificateData, setTrainingCertificateData] = useState<TrainingCertificateData>(() => loadFromStorage('hr_trainingCertificateData', initialTrainingCertificateData));
    const [promotionData, setPromotionData] = useState<PromotionLetterData>(() => loadFromStorage('hr_promotionData', initialPromotionLetterData));
    const [warningData, setWarningData] = useState<WarningLetterData>(() => loadFromStorage('hr_warningData', initialWarningLetterData));
    const [terminationData, setTerminationData] = useState<TerminationLetterData>(() => loadFromStorage('hr_terminationData', initialTerminationLetterData));
    const [joiningData, setJoiningData] = useState<JoiningLetterData>(() => loadFromStorage('hr_joiningData', initialJoiningLetterData));
    const [addressProofData, setAddressProofData] = useState<AddressProofLetterData>(() => loadFromStorage('hr_addressProofData', initialAddressProofLetterData));

    // Save data to localStorage whenever it changes
    useEffect(() => { localStorage.setItem('hr_offerData', JSON.stringify(offerData)); }, [offerData]);
    useEffect(() => { localStorage.setItem('hr_salaryData', JSON.stringify(salaryData)); }, [salaryData]);
    useEffect(() => { localStorage.setItem('hr_internshipData', JSON.stringify(internshipData)); }, [internshipData]);
    useEffect(() => { localStorage.setItem('hr_experienceData', JSON.stringify(experienceData)); }, [experienceData]);
    useEffect(() => { localStorage.setItem('hr_relievingData', JSON.stringify(relievingData)); }, [relievingData]);
    useEffect(() => { localStorage.setItem('hr_appraisalData', JSON.stringify(appraisalData)); }, [appraisalData]);
    useEffect(() => { localStorage.setItem('hr_internshipCompletionData', JSON.stringify(internshipCompletionData)); }, [internshipCompletionData]);
    useEffect(() => { localStorage.setItem('hr_trainingCertificateData', JSON.stringify(trainingCertificateData)); }, [trainingCertificateData]);
    useEffect(() => { localStorage.setItem('hr_promotionData', JSON.stringify(promotionData)); }, [promotionData]);
    useEffect(() => { localStorage.setItem('hr_warningData', JSON.stringify(warningData)); }, [warningData]);
    useEffect(() => { localStorage.setItem('hr_terminationData', JSON.stringify(terminationData)); }, [terminationData]);
    useEffect(() => { localStorage.setItem('hr_joiningData', JSON.stringify(joiningData)); }, [joiningData]);
    useEffect(() => { localStorage.setItem('hr_addressProofData', JSON.stringify(addressProofData)); }, [addressProofData]);

    // Handle role preset selection for Offer Letter
    const handleRolePresetChange = (designation: string) => {
        const preset = ROLE_PRESETS.find(r => r.designation === designation);
        if (preset) {
            setOfferData(prev => ({
                ...prev,
                designation: preset.designation,
                department: preset.department,
                reportingTo: preset.reportingTo,
                annualCtc: preset.annualCtc,
            }));
        }
    };

    // Handle internship role preset selection
    const handleInternshipRoleChange = (role: string) => {
        const preset = INTERNSHIP_ROLE_PRESETS.find(r => r.role === role);
        if (preset) {
            setInternshipData(prev => ({
                ...prev,
                internshipRole: preset.role,
                department: preset.department,
                stipend: preset.stipend,
                mentorDesignation: preset.mentorDesignation,
            }));
        }
    };

    // Handle HR signatory selection
    const handleHrSignatoryChange = (name: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
        const signatory = HR_SIGNATORY_OPTIONS.find(h => h.name === name);
        if (signatory) {
            setter((prev: any) => ({
                ...prev,
                hrName: signatory.name,
                hrDesignation: signatory.designation,
            }));
        }
    };

    // Salary slip calculation
    useEffect(() => {
        if (selectedDoc === 'salary-slip') {
            const monthlyGross = salaryData.annualCtc / 12;
            const basic = monthlyGross * 0.50;
            const hra = basic * 0.50;
            const conveyance = basic * 0.10;
            const special = monthlyGross - basic - hra - conveyance;
            const totalDays = 30;
            const paidDays = totalDays - (salaryData.lopDays || 0);
            const payoutFactor = paidDays / totalDays;

            const earnedBasic = Math.round(basic * payoutFactor);
            const earnedHra = Math.round(hra * payoutFactor);
            const earnedConveyance = Math.round(conveyance * payoutFactor);
            const earnedSpecial = Math.round(special * payoutFactor);
            const earnedBonus = salaryData.bonus || 0;
            const grossEarnings = earnedBasic + earnedHra + earnedConveyance + earnedSpecial + earnedBonus;

            const pf = salaryData.pfEmployee || 1800;
            const pt = salaryData.professionalTax || 200;
            const tds = salaryData.tds || 0;
            const other = salaryData.otherDeductions || 0;
            const totalDeductions = pf + pt + tds + other;
            const netPay = Math.round(grossEarnings - totalDeductions);

            setSalaryData(prev => ({
                ...prev,
                basicSalary: earnedBasic,
                hra: earnedHra,
                conveyanceAllowance: earnedConveyance,
                specialAllowance: earnedSpecial,
                paidDays,
                grossEarnings,
                totalDeductions,
                netPay,
                netPayInWords: numberToWords(netPay),
            }));
        }
    }, [salaryData.annualCtc, salaryData.lopDays, salaryData.pfEmployee, salaryData.professionalTax, salaryData.tds, salaryData.otherDeductions, salaryData.bonus, selectedDoc]);

    // Offer letter salary breakdown calculation
    useEffect(() => {
        if (selectedDoc === 'offer-letter') {
            const monthly = offerData.annualCtc / 12;
            const basic = Math.round(monthly * 0.50);
            const hra = Math.round(basic * 0.50);
            const conveyance = Math.round(basic * 0.10);
            const special = Math.round(monthly - basic - hra - conveyance - 1800);
            setOfferData(prev => ({
                ...prev,
                basicSalary: basic,
                hra,
                conveyanceAllowance: conveyance,
                specialAllowance: special,
                pfEmployer: 1800,
            }));
        }
    }, [offerData.annualCtc, selectedDoc]);

    // Appraisal increment calculation
    useEffect(() => {
        if (selectedDoc === 'appraisal-letter' && appraisalData.currentCtc > 0) {
            const increment = Math.round(((appraisalData.newCtc - appraisalData.currentCtc) / appraisalData.currentCtc) * 100);
            setAppraisalData(prev => ({ ...prev, incrementPercentage: increment }));
        }
    }, [appraisalData.currentCtc, appraisalData.newCtc, selectedDoc]);

    // Direct PDF download
    const handleDownloadPDF = () => {
        const element = document.getElementById('print-content');
        if (!element) {
            window.print();
            return;
        }

        const candidateName = selectedDoc === 'offer-letter' ? offerData.candidateName :
            selectedDoc === 'salary-slip' ? salaryData.employeeName :
                selectedDoc === 'internship-letter' ? internshipData.internName :
                    selectedDoc === 'experience-certificate' ? experienceData.employeeName :
                        selectedDoc === 'relieving-letter' ? relievingData.employeeName :
                            selectedDoc === 'appraisal-letter' ? appraisalData.employeeName :
                                selectedDoc === 'internship-completion' ? internshipCompletionData.internName :
                                    selectedDoc === 'training-certificate' ? trainingCertificateData.employeeName :
                                        selectedDoc === 'promotion-letter' ? promotionData.employeeName :
                                            selectedDoc === 'warning-letter' ? warningData.employeeName :
                                                selectedDoc === 'termination-letter' ? terminationData.employeeName :
                                                    selectedDoc === 'joining-letter' ? joiningData.employeeName :
                                                        selectedDoc === 'address-proof' ? addressProofData.employeeName :
                                                            'document';

        const filename = `digital-heroes-${selectedDoc}-${(candidateName || 'document').toLowerCase().replace(/\s+/g, '-')}.pdf`;

        const opt = {
            margin: 0,
            filename: filename,
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: 'css', before: '.page-break-before', after: '.page-break-after', avoid: '.no-break' }
        };

        // @ts-ignore - html2pdf is loaded from CDN
        if (typeof html2pdf !== 'undefined') {
            // @ts-ignore
            html2pdf().set(opt).from(element).save();
        } else {
            window.print();
        }
    };

    const currentDocOption = DOCUMENT_OPTIONS.find(d => d.id === selectedDoc);

    // Generic change handler
    const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        setter((prev: any) => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }));
    };

    // Mobile navigation state
    const [mobileView, setMobileView] = useState<'docs' | 'form' | 'preview'>('form');

    // Full-screen preview render
    if (fullscreenPreview) {
        return (
            <div className="fixed inset-0 bg-slate-900 z-50 overflow-auto">
                <div className="sticky top-0 bg-slate-800 p-4 flex justify-between items-center">
                    <h2 className="text-white font-bold">Preview Mode</h2>
                    <div className="flex gap-2">
                        <Button onClick={handleDownloadPDF} size="sm">📥 Download PDF</Button>
                        <Button onClick={() => setFullscreenPreview(false)} size="sm" className="bg-slate-600">✕ Close</Button>
                    </div>
                </div>
                <div className="flex justify-center p-6">
                    <div id="print-content">
                        {selectedDoc === 'offer-letter' && <OfferLetterTemplate ref={previewRef} data={offerData} showSeal={showSeal} />}
                        {selectedDoc === 'salary-slip' && <SalarySlipTemplate ref={previewRef} data={salaryData} />}
                        {selectedDoc === 'internship-letter' && <InternshipLetterTemplate ref={previewRef} data={internshipData} />}
                        {selectedDoc === 'experience-certificate' && <ExperienceCertificateTemplate ref={previewRef} data={experienceData} />}
                        {selectedDoc === 'relieving-letter' && <RelievingLetterTemplate ref={previewRef} data={relievingData} />}
                        {selectedDoc === 'appraisal-letter' && <AppraisalLetterTemplate ref={previewRef} data={appraisalData} />}
                        {selectedDoc === 'internship-completion' && <InternshipCompletionTemplate ref={previewRef} data={internshipCompletionData} />}
                        {selectedDoc === 'training-certificate' && <TrainingCertificateTemplate ref={previewRef} data={trainingCertificateData} />}
                        {selectedDoc === 'promotion-letter' && <PromotionLetterTemplate ref={previewRef} data={promotionData} />}
                        {selectedDoc === 'warning-letter' && <WarningLetterTemplate ref={previewRef} data={warningData} />}
                        {selectedDoc === 'termination-letter' && <TerminationLetterTemplate ref={previewRef} data={terminationData} />}
                        {selectedDoc === 'joining-letter' && <JoiningLetterTemplate ref={previewRef} data={joiningData} />}
                        {selectedDoc === 'address-proof' && <AddressProofLetterTemplate ref={previewRef} data={addressProofData} />}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col md:flex-row h-screen w-screen overflow-hidden font-sans ${darkMode ? 'dark bg-slate-900' : 'bg-slate-100'}`}>
            {/* Mobile Header - Only visible on mobile */}
            <div className="md:hidden bg-gradient-to-r from-slate-800 to-slate-900 p-4 flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-bold text-white">HR Docs Editor</h1>
                    <p className="text-xs text-slate-400">{currentDocOption?.icon} {currentDocOption?.label}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-slate-700 text-white">
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                    <Button onClick={handleDownloadPDF} size="sm">
                        📥 PDF
                    </Button>
                </div>
            </div>

            {/* Left Sidebar - Hidden on mobile, visible on md+ */}
            <div className="hidden md:flex w-72 min-w-[288px] bg-white border-r border-slate-200 flex-col print:hidden">
                {/* Header */}
                <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-slate-800 to-slate-900">
                    <h1 className="text-xl font-bold text-white">HR Docs Editor</h1>
                    <p className="text-sm text-slate-400 mt-1">Generate professional HR documents</p>
                </div>

                {/* Document Type Selector */}
                <div className="p-4 border-b border-slate-100">
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                        Document Type
                    </label>
                    <select
                        value={selectedDoc}
                        onChange={(e) => setSelectedDoc(e.target.value as DocumentType)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-800 font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                    >
                        {DOCUMENT_OPTIONS.map(opt => (
                            <option key={opt.id} value={opt.id}>
                                {opt.icon} {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Document Type Cards */}
                <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                    {DOCUMENT_OPTIONS.map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => setSelectedDoc(opt.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${selectedDoc === opt.id
                                ? 'bg-blue-50 border-2 border-blue-300 shadow-sm'
                                : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'
                                }`}
                        >
                            <span className="text-xl">{opt.icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className={`font-medium text-sm truncate ${selectedDoc === opt.id ? 'text-blue-700' : 'text-slate-700'}`}>
                                    {opt.label}
                                </p>
                                <p className="text-xs text-slate-500 truncate">{opt.description}</p>
                            </div>
                            {selectedDoc === opt.id && (
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Print and Options */}
                <div className="p-4 border-t border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setShowSeal(!showSeal)}
                            className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${showSeal
                                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                : 'bg-slate-100 text-slate-600 border border-slate-300'
                                }`}
                        >
                            {showSeal ? '⭕ Seal' : '⚪ Seal'}
                        </button>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${darkMode
                                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                                : 'bg-slate-100 text-slate-600 border border-slate-300'
                                }`}
                        >
                            {darkMode ? '☀️ Light' : '🌙 Dark'}
                        </button>
                    </div>
                    <button
                        onClick={() => setFullscreenPreview(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200 transition-all"
                    >
                        🔍 Fullscreen Preview
                    </button>
                    <button
                        onClick={() => setShowEmployeeModal(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-700 border border-green-300 hover:bg-green-200 transition-all"
                    >
                        👥 Employee Database
                    </button>
                    <Button onClick={handleDownloadPDF} className="w-full" size="lg">
                        📥 Download PDF
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Mobile Document Selector - Only on mobile when docs view selected */}
                <div className={`${mobileView === 'docs' ? 'flex' : 'hidden'} md:hidden flex-col bg-white overflow-y-auto flex-1`}>
                    <div className="p-4 border-b border-slate-100">
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                            Select Document Type
                        </label>
                        <div className="space-y-2">
                            {DOCUMENT_OPTIONS.map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => {
                                        setSelectedDoc(opt.id);
                                        setMobileView('form');
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${selectedDoc === opt.id
                                        ? 'bg-blue-50 border-2 border-blue-300 shadow-sm'
                                        : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'
                                        }`}
                                >
                                    <span className="text-2xl">{opt.icon}</span>
                                    <div className="flex-1">
                                        <p className={`font-medium ${selectedDoc === opt.id ? 'text-blue-700' : 'text-slate-700'}`}>
                                            {opt.label}
                                        </p>
                                        <p className="text-sm text-slate-500">{opt.description}</p>
                                    </div>
                                    {selectedDoc === opt.id && (
                                        <span className="text-blue-500">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Panel - Hidden on mobile unless form view, visible on md+ */}
                <div className={`${mobileView === 'form' ? 'flex' : 'hidden'} md:flex w-full md:w-96 md:min-w-[384px] bg-white dark:bg-slate-800 md:border-r border-slate-200 dark:border-slate-700 overflow-y-auto p-4 md:p-5 print:hidden flex-col flex-1 md:flex-initial`}>
                    <div className="mb-5">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <span className="text-2xl">{currentDocOption?.icon}</span>
                            {currentDocOption?.label}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Fill in the details below</p>
                    </div>

                    {/* Dynamic Form Based on Selection */}
                    <div className="space-y-4">
                        {/* ===== OFFER LETTER FORM ===== */}
                        {selectedDoc === 'offer-letter' && (
                            <>
                                <Card title="🎯 Quick Select Role" headerClassName="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                                    <Select
                                        label="Select Role (Auto-fills details)"
                                        name="rolePreset"
                                        value={offerData.designation}
                                        options={ROLE_PRESETS.map(r => ({ value: r.designation, label: `${r.designation} - ₹${(r.annualCtc / 100000).toFixed(1)}L` }))}
                                        onChange={(e) => handleRolePresetChange(e.target.value)}
                                    />
                                </Card>
                                <Card title="Company Details" headerClassName="bg-blue-50">
                                    <div className="space-y-3">
                                        <Input label="Company Name" name="companyName" value={offerData.companyName} onChange={handleChange(setOfferData)} />
                                        <Input label="Company Tagline" name="companyTagline" value={offerData.companyTagline} onChange={handleChange(setOfferData)} />
                                        <Input label="Company Address" name="companyAddress" value={offerData.companyAddress} onChange={handleChange(setOfferData)} />
                                        <div className="grid grid-cols-3 gap-2">
                                            <Input label="Ref Prefix" name="refPrefix" value={offerData.refPrefix} onChange={handleChange(setOfferData)} />
                                            <Input label="Year" name="refYear" value={offerData.refYear} onChange={handleChange(setOfferData)} />
                                            <Input label="Number" name="refNumber" value={offerData.refNumber} onChange={handleChange(setOfferData)} />
                                        </div>
                                        <DatePicker label="Date" name="date" value={offerData.date} onChange={handleChange(setOfferData)} />
                                    </div>
                                </Card>
                                <Card title="Candidate Details" headerClassName="bg-indigo-50">
                                    <div className="space-y-3">
                                        <Input label="Candidate Name" name="candidateName" value={offerData.candidateName} onChange={handleChange(setOfferData)} placeholder="Enter candidate's full name" />
                                        <Input label="Address" name="candidateAddress" value={offerData.candidateAddress} onChange={handleChange(setOfferData)} placeholder="City, State" />
                                    </div>
                                </Card>
                                <Card title="Position Details">
                                    <div className="space-y-3">
                                        <Select
                                            label="Designation"
                                            name="designation"
                                            value={offerData.designation}
                                            options={ROLE_PRESETS.map(r => ({ value: r.designation, label: r.designation }))}
                                            onChange={(e) => handleRolePresetChange(e.target.value)}
                                        />
                                        <Select
                                            label="Department"
                                            name="department"
                                            value={offerData.department}
                                            options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))}
                                            onChange={handleChange(setOfferData)}
                                        />
                                        <Input label="Reporting To" name="reportingTo" value={offerData.reportingTo} onChange={handleChange(setOfferData)} />
                                        <Select
                                            label="Location"
                                            name="location"
                                            value={offerData.location}
                                            options={LOCATION_OPTIONS.map(l => ({ value: l, label: l }))}
                                            onChange={handleChange(setOfferData)}
                                        />
                                        <Input label="Joining Date" name="joiningDate" type="date" value={offerData.joiningDate} onChange={handleChange(setOfferData)} />
                                    </div>
                                </Card>
                                <Card title="Compensation" headerClassName="bg-green-50">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input
                                                label="Monthly CTC (₹)"
                                                name="monthlyCtc"
                                                type="number"
                                                value={Math.round(offerData.annualCtc / 12)}
                                                onChange={(e) => {
                                                    const monthly = parseFloat(e.target.value) || 0;
                                                    setOfferData(prev => ({ ...prev, annualCtc: monthly * 12 }));
                                                }}
                                            />
                                            <Input label="Annual CTC (₹)" name="annualCtc" type="number" value={offerData.annualCtc} onChange={handleChange(setOfferData)} />
                                        </div>
                                        <Select
                                            label="Probation Period"
                                            name="probationPeriod"
                                            value={offerData.probationPeriod}
                                            options={PROBATION_OPTIONS.map(p => ({ value: p, label: p }))}
                                            onChange={handleChange(setOfferData)}
                                        />
                                        <Select
                                            label="Notice Period"
                                            name="noticePeriod"
                                            value={offerData.noticePeriod}
                                            options={NOTICE_PERIOD_OPTIONS.map(n => ({ value: n, label: n }))}
                                            onChange={handleChange(setOfferData)}
                                        />
                                    </div>
                                </Card>
                                <Card title="HR Signatory">
                                    <Select
                                        label="HR Signatory"
                                        name="hrName"
                                        value={offerData.hrName}
                                        options={HR_SIGNATORY_OPTIONS.map(h => ({ value: h.name, label: `${h.name} - ${h.designation}` }))}
                                        onChange={(e) => handleHrSignatoryChange(e.target.value, setOfferData)}
                                    />
                                    <div className="mt-4">
                                        <SignatureSelector
                                            name="customSignature"
                                            label="Custom Signature (Optional)"
                                            value={offerData.hrSignature || ''}
                                            onChange={(sig) => setOfferData(prev => ({ ...prev, hrSignature: sig }))}
                                        />
                                    </div>
                                </Card>
                            </>
                        )}

                        {/* ===== SALARY SLIP FORM ===== */}
                        {selectedDoc === 'salary-slip' && (
                            <>
                                <Card title="🎯 Quick Select Role" headerClassName="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                                    <Select
                                        label="Select Role (Auto-fills CTC)"
                                        name="rolePreset"
                                        value={salaryData.designation}
                                        options={ROLE_PRESETS.map(r => ({ value: r.designation, label: `${r.designation} - ₹${(r.annualCtc / 100000).toFixed(1)}L` }))}
                                        onChange={(e) => {
                                            const preset = ROLE_PRESETS.find(r => r.designation === e.target.value);
                                            if (preset) {
                                                setSalaryData(prev => ({
                                                    ...prev,
                                                    designation: preset.designation,
                                                    department: preset.department,
                                                    annualCtc: preset.annualCtc,
                                                }));
                                            }
                                        }}
                                    />
                                </Card>
                                <Card title="Employee Details" headerClassName="bg-teal-50">
                                    <div className="space-y-3">
                                        <Input label="Employee Name" name="employeeName" value={salaryData.employeeName} onChange={handleChange(setSalaryData)} placeholder="Enter employee name" />
                                        <Input label="Employee ID" name="employeeId" value={salaryData.employeeId} onChange={handleChange(setSalaryData)} />
                                        <Select
                                            label="Designation"
                                            name="designation"
                                            value={salaryData.designation}
                                            options={ROLE_PRESETS.map(r => ({ value: r.designation, label: r.designation }))}
                                            onChange={handleChange(setSalaryData)}
                                        />
                                        <Select
                                            label="Department"
                                            name="department"
                                            value={salaryData.department}
                                            options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))}
                                            onChange={handleChange(setSalaryData)}
                                        />
                                        <Input label="PAN Number" name="panNumber" value={salaryData.panNumber} onChange={handleChange(setSalaryData)} placeholder="XXXXX0000X" />
                                        <Input label="Bank Account" name="bankAccount" value={salaryData.bankAccount} onChange={handleChange(setSalaryData)} placeholder="Account number" />
                                    </div>
                                </Card>
                                <Card title="Period & Attendance">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-2">
                                            <Select label="Month" name="month" value={salaryData.month} options={MONTHS.map(m => ({ value: m, label: m }))} onChange={handleChange(setSalaryData)} />
                                            <Input label="Year" name="year" value={salaryData.year} onChange={handleChange(setSalaryData)} />
                                        </div>
                                        <Input label="LOP Days (Absent)" name="lopDays" type="number" value={salaryData.lopDays} onChange={handleChange(setSalaryData)} />
                                    </div>
                                </Card>
                                <Card title="Earnings" headerClassName="bg-green-50">
                                    <div className="space-y-3">
                                        <Input label="Annual CTC (₹)" name="annualCtc" type="number" value={salaryData.annualCtc} onChange={handleChange(setSalaryData)} />
                                        <Input label="Bonus / Incentive" name="bonus" type="number" value={salaryData.bonus} onChange={handleChange(setSalaryData)} />
                                    </div>
                                </Card>
                                <Card title="Deductions" headerClassName="bg-red-50">
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input label="PF (Employee)" name="pfEmployee" type="number" value={salaryData.pfEmployee} onChange={handleChange(setSalaryData)} />
                                        <Input label="Professional Tax" name="professionalTax" type="number" value={salaryData.professionalTax} onChange={handleChange(setSalaryData)} />
                                        <Input label="TDS" name="tds" type="number" value={salaryData.tds} onChange={handleChange(setSalaryData)} />
                                        <Input label="Other Deductions" name="otherDeductions" type="number" value={salaryData.otherDeductions} onChange={handleChange(setSalaryData)} />
                                    </div>
                                </Card>
                            </>
                        )}

                        {/* ===== INTERNSHIP LETTER FORM ===== */}
                        {selectedDoc === 'internship-letter' && (
                            <>
                                <Card title="🎯 Quick Select Role" headerClassName="bg-gradient-to-r from-purple-500 to-violet-500 text-white">
                                    <Select
                                        label="Select Internship Role (Auto-fills details)"
                                        name="rolePreset"
                                        value={internshipData.internshipRole}
                                        options={INTERNSHIP_ROLE_PRESETS.map(r => ({ value: r.role, label: `${r.role} - ₹${r.stipend}/mo` }))}
                                        onChange={(e) => handleInternshipRoleChange(e.target.value)}
                                    />
                                </Card>
                                <Card title="Intern Details" headerClassName="bg-violet-50">
                                    <div className="space-y-3">
                                        <Input label="Intern Name" name="internName" value={internshipData.internName} onChange={handleChange(setInternshipData)} placeholder="Enter intern's full name" />
                                        <Input label="Address" name="internAddress" value={internshipData.internAddress} onChange={handleChange(setInternshipData)} placeholder="City, State" />
                                        <Input label="College/University" name="collegeName" value={internshipData.collegeName} onChange={handleChange(setInternshipData)} placeholder="Enter college name" />
                                        <Input label="Course" name="course" value={internshipData.course} onChange={handleChange(setInternshipData)} placeholder="B.Tech, BCA, MBA, etc." />
                                    </div>
                                </Card>
                                <Card title="Internship Details">
                                    <div className="space-y-3">
                                        <Select
                                            label="Internship Role"
                                            name="internshipRole"
                                            value={internshipData.internshipRole}
                                            options={INTERNSHIP_ROLE_PRESETS.map(r => ({ value: r.role, label: r.role }))}
                                            onChange={(e) => handleInternshipRoleChange(e.target.value)}
                                        />
                                        <Select
                                            label="Department"
                                            name="department"
                                            value={internshipData.department}
                                            options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))}
                                            onChange={handleChange(setInternshipData)}
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input label="Start Date" name="startDate" type="date" value={internshipData.startDate} onChange={handleChange(setInternshipData)} />
                                            <Input label="End Date" name="endDate" type="date" value={internshipData.endDate} onChange={handleChange(setInternshipData)} />
                                        </div>
                                        <Select
                                            label="Duration"
                                            name="duration"
                                            value={internshipData.duration}
                                            options={INTERNSHIP_DURATION_OPTIONS.map(d => ({ value: d, label: d }))}
                                            onChange={handleChange(setInternshipData)}
                                        />
                                        <Input label="Stipend (₹/month)" name="stipend" type="number" value={internshipData.stipend} onChange={handleChange(setInternshipData)} />
                                        <Select
                                            label="Working Hours"
                                            name="workingHours"
                                            value={internshipData.workingHours}
                                            options={WORKING_HOURS_OPTIONS.map(w => ({ value: w, label: w }))}
                                            onChange={handleChange(setInternshipData)}
                                        />
                                    </div>
                                </Card>
                                <Card title="Mentor & HR">
                                    <div className="space-y-3">
                                        <Input label="Mentor Name" name="mentorName" value={internshipData.mentorName} onChange={handleChange(setInternshipData)} placeholder="Assigned mentor name" />
                                        <Input label="Mentor Designation" name="mentorDesignation" value={internshipData.mentorDesignation} onChange={handleChange(setInternshipData)} />
                                        <Select
                                            label="HR Signatory"
                                            name="hrName"
                                            value={internshipData.hrName}
                                            options={HR_SIGNATORY_OPTIONS.map(h => ({ value: h.name, label: `${h.name} - ${h.designation}` }))}
                                            onChange={(e) => handleHrSignatoryChange(e.target.value, setInternshipData)}
                                        />
                                    </div>
                                </Card>
                            </>
                        )}

                        {/* ===== EXPERIENCE CERTIFICATE FORM ===== */}
                        {selectedDoc === 'experience-certificate' && (
                            <>
                                <Card title="🎯 Quick Select Role" headerClassName="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                                    <Select
                                        label="Select Role"
                                        name="designation"
                                        value={experienceData.designation}
                                        options={ROLE_PRESETS.map(r => ({ value: r.designation, label: `${r.designation} - ₹${(r.annualCtc / 100000).toFixed(1)}L` }))}
                                        onChange={(e) => {
                                            const preset = ROLE_PRESETS.find(r => r.designation === e.target.value);
                                            if (preset) {
                                                setExperienceData(prev => ({
                                                    ...prev,
                                                    designation: preset.designation,
                                                    department: preset.department,
                                                    lastDrawnSalary: preset.annualCtc,
                                                }));
                                            }
                                        }}
                                    />
                                </Card>
                                <Card title="Employee Details" headerClassName="bg-orange-50">
                                    <div className="space-y-3">
                                        <Input label="Employee Name" name="employeeName" value={experienceData.employeeName} onChange={handleChange(setExperienceData)} placeholder="Enter employee name" />
                                        <Input label="Employee ID" name="employeeId" value={experienceData.employeeId} onChange={handleChange(setExperienceData)} />
                                        <Select
                                            label="Designation"
                                            name="designation"
                                            value={experienceData.designation}
                                            options={ROLE_PRESETS.map(r => ({ value: r.designation, label: r.designation }))}
                                            onChange={handleChange(setExperienceData)}
                                        />
                                        <Select
                                            label="Department"
                                            name="department"
                                            value={experienceData.department}
                                            options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))}
                                            onChange={handleChange(setExperienceData)}
                                        />
                                    </div>
                                </Card>
                                <Card title="Employment Period">
                                    <div className="space-y-3">
                                        <Input label="Joining Date" name="joiningDate" value={experienceData.joiningDate} onChange={handleChange(setExperienceData)} placeholder="e.g., 15th March 2020" />
                                        <Input label="Relieving Date" name="relievingDate" value={experienceData.relievingDate} onChange={handleChange(setExperienceData)} placeholder="e.g., 14th December 2024" />
                                        <Input label="Last Drawn CTC (₹)" name="lastDrawnSalary" type="number" value={experienceData.lastDrawnSalary} onChange={handleChange(setExperienceData)} />
                                    </div>
                                </Card>
                                <Card title="Performance">
                                    <div className="space-y-3">
                                        <TextArea label="Key Responsibilities" name="responsibilities" value={experienceData.responsibilities} onChange={handleChange(setExperienceData)} rows={3} />
                                        <Select
                                            label="Conduct"
                                            name="conduct"
                                            value={experienceData.conduct}
                                            options={CONDUCT_OPTIONS}
                                            onChange={handleChange(setExperienceData)}
                                        />
                                    </div>
                                </Card>
                                <Card title="HR Signatory">
                                    <Select
                                        label="HR Signatory"
                                        name="hrName"
                                        value={experienceData.hrName}
                                        options={HR_SIGNATORY_OPTIONS.map(h => ({ value: h.name, label: `${h.name} - ${h.designation}` }))}
                                        onChange={(e) => handleHrSignatoryChange(e.target.value, setExperienceData)}
                                    />
                                </Card>
                            </>
                        )}

                        {/* ===== RELIEVING LETTER FORM ===== */}
                        {selectedDoc === 'relieving-letter' && (
                            <>
                                <Card title="🎯 Quick Select Role" headerClassName="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                                    <Select
                                        label="Select Role"
                                        name="designation"
                                        value={relievingData.designation}
                                        options={ROLE_PRESETS.map(r => ({ value: r.designation, label: r.designation }))}
                                        onChange={(e) => {
                                            const preset = ROLE_PRESETS.find(r => r.designation === e.target.value);
                                            if (preset) {
                                                setRelievingData(prev => ({
                                                    ...prev,
                                                    designation: preset.designation,
                                                    department: preset.department,
                                                }));
                                            }
                                        }}
                                    />
                                </Card>
                                <Card title="Employee Details" headerClassName="bg-pink-50">
                                    <div className="space-y-3">
                                        <Input label="Employee Name" name="employeeName" value={relievingData.employeeName} onChange={handleChange(setRelievingData)} placeholder="Enter employee name" />
                                        <Input label="Employee ID" name="employeeId" value={relievingData.employeeId} onChange={handleChange(setRelievingData)} />
                                        <Select
                                            label="Designation"
                                            name="designation"
                                            value={relievingData.designation}
                                            options={ROLE_PRESETS.map(r => ({ value: r.designation, label: r.designation }))}
                                            onChange={handleChange(setRelievingData)}
                                        />
                                        <Select
                                            label="Department"
                                            name="department"
                                            value={relievingData.department}
                                            options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))}
                                            onChange={handleChange(setRelievingData)}
                                        />
                                    </div>
                                </Card>
                                <Card title="Important Dates">
                                    <div className="space-y-3">
                                        <Input label="Date of Joining" name="joiningDate" value={relievingData.joiningDate} onChange={handleChange(setRelievingData)} placeholder="e.g., 15th March 2020" />
                                        <Input label="Resignation Date" name="resignationDate" value={relievingData.resignationDate} onChange={handleChange(setRelievingData)} placeholder="e.g., 14th November 2024" />
                                        <Input label="Last Working Date" name="lastWorkingDate" value={relievingData.lastWorkingDate} onChange={handleChange(setRelievingData)} placeholder="e.g., 14th December 2024" />
                                    </div>
                                </Card>
                                <Card title="HR Signatory">
                                    <Select
                                        label="HR Signatory"
                                        name="hrName"
                                        value={relievingData.hrName}
                                        options={HR_SIGNATORY_OPTIONS.map(h => ({ value: h.name, label: `${h.name} - ${h.designation}` }))}
                                        onChange={(e) => handleHrSignatoryChange(e.target.value, setRelievingData)}
                                    />
                                </Card>
                            </>
                        )}

                        {/* ===== APPRAISAL LETTER FORM ===== */}
                        {selectedDoc === 'appraisal-letter' && (
                            <>
                                <Card title="Employee Details" headerClassName="bg-teal-50">
                                    <div className="space-y-3">
                                        <Input label="Employee Name" name="employeeName" value={appraisalData.employeeName} onChange={handleChange(setAppraisalData)} placeholder="Enter employee name" />
                                        <Input label="Employee ID" name="employeeId" value={appraisalData.employeeId} onChange={handleChange(setAppraisalData)} />
                                        <Select
                                            label="Department"
                                            name="department"
                                            value={appraisalData.department}
                                            options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))}
                                            onChange={handleChange(setAppraisalData)}
                                        />
                                    </div>
                                </Card>
                                <Card title="Promotion" headerClassName="bg-emerald-50">
                                    <div className="space-y-3">
                                        <Select
                                            label="Current Designation"
                                            name="designation"
                                            value={appraisalData.designation}
                                            options={ROLE_PRESETS.map(r => ({ value: r.designation, label: r.designation }))}
                                            onChange={(e) => {
                                                const preset = ROLE_PRESETS.find(r => r.designation === e.target.value);
                                                if (preset) {
                                                    setAppraisalData(prev => ({
                                                        ...prev,
                                                        designation: preset.designation,
                                                        currentCtc: preset.annualCtc,
                                                    }));
                                                }
                                            }}
                                        />
                                        <Select
                                            label="New Designation"
                                            name="newDesignation"
                                            value={appraisalData.newDesignation}
                                            options={ROLE_PRESETS.map(r => ({ value: r.designation, label: r.designation }))}
                                            onChange={(e) => {
                                                const preset = ROLE_PRESETS.find(r => r.designation === e.target.value);
                                                if (preset) {
                                                    setAppraisalData(prev => ({
                                                        ...prev,
                                                        newDesignation: preset.designation,
                                                        newCtc: preset.annualCtc,
                                                    }));
                                                }
                                            }}
                                        />
                                    </div>
                                </Card>
                                <Card title="Compensation Revision" headerClassName="bg-green-50">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input label="Current CTC (₹)" name="currentCtc" type="number" value={appraisalData.currentCtc} onChange={handleChange(setAppraisalData)} />
                                            <Input label="New CTC (₹)" name="newCtc" type="number" value={appraisalData.newCtc} onChange={handleChange(setAppraisalData)} />
                                        </div>
                                        <div className="bg-green-100 rounded-lg p-3 text-center">
                                            <span className="text-green-800 font-bold text-lg">+{appraisalData.incrementPercentage}% Increment</span>
                                        </div>
                                        <Input label="Effective From" name="effectiveDate" value={appraisalData.effectiveDate} onChange={handleChange(setAppraisalData)} placeholder="e.g., 1st January 2025" />
                                    </div>
                                </Card>
                                <Card title="Performance">
                                    <div className="space-y-3">
                                        <Select
                                            label="Performance Rating"
                                            name="performanceRating"
                                            value={appraisalData.performanceRating}
                                            options={PERFORMANCE_RATING_OPTIONS}
                                            onChange={handleChange(setAppraisalData)}
                                        />
                                        <TextArea label="Key Achievements" name="achievements" value={appraisalData.achievements} onChange={handleChange(setAppraisalData)} rows={3} />
                                    </div>
                                </Card>
                                <Card title="HR Signatory">
                                    <Select
                                        label="HR Signatory"
                                        name="hrName"
                                        value={appraisalData.hrName}
                                        options={HR_SIGNATORY_OPTIONS.map(h => ({ value: h.name, label: `${h.name} - ${h.designation}` }))}
                                        onChange={(e) => handleHrSignatoryChange(e.target.value, setAppraisalData)}
                                    />
                                </Card>
                            </>
                        )}

                        {/* ===== INTERNSHIP COMPLETION FORM ===== */}
                        {selectedDoc === 'internship-completion' && (
                            <>
                                <Card title="Intern Details" headerClassName="bg-violet-50">
                                    <div className="space-y-3">
                                        <Input label="Intern Name" name="internName" value={internshipCompletionData.internName} onChange={handleChange(setInternshipCompletionData)} />
                                        <Input label="Internship Role" name="internshipRole" value={internshipCompletionData.internshipRole} onChange={handleChange(setInternshipCompletionData)} />
                                        <Select label="Department" name="department" value={internshipCompletionData.department} options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))} onChange={handleChange(setInternshipCompletionData)} />
                                    </div>
                                </Card>
                                <Card title="Duration">
                                    <div className="space-y-3">
                                        <Input label="Start Date" name="startDate" value={internshipCompletionData.startDate} onChange={handleChange(setInternshipCompletionData)} />
                                        <Input label="End Date" name="endDate" value={internshipCompletionData.endDate} onChange={handleChange(setInternshipCompletionData)} />
                                        <Select label="Duration" name="duration" value={internshipCompletionData.duration} options={INTERNSHIP_DURATION_OPTIONS.map(d => ({ value: d, label: d }))} onChange={handleChange(setInternshipCompletionData)} />
                                    </div>
                                </Card>
                                <Card title="Performance">
                                    <div className="space-y-3">
                                        <Select label="Performance Rating" name="performanceRating" value={internshipCompletionData.performanceRating} options={CONDUCT_OPTIONS.map(c => ({ value: c.label.split(' - ')[0], label: c.label }))} onChange={handleChange(setInternshipCompletionData)} />
                                        <TextArea label="Skills Demonstrated" name="skills" value={internshipCompletionData.skills} onChange={handleChange(setInternshipCompletionData)} rows={2} />
                                    </div>
                                </Card>
                                <Card title="Signatory">
                                    <Select label="HR Signatory" name="hrName" value={internshipCompletionData.hrName} options={HR_SIGNATORY_OPTIONS.map(h => ({ value: h.name, label: `${h.name} - ${h.designation}` }))} onChange={(e) => handleHrSignatoryChange(e.target.value, setInternshipCompletionData)} />
                                </Card>
                            </>
                        )}

                        {/* ===== TRAINING CERTIFICATE FORM ===== */}
                        {selectedDoc === 'training-certificate' && (
                            <>
                                <Card title="Employee Details" headerClassName="bg-indigo-50">
                                    <div className="space-y-3">
                                        <Input label="Employee Name" name="employeeName" value={trainingCertificateData.employeeName} onChange={handleChange(setTrainingCertificateData)} />
                                        <Input label="Employee ID" name="employeeId" value={trainingCertificateData.employeeId} onChange={handleChange(setTrainingCertificateData)} />
                                        <Input label="Designation" name="designation" value={trainingCertificateData.designation} onChange={handleChange(setTrainingCertificateData)} />
                                        <Select label="Department" name="department" value={trainingCertificateData.department} options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))} onChange={handleChange(setTrainingCertificateData)} />
                                    </div>
                                </Card>
                                <Card title="Training Details">
                                    <div className="space-y-3">
                                        <Input label="Training Program Name" name="trainingProgram" value={trainingCertificateData.trainingProgram} onChange={handleChange(setTrainingCertificateData)} />
                                        <Input label="Training Duration" name="trainingDuration" value={trainingCertificateData.trainingDuration} onChange={handleChange(setTrainingCertificateData)} />
                                        <Input label="Training Date" name="trainingDate" value={trainingCertificateData.trainingDate} onChange={handleChange(setTrainingCertificateData)} />
                                        <Input label="Trainer/Conducted By" name="trainerName" value={trainingCertificateData.trainerName} onChange={handleChange(setTrainingCertificateData)} />
                                    </div>
                                </Card>
                                <Card title="Signatory">
                                    <Select label="HR Signatory" name="hrName" value={trainingCertificateData.hrName} options={HR_SIGNATORY_OPTIONS.map(h => ({ value: h.name, label: `${h.name} - ${h.designation}` }))} onChange={(e) => handleHrSignatoryChange(e.target.value, setTrainingCertificateData)} />
                                </Card>
                            </>
                        )}

                        {/* ===== PROMOTION LETTER FORM ===== */}
                        {selectedDoc === 'promotion-letter' && (
                            <>
                                <Card title="Employee Details" headerClassName="bg-sky-50">
                                    <div className="space-y-3">
                                        <Input label="Employee Name" name="employeeName" value={promotionData.employeeName} onChange={handleChange(setPromotionData)} />
                                        <Input label="Employee ID" name="employeeId" value={promotionData.employeeId} onChange={handleChange(setPromotionData)} />
                                        <Select label="Department" name="department" value={promotionData.department} options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))} onChange={handleChange(setPromotionData)} />
                                    </div>
                                </Card>
                                <Card title="Promotion Details">
                                    <div className="space-y-3">
                                        <Input label="Current Designation" name="currentDesignation" value={promotionData.currentDesignation} onChange={handleChange(setPromotionData)} />
                                        <Input label="New Designation" name="newDesignation" value={promotionData.newDesignation} onChange={handleChange(setPromotionData)} />
                                        <Input label="Effective Date" name="effectiveDate" value={promotionData.effectiveDate} onChange={handleChange(setPromotionData)} />
                                    </div>
                                </Card>
                                <Card title="Compensation">
                                    <div className="space-y-3">
                                        <Input label="Current CTC (Annual)" name="currentCtc" type="number" value={promotionData.currentCtc} onChange={handleChange(setPromotionData)} />
                                        <Input label="New CTC (Annual)" name="newCtc" type="number" value={promotionData.newCtc} onChange={handleChange(setPromotionData)} />
                                    </div>
                                </Card>
                                <Card title="Responsibilities">
                                    <TextArea label="New Responsibilities" name="newResponsibilities" value={promotionData.newResponsibilities} onChange={handleChange(setPromotionData)} rows={3} />
                                </Card>
                                <Card title="Signatory">
                                    <Select label="HR Signatory" name="hrName" value={promotionData.hrName} options={HR_SIGNATORY_OPTIONS.map(h => ({ value: h.name, label: `${h.name} - ${h.designation}` }))} onChange={(e) => handleHrSignatoryChange(e.target.value, setPromotionData)} />
                                </Card>
                            </>
                        )}

                        {/* ===== WARNING LETTER FORM ===== */}
                        {selectedDoc === 'warning-letter' && (
                            <>
                                <Card title="Employee Details" headerClassName="bg-orange-50">
                                    <div className="space-y-3">
                                        <Input label="Employee Name" name="employeeName" value={warningData.employeeName} onChange={handleChange(setWarningData)} />
                                        <Input label="Employee ID" name="employeeId" value={warningData.employeeId} onChange={handleChange(setWarningData)} />
                                        <Input label="Designation" name="designation" value={warningData.designation} onChange={handleChange(setWarningData)} />
                                        <Select label="Department" name="department" value={warningData.department} options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))} onChange={handleChange(setWarningData)} />
                                    </div>
                                </Card>
                                <Card title="Warning Details">
                                    <div className="space-y-3">
                                        <Select label="Warning Type" name="warningType" value={warningData.warningType} options={[
                                            { value: 'Verbal Warning', label: 'Verbal Warning' },
                                            { value: 'First Written Warning', label: 'First Written Warning' },
                                            { value: 'Final Written Warning', label: 'Final Written Warning' },
                                        ]} onChange={handleChange(setWarningData)} />
                                        <Input label="Incident Date" name="incidentDate" value={warningData.incidentDate} onChange={handleChange(setWarningData)} />
                                        <TextArea label="Incident Description" name="incidentDescription" value={warningData.incidentDescription} onChange={handleChange(setWarningData)} rows={3} />
                                        <Input label="Previous Warnings" name="previousWarnings" value={warningData.previousWarnings} onChange={handleChange(setWarningData)} />
                                    </div>
                                </Card>
                                <Card title="Expectations">
                                    <div className="space-y-3">
                                        <TextArea label="Expected Improvement" name="expectedImprovement" value={warningData.expectedImprovement} onChange={handleChange(setWarningData)} rows={2} />
                                        <TextArea label="Consequence if Not Improved" name="consequenceIfNotImproved" value={warningData.consequenceIfNotImproved} onChange={handleChange(setWarningData)} rows={2} />
                                    </div>
                                </Card>
                                <Card title="Signatory">
                                    <Select label="HR Signatory" name="hrName" value={warningData.hrName} options={HR_SIGNATORY_OPTIONS.map(h => ({ value: h.name, label: `${h.name} - ${h.designation}` }))} onChange={(e) => handleHrSignatoryChange(e.target.value, setWarningData)} />
                                </Card>
                            </>
                        )}

                        {/* ===== TERMINATION LETTER FORM ===== */}
                        {selectedDoc === 'termination-letter' && (
                            <>
                                <Card title="Employee Details" headerClassName="bg-red-50">
                                    <div className="space-y-3">
                                        <Input label="Employee Name" name="employeeName" value={terminationData.employeeName} onChange={handleChange(setTerminationData)} />
                                        <Input label="Employee ID" name="employeeId" value={terminationData.employeeId} onChange={handleChange(setTerminationData)} />
                                        <Input label="Designation" name="designation" value={terminationData.designation} onChange={handleChange(setTerminationData)} />
                                        <Select label="Department" name="department" value={terminationData.department} options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))} onChange={handleChange(setTerminationData)} />
                                    </div>
                                </Card>
                                <Card title="Termination Details">
                                    <div className="space-y-3">
                                        <Select label="Termination Type" name="terminationType" value={terminationData.terminationType} options={[
                                            { value: 'Termination with Notice', label: 'Termination with Notice' },
                                            { value: 'Immediate Termination', label: 'Immediate Termination' },
                                            { value: 'Termination for Cause', label: 'Termination for Cause' },
                                        ]} onChange={handleChange(setTerminationData)} />
                                        <Input label="Last Working Date" name="lastWorkingDate" value={terminationData.lastWorkingDate} onChange={handleChange(setTerminationData)} />
                                        <TextArea label="Termination Reason" name="terminationReason" value={terminationData.terminationReason} onChange={handleChange(setTerminationData)} rows={3} />
                                    </div>
                                </Card>
                                <Card title="Settlement">
                                    <div className="space-y-3">
                                        <Input label="Notice Period Status" name="noticePeriodStatus" value={terminationData.noticePeriodStatus} onChange={handleChange(setTerminationData)} />
                                        <TextArea label="Settlement Details" name="settlementDetails" value={terminationData.settlementDetails} onChange={handleChange(setTerminationData)} rows={2} />
                                    </div>
                                </Card>
                                <Card title="Signatory">
                                    <Select label="HR Signatory" name="hrName" value={terminationData.hrName} options={HR_SIGNATORY_OPTIONS.map(h => ({ value: h.name, label: `${h.name} - ${h.designation}` }))} onChange={(e) => handleHrSignatoryChange(e.target.value, setTerminationData)} />
                                </Card>
                            </>
                        )}

                        {/* ===== JOINING LETTER FORM ===== */}
                        {selectedDoc === 'joining-letter' && (
                            <>
                                <Card title="Employee Details" headerClassName="bg-green-50">
                                    <div className="space-y-3">
                                        <Input label="Employee Name" name="employeeName" value={joiningData.employeeName} onChange={handleChange(setJoiningData)} />
                                        <Input label="Employee ID" name="employeeId" value={joiningData.employeeId} onChange={handleChange(setJoiningData)} />
                                        <Input label="Designation" name="designation" value={joiningData.designation} onChange={handleChange(setJoiningData)} />
                                        <Select label="Department" name="department" value={joiningData.department} options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))} onChange={handleChange(setJoiningData)} />
                                    </div>
                                </Card>
                                <Card title="Employment Details">
                                    <div className="space-y-3">
                                        <Input label="Joining Date" name="joiningDate" value={joiningData.joiningDate} onChange={handleChange(setJoiningData)} />
                                        <Input label="Reporting To" name="reportingTo" value={joiningData.reportingTo} onChange={handleChange(setJoiningData)} />
                                        <Select label="Location" name="location" value={joiningData.location} options={LOCATION_OPTIONS.map(l => ({ value: l, label: l }))} onChange={handleChange(setJoiningData)} />
                                        <Select label="Probation Period" name="probationPeriod" value={joiningData.probationPeriod} options={PROBATION_OPTIONS.map(p => ({ value: p, label: p }))} onChange={handleChange(setJoiningData)} />
                                    </div>
                                </Card>
                                <Card title="Compensation">
                                    <Input label="Annual CTC" name="annualCtc" type="number" value={joiningData.annualCtc} onChange={handleChange(setJoiningData)} />
                                </Card>
                                <Card title="Signatory">
                                    <Select label="HR Signatory" name="hrName" value={joiningData.hrName} options={HR_SIGNATORY_OPTIONS.map(h => ({ value: h.name, label: `${h.name} - ${h.designation}` }))} onChange={(e) => handleHrSignatoryChange(e.target.value, setJoiningData)} />
                                </Card>
                            </>
                        )}

                        {/* ===== ADDRESS PROOF FORM ===== */}
                        {selectedDoc === 'address-proof' && (
                            <>
                                <Card title="Employee Details" headerClassName="bg-slate-100">
                                    <div className="space-y-3">
                                        <Input label="Employee Name" name="employeeName" value={addressProofData.employeeName} onChange={handleChange(setAddressProofData)} />
                                        <Input label="Employee ID" name="employeeId" value={addressProofData.employeeId} onChange={handleChange(setAddressProofData)} />
                                        <Input label="Designation" name="designation" value={addressProofData.designation} onChange={handleChange(setAddressProofData)} />
                                        <Select label="Department" name="department" value={addressProofData.department} options={DEPARTMENT_OPTIONS.map(d => ({ value: d, label: d }))} onChange={handleChange(setAddressProofData)} />
                                        <Input label="Joining Date" name="joiningDate" value={addressProofData.joiningDate} onChange={handleChange(setAddressProofData)} />
                                    </div>
                                </Card>
                                <Card title="Address Details">
                                    <div className="space-y-3">
                                        <TextArea label="Employee Address" name="employeeAddress" value={addressProofData.employeeAddress} onChange={handleChange(setAddressProofData)} rows={3} placeholder="Full residential address" />
                                        <Select label="Purpose" name="purpose" value={addressProofData.purpose} options={[
                                            { value: 'Bank Account Opening', label: 'Bank Account Opening' },
                                            { value: 'Rental Agreement', label: 'Rental Agreement' },
                                            { value: 'Loan Application', label: 'Loan Application' },
                                            { value: 'Passport Application', label: 'Passport Application' },
                                            { value: 'Visa Application', label: 'Visa Application' },
                                            { value: 'Other', label: 'Other' },
                                        ]} onChange={handleChange(setAddressProofData)} />
                                    </div>
                                </Card>
                                <Card title="Signatory">
                                    <Select label="HR Signatory" name="hrName" value={addressProofData.hrName} options={HR_SIGNATORY_OPTIONS.map(h => ({ value: h.name, label: `${h.name} - ${h.designation}` }))} onChange={(e) => handleHrSignatoryChange(e.target.value, setAddressProofData)} />
                                </Card>
                            </>
                        )}
                    </div>
                </div>

                {/* Preview Panel - Hidden on mobile unless preview view, visible on md+ */}
                <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200 overflow-auto p-2 md:p-6 justify-center print:p-0 print:bg-white print:block`}>
                    <div className="print:w-full w-full md:w-auto overflow-x-auto" id="print-content">
                        <div className="min-w-[210mm] md:min-w-0 transform scale-[0.5] md:scale-100 origin-top-left md:origin-center">
                            {selectedDoc === 'offer-letter' && <OfferLetterTemplate ref={previewRef} data={offerData} showSeal={showSeal} />}
                            {selectedDoc === 'salary-slip' && <SalarySlipTemplate ref={previewRef} data={salaryData} />}
                            {selectedDoc === 'internship-letter' && <InternshipLetterTemplate ref={previewRef} data={internshipData} />}
                            {selectedDoc === 'experience-certificate' && <ExperienceCertificateTemplate ref={previewRef} data={experienceData} />}
                            {selectedDoc === 'relieving-letter' && <RelievingLetterTemplate ref={previewRef} data={relievingData} />}
                            {selectedDoc === 'appraisal-letter' && <AppraisalLetterTemplate ref={previewRef} data={appraisalData} />}
                            {selectedDoc === 'internship-completion' && <InternshipCompletionTemplate ref={previewRef} data={internshipCompletionData} />}
                            {selectedDoc === 'training-certificate' && <TrainingCertificateTemplate ref={previewRef} data={trainingCertificateData} />}
                            {selectedDoc === 'promotion-letter' && <PromotionLetterTemplate ref={previewRef} data={promotionData} />}
                            {selectedDoc === 'warning-letter' && <WarningLetterTemplate ref={previewRef} data={warningData} />}
                            {selectedDoc === 'termination-letter' && <TerminationLetterTemplate ref={previewRef} data={terminationData} />}
                            {selectedDoc === 'joining-letter' && <JoiningLetterTemplate ref={previewRef} data={joiningData} />}
                            {selectedDoc === 'address-proof' && <AddressProofLetterTemplate ref={previewRef} data={addressProofData} />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation - Only visible on mobile */}
            <div className="md:hidden bg-white border-t border-slate-200 flex print:hidden">
                <button
                    onClick={() => setMobileView('docs')}
                    className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all ${mobileView === 'docs' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}
                >
                    <span className="text-xl">📄</span>
                    <span className="text-xs font-medium">Documents</span>
                </button>
                <button
                    onClick={() => setMobileView('form')}
                    className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all ${mobileView === 'form' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}
                >
                    <span className="text-xl">✏️</span>
                    <span className="text-xs font-medium">Edit</span>
                </button>
                <button
                    onClick={() => setMobileView('preview')}
                    className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all ${mobileView === 'preview' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}
                >
                    <span className="text-xl">👁️</span>
                    <span className="text-xs font-medium">Preview</span>
                </button>
            </div>

            {/* Print Styles */}
            <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .print\\:hidden { display: none !important; }
          /* Ensure preview panel is visible and full width */
          #print-content { 
            display: block !important;
            width: 210mm !important;
            max-width: none !important;
            overflow: visible !important;
          }
          #print-content > div {
            display: block !important;
            width: 210mm !important;
            min-width: 210mm !important;
            max-width: 210mm !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            transform: none !important;
            transform-origin: top left !important;
          }
          /* Override any mobile scaling */
          .scale-\\[0\\.5\\] {
            transform: none !important;
          }
          /* Ensure templates render at full size */
          #print-content > div > div {
            width: 210mm !important;
            min-height: 297mm !important;
          }
        }
      `}</style>

            {/* Employee Database Modal */}
            {showEmployeeModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className={`w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                        <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white flex justify-between items-center">
                            <h3 className="text-lg font-bold">👥 Employee Database</h3>
                            <button onClick={() => setShowEmployeeModal(false)} className="text-white/80 hover:text-white text-2xl">×</button>
                        </div>
                        <div className="p-4 overflow-y-auto max-h-[60vh]">
                            {savedEmployees.length === 0 ? (
                                <p className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    No employees saved yet. Fill a form and click "Save Employee" to add.
                                </p>
                            ) : (
                                <div className="space-y-2">
                                    {savedEmployees.map(emp => (
                                        <div key={emp.id} className={`flex items-center justify-between p-3 rounded-lg border ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
                                            <div>
                                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>{emp.name}</p>
                                                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{emp.designation} • {emp.department}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        // Auto-fill current form
                                                        if (selectedDoc === 'offer-letter') {
                                                            setOfferData(prev => ({ ...prev, candidateName: emp.name, candidateAddress: emp.address || '' }));
                                                        } else if (selectedDoc === 'salary-slip') {
                                                            setSalaryData(prev => ({ ...prev, employeeName: emp.name, employeeId: emp.employeeId, designation: emp.designation, department: emp.department }));
                                                        } else if (selectedDoc === 'experience-certificate') {
                                                            setExperienceData(prev => ({ ...prev, employeeName: emp.name, employeeId: emp.employeeId, designation: emp.designation, department: emp.department }));
                                                        } else if (selectedDoc === 'relieving-letter') {
                                                            setRelievingData(prev => ({ ...prev, employeeName: emp.name, employeeId: emp.employeeId, designation: emp.designation, department: emp.department }));
                                                        } else if (selectedDoc === 'appraisal-letter') {
                                                            setAppraisalData(prev => ({ ...prev, employeeName: emp.name, employeeId: emp.employeeId, designation: emp.designation, department: emp.department }));
                                                        } else if (selectedDoc === 'promotion-letter') {
                                                            setPromotionData(prev => ({ ...prev, employeeName: emp.name, employeeId: emp.employeeId, currentDesignation: emp.designation, department: emp.department }));
                                                        } else if (selectedDoc === 'warning-letter') {
                                                            setWarningData(prev => ({ ...prev, employeeName: emp.name, employeeId: emp.employeeId, designation: emp.designation, department: emp.department }));
                                                        } else if (selectedDoc === 'termination-letter') {
                                                            setTerminationData(prev => ({ ...prev, employeeName: emp.name, employeeId: emp.employeeId, designation: emp.designation, department: emp.department }));
                                                        } else if (selectedDoc === 'joining-letter') {
                                                            setJoiningData(prev => ({ ...prev, employeeName: emp.name, employeeId: emp.employeeId, designation: emp.designation, department: emp.department }));
                                                        } else if (selectedDoc === 'address-proof') {
                                                            setAddressProofData(prev => ({ ...prev, employeeName: emp.name, employeeId: emp.employeeId, designation: emp.designation, department: emp.department, employeeAddress: emp.address || '' }));
                                                        }
                                                        setShowEmployeeModal(false);
                                                    }}
                                                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                                                >
                                                    Use
                                                </button>
                                                <button
                                                    onClick={() => setSavedEmployees(prev => prev.filter(e => e.id !== emp.id))}
                                                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={`p-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                            <button
                                onClick={() => {
                                    // Save current form data as new employee
                                    const name = selectedDoc === 'offer-letter' ? offerData.candidateName :
                                        selectedDoc === 'salary-slip' ? salaryData.employeeName :
                                            selectedDoc === 'experience-certificate' ? experienceData.employeeName :
                                                selectedDoc === 'relieving-letter' ? relievingData.employeeName :
                                                    selectedDoc === 'appraisal-letter' ? appraisalData.employeeName :
                                                        selectedDoc === 'promotion-letter' ? promotionData.employeeName :
                                                            selectedDoc === 'warning-letter' ? warningData.employeeName :
                                                                selectedDoc === 'termination-letter' ? terminationData.employeeName :
                                                                    selectedDoc === 'joining-letter' ? joiningData.employeeName :
                                                                        selectedDoc === 'address-proof' ? addressProofData.employeeName : '';

                                    if (name) {
                                        const designation = selectedDoc === 'offer-letter' ? offerData.designation :
                                            selectedDoc === 'salary-slip' ? salaryData.designation :
                                                selectedDoc === 'experience-certificate' ? experienceData.designation :
                                                    selectedDoc === 'relieving-letter' ? relievingData.designation :
                                                        selectedDoc === 'appraisal-letter' ? appraisalData.designation :
                                                            selectedDoc === 'promotion-letter' ? promotionData.currentDesignation :
                                                                selectedDoc === 'warning-letter' ? warningData.designation :
                                                                    selectedDoc === 'termination-letter' ? terminationData.designation :
                                                                        selectedDoc === 'joining-letter' ? joiningData.designation :
                                                                            selectedDoc === 'address-proof' ? addressProofData.designation : '';

                                        const department = selectedDoc === 'offer-letter' ? offerData.department :
                                            selectedDoc === 'salary-slip' ? salaryData.department : 'General';

                                        const employeeId = selectedDoc === 'salary-slip' ? salaryData.employeeId :
                                            selectedDoc === 'experience-certificate' ? experienceData.employeeId :
                                                selectedDoc === 'relieving-letter' ? relievingData.employeeId : 'EMP-' + Date.now().toString(36).toUpperCase();

                                        setSavedEmployees(prev => [...prev, {
                                            id: Date.now().toString(),
                                            name,
                                            employeeId,
                                            designation,
                                            department
                                        }]);
                                    }
                                }}
                                className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                            >
                                💾 Save Current Form as Employee
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

