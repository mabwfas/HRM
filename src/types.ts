// ============================================
// PRESET OPTIONS FOR DROPDOWNS
// ============================================

export const COMPANY_PRESETS = {
    name: 'Digital Heroes',
    tagline: 'Launching Brands in New Orbits',
    address: 'Lucknow, Uttar Pradesh, India',
    website: 'https://digitalheroes.co.in',
    email: 'support@digitalheroes.co.in',
};

export const DEPARTMENT_OPTIONS = [
    'Engineering',
    'Sales',
    'Marketing',
    'Design',
    'HR',
    'Operations',
    'Finance',
    'Customer Success',
];

export const LOCATION_OPTIONS = [
    'Lucknow, Uttar Pradesh (Hybrid)',
    'Lucknow, Uttar Pradesh (Remote)',
    'Lucknow, Uttar Pradesh (On-site)',
    'Delhi NCR (Hybrid)',
    'Delhi NCR (Remote)',
    'Delhi NCR (On-site)',
    'Remote - India',
    'Work From Home',
];

export const PROBATION_OPTIONS = [
    '3 months (90 days)',
    '6 months',
    '1 month',
];

export const NOTICE_PERIOD_OPTIONS = [
    '7 days',
    '15 days',
    '30 days',
    '60 days',
    '90 days',
];

// Role presets with auto-fill values including responsibilities
export interface RolePreset {
    designation: string;
    department: string;
    reportingTo: string;
    annualCtc: number;
    responsibilities: string;
}

export const ROLE_PRESETS: RolePreset[] = [
    {
        designation: 'Project Manager / Team Lead',
        department: 'Engineering',
        reportingTo: 'Director of Operations',
        annualCtc: 800000,
        responsibilities: 'Leading project teams, client communication, sprint planning, resource allocation, code reviews, ensuring timely delivery of projects, mentoring junior developers'
    },
    {
        designation: 'Developer + Client Success',
        department: 'Engineering',
        reportingTo: 'Project Manager',
        annualCtc: 600000,
        responsibilities: 'Full-stack development, client requirement gathering, technical support, code implementation, bug fixing, maintaining client relationships'
    },
    {
        designation: 'Senior Web Developer',
        department: 'Engineering',
        reportingTo: 'Tech Lead',
        annualCtc: 720000,
        responsibilities: 'Web application development, frontend frameworks, responsive design, custom functionality, performance optimization, mentoring junior developers'
    },
    {
        designation: 'Junior Web Developer',
        department: 'Engineering',
        reportingTo: 'Senior Developer',
        annualCtc: 360000,
        responsibilities: 'HTML/CSS development, basic JavaScript, bug fixing, following coding standards, learning best practices'
    },
    {
        designation: 'Frontend Developer',
        department: 'Engineering',
        reportingTo: 'Tech Lead',
        annualCtc: 540000,
        responsibilities: 'Building responsive user interfaces, React/Next.js development, CSS/Tailwind styling, API integration, cross-browser testing'
    },
    {
        designation: 'Backend Developer',
        department: 'Engineering',
        reportingTo: 'Tech Lead',
        annualCtc: 600000,
        responsibilities: 'API development, database design, server-side logic, authentication systems, third-party integrations, performance optimization'
    },
    {
        designation: 'Full Stack Developer',
        department: 'Engineering',
        reportingTo: 'Tech Lead',
        annualCtc: 660000,
        responsibilities: 'End-to-end application development, frontend and backend coding, database management, deployment, code reviews'
    },
    {
        designation: 'Senior Frontend Developer',
        department: 'Engineering',
        reportingTo: 'Tech Lead',
        annualCtc: 720000,
        responsibilities: 'Leading frontend architecture, mentoring developers, React/Next.js expertise, performance optimization, code standards'
    },
    {
        designation: 'Senior Backend Developer',
        department: 'Engineering',
        reportingTo: 'Tech Lead',
        annualCtc: 780000,
        responsibilities: 'Backend architecture design, database optimization, API security, scalability planning, mentoring team members'
    },
    {
        designation: 'Sales Executive',
        department: 'Sales',
        reportingTo: 'Sales Manager',
        annualCtc: 420000,
        responsibilities: 'Client acquisition, proposal writing, order fulfillment, maintaining client relationships, upselling services, lead generation'
    },
    {
        designation: 'Sales Manager',
        department: 'Sales',
        reportingTo: 'Director of Sales',
        annualCtc: 720000,
        responsibilities: 'Sales team leadership, revenue targets, client relationships, sales strategy, team training, performance tracking'
    },
    {
        designation: 'HR Manager',
        department: 'HR',
        reportingTo: 'Director of Operations',
        annualCtc: 480000,
        responsibilities: 'Recruitment management, employee relations, policy implementation, payroll oversight, performance reviews, team building'
    },
    {
        designation: 'HR Executive',
        department: 'HR',
        reportingTo: 'HR Manager',
        annualCtc: 300000,
        responsibilities: 'Recruitment coordination, onboarding, attendance management, employee queries, documentation, exit formalities'
    },
    {
        designation: 'UI/UX Designer',
        department: 'Design',
        reportingTo: 'Design Lead',
        annualCtc: 480000,
        responsibilities: 'User interface design, wireframing, prototyping, user research, design systems, Figma/Adobe XD expertise'
    },
    {
        designation: 'Graphic Designer',
        department: 'Design',
        reportingTo: 'Design Lead',
        annualCtc: 360000,
        responsibilities: 'Visual design, banner creation, social media graphics, brand assets, marketing collaterals, print designs'
    },
    {
        designation: 'Content Writer',
        department: 'Marketing',
        reportingTo: 'Marketing Manager',
        annualCtc: 300000,
        responsibilities: 'Blog writing, website copy, social media content, SEO optimization, email campaigns, product descriptions'
    },
    {
        designation: 'Digital Marketing Executive',
        department: 'Marketing',
        reportingTo: 'Marketing Manager',
        annualCtc: 360000,
        responsibilities: 'Social media management, paid advertising, SEO/SEM, analytics reporting, campaign optimization, lead generation'
    },
    {
        designation: 'Customer Success Manager',
        department: 'Customer Success',
        reportingTo: 'Director of Operations',
        annualCtc: 540000,
        responsibilities: 'Client onboarding, relationship management, issue resolution, retention strategies, upselling, feedback collection'
    },
    {
        designation: 'Operations Executive',
        department: 'Operations',
        reportingTo: 'Operations Manager',
        annualCtc: 300000,
        responsibilities: 'Daily operations support, process documentation, vendor coordination, inventory management, administrative tasks'
    },
    {
        designation: 'Intern',
        department: 'Engineering',
        reportingTo: 'Senior Developer',
        annualCtc: 120000,
        responsibilities: 'Learning company processes, assisting senior developers, completing assigned tasks, code practice, documentation'
    },
];

export const CONDUCT_OPTIONS = [
    { value: 'exemplary', label: 'Exemplary - Outstanding in every aspect' },
    { value: 'excellent', label: 'Excellent - Exceptional performance' },
    { value: 'good', label: 'Good - Met expectations consistently' },
    { value: 'satisfactory', label: 'Satisfactory - Acceptable performance' },
];

export const PERFORMANCE_RATING_OPTIONS = [
    { value: 'Outstanding', label: 'Outstanding (90-100%)' },
    { value: 'Exceeds Expectations', label: 'Exceeds Expectations (75-89%)' },
    { value: 'Meets Expectations', label: 'Meets Expectations (60-74%)' },
    { value: 'Needs Improvement', label: 'Needs Improvement (40-59%)' },
];

export interface SignatoryOption {
    name: string;
    designation: string;
    initials: string;
    signatureImage: string;
}

export const HR_SIGNATORY_OPTIONS: SignatoryOption[] = [
    { name: 'Prasun Anand', designation: 'Co-Founder', initials: 'PA', signatureImage: '/prasun_signature.png' },
    { name: 'Shreyansh Singh', designation: 'Managing Director', initials: 'SS', signatureImage: '/shreyansh_signature.png' },
    { name: 'Agrima Sahu', designation: 'HR Manager', initials: 'AS', signatureImage: '/agrima_signature.png' },
    { name: 'Anurag Singh', designation: 'Director of Operations', initials: 'AS', signatureImage: '/anurag_signature.png' },
    { name: 'Priya Singh', designation: 'Finance Manager', initials: 'PS', signatureImage: '/priya_signature.png' },
    { name: 'Amit Kumar', designation: 'CEO & Founder', initials: 'AK', signatureImage: '/amit_signature.png' },
    { name: 'Neha Gupta', designation: 'Head of HR', initials: 'NG', signatureImage: '/neha_signature.png' },
    { name: 'Vikram Verma', designation: 'COO', initials: 'VV', signatureImage: '/vikram_signature.png' },
];

export const INTERNSHIP_DURATION_OPTIONS = [
    '1 month',
    '2 months',
    '3 months',
    '6 months',
];

export const WORKING_HOURS_OPTIONS = [
    '9:00 AM - 6:00 PM (Monday to Saturday)',
    '10:00 AM - 7:00 PM (Monday to Saturday)',
    '9:00 AM - 9:00 PM (Flexible - Sales)',
    '10:00 AM - 6:00 PM (Monday to Friday)',
];

// ============================================
// OFFER LETTER
// ============================================
export interface OfferLetterData {
    companyName: string;
    companyTagline: string;
    companyAddress: string;
    refPrefix: string;
    refYear: string;
    refNumber: string;
    date: string;
    candidateName: string;
    candidateAddress: string;
    designation: string;
    customRole1: string;  // Additional custom role 1
    customRole2: string;  // Additional custom role 2
    department: string;
    reportingTo: string;
    location: string;
    joiningDate: string;
    annualCtc: number;
    basicSalary: number;
    hra: number;
    conveyanceAllowance: number;
    specialAllowance: number;
    pfEmployer: number;
    probationPeriod: string;
    noticePeriod: string;
    hrName: string;
    hrDesignation: string;
    hrSignature?: string;
}

export const initialOfferLetterData: OfferLetterData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    companyAddress: COMPANY_PRESETS.address,
    refPrefix: 'DH/HR',
    refYear: new Date().getFullYear().toString(),
    refNumber: String(Math.floor(Math.random() * 900) + 100).padStart(3, '0'),
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    candidateName: '',
    candidateAddress: '',
    designation: 'Developer + Client Success',
    customRole1: '',
    customRole2: '',
    department: 'Engineering',
    reportingTo: 'Project Manager',
    location: 'Lucknow, Uttar Pradesh (Hybrid)',
    joiningDate: '',
    annualCtc: 600000,
    basicSalary: 25000,
    hra: 12500,
    conveyanceAllowance: 2500,
    specialAllowance: 8200,
    pfEmployer: 1800,
    probationPeriod: '3 months (90 days)',
    noticePeriod: '30 days',
    hrName: 'Anurag Singh',
    hrDesignation: 'Director of Operations',
    hrSignature: '',
};

// ============================================
// SALARY SLIP
// ============================================
export interface SalarySlipData {
    companyName: string;
    companyTagline: string;
    employeeName: string;
    employeeId: string;
    designation: string;
    customRole1: string;
    customRole2: string;
    department: string;
    panNumber: string;
    bankAccount: string;
    month: string;
    year: string;
    totalDays: number;
    paidDays: number;
    lopDays: number;
    annualCtc: number;
    basicSalary: number;
    hra: number;
    conveyanceAllowance: number;
    specialAllowance: number;
    bonus: number;
    grossEarnings: number;
    pfEmployee: number;
    professionalTax: number;
    tds: number;
    otherDeductions: number;
    totalDeductions: number;
    netPay: number;
    netPayInWords: string;
    signatoryName: string;
    signatoryDesignation: string;
    signatoryInitials: string;
}

export const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const initialSalarySlipData: SalarySlipData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    employeeName: '',
    employeeId: 'DH' + String(Math.floor(Math.random() * 9000) + 1000),
    designation: 'Developer + Client Success',
    customRole1: '',
    customRole2: '',
    department: 'Engineering',
    panNumber: '',
    bankAccount: '',
    month: MONTHS[new Date().getMonth()],
    year: new Date().getFullYear().toString(),
    totalDays: 30,
    paidDays: 30,
    lopDays: 0,
    annualCtc: 600000,
    basicSalary: 25000,
    hra: 12500,
    conveyanceAllowance: 2500,
    specialAllowance: 8200,
    bonus: 0,
    grossEarnings: 48200,
    pfEmployee: 1800,
    professionalTax: 200,
    tds: 0,
    otherDeductions: 0,
    totalDeductions: 2000,
    netPay: 46200,
    netPayInWords: 'Rupees Forty Six Thousand Two Hundred Only',
    signatoryName: 'Prasun Anand',
    signatoryDesignation: 'Co-Founder',
    signatoryInitials: 'PA',
};

// ============================================
// INTERNSHIP LETTER
// ============================================
export interface InternshipLetterData {
    companyName: string;
    companyTagline: string;
    refNumber: string;
    date: string;
    internName: string;
    internAddress: string;
    collegeName: string;
    course: string;
    internshipRole: string;
    department: string;
    startDate: string;
    endDate: string;
    duration: string;
    stipend: number;
    workingHours: string;
    mentorName: string;
    mentorDesignation: string;
    hrName: string;
    hrDesignation: string;
}

export const INTERNSHIP_ROLE_PRESETS = [
    { role: 'Web Development Intern', department: 'Engineering', stipend: 10000, mentorDesignation: 'Senior Developer' },
    { role: 'Sales Intern', department: 'Sales', stipend: 8000, mentorDesignation: 'Sales Manager' },
    { role: 'Design Intern', department: 'Design', stipend: 8000, mentorDesignation: 'Design Lead' },
    { role: 'Marketing Intern', department: 'Marketing', stipend: 8000, mentorDesignation: 'Marketing Manager' },
    { role: 'HR Intern', department: 'HR', stipend: 6000, mentorDesignation: 'HR Manager' },
    { role: 'Content Writing Intern', department: 'Marketing', stipend: 6000, mentorDesignation: 'Content Lead' },
];

export const initialInternshipLetterData: InternshipLetterData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    refNumber: 'DH/HR/INT/' + new Date().getFullYear() + '/' + String(Math.floor(Math.random() * 900) + 100),
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    internName: '',
    internAddress: '',
    collegeName: '',
    course: '',
    internshipRole: 'Web Development Intern',
    department: 'Engineering',
    startDate: '',
    endDate: '',
    duration: '3 months',
    stipend: 10000,
    workingHours: '9:00 AM - 6:00 PM (Monday to Saturday)',
    mentorName: '',
    mentorDesignation: 'Senior Developer',
    hrName: 'Prasun Anand',
    hrDesignation: 'Co-Founder',
};

// ============================================
// EXPERIENCE CERTIFICATE
// ============================================
export interface ExperienceCertificateData {
    companyName: string;
    companyTagline: string;
    refNumber: string;
    date: string;
    employeeName: string;
    employeeId: string;
    designation: string;
    customRole1: string;
    customRole2: string;
    department: string;
    joiningDate: string;
    relievingDate: string;
    lastDrawnSalary: number;
    responsibilities: string;
    conduct: string;
    hrName: string;
    hrDesignation: string;
}

export const initialExperienceCertificateData: ExperienceCertificateData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    refNumber: 'DH/HR/EXP/' + new Date().getFullYear() + '/' + String(Math.floor(Math.random() * 900) + 100),
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    employeeName: '',
    employeeId: 'DH' + String(Math.floor(Math.random() * 9000) + 1000),
    designation: 'Developer + Client Success',
    customRole1: '',
    customRole2: '',
    department: 'Engineering',
    joiningDate: '',
    relievingDate: '',
    lastDrawnSalary: 600000,
    responsibilities: 'Built conversion-optimized web applications, handled client communication, achieved quality deliverables on time',
    conduct: 'exemplary',
    hrName: 'Prasun Anand',
    hrDesignation: 'Co-Founder',
};

// ============================================
// RELIEVING LETTER
// ============================================
export interface RelievingLetterData {
    companyName: string;
    companyTagline: string;
    refNumber: string;
    date: string;
    employeeName: string;
    employeeId: string;
    designation: string;
    customRole1: string;
    customRole2: string;
    department: string;
    joiningDate: string;
    resignationDate: string;
    lastWorkingDate: string;
    hrName: string;
    hrDesignation: string;
}

export const initialRelievingLetterData: RelievingLetterData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    refNumber: 'DH/HR/REL/' + new Date().getFullYear() + '/' + String(Math.floor(Math.random() * 900) + 100),
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    employeeName: '',
    employeeId: 'DH' + String(Math.floor(Math.random() * 9000) + 1000),
    designation: 'Developer + Client Success',
    customRole1: '',
    customRole2: '',
    department: 'Engineering',
    joiningDate: '',
    resignationDate: '',
    lastWorkingDate: '',
    hrName: 'Prasun Anand',
    hrDesignation: 'Co-Founder',
};

// ============================================
// APPRAISAL LETTER
// ============================================
export interface AppraisalLetterData {
    companyName: string;
    companyTagline: string;
    refNumber: string;
    date: string;
    employeeName: string;
    employeeId: string;
    designation: string;
    customRole1: string;
    customRole2: string;
    newDesignation: string;
    department: string;
    currentCtc: number;
    newCtc: number;
    incrementPercentage: number;
    effectiveDate: string;
    performanceRating: string;
    achievements: string;
    hrName: string;
    hrDesignation: string;
}

export const initialAppraisalLetterData: AppraisalLetterData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    refNumber: 'DH/HR/APR/' + new Date().getFullYear() + '/' + String(Math.floor(Math.random() * 900) + 100),
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    employeeName: '',
    employeeId: 'DH' + String(Math.floor(Math.random() * 9000) + 1000),
    designation: 'Junior Web Developer',
    customRole1: '',
    customRole2: '',
    newDesignation: 'Developer + Client Success',
    department: 'Engineering',
    currentCtc: 360000,
    newCtc: 480000,
    incrementPercentage: 33,
    effectiveDate: '',
    performanceRating: 'Exceeds Expectations',
    achievements: 'Delivered 10+ web projects, achieved 90+ PageSpeed scores, maintained 4.8+ client satisfaction',
    hrName: 'Prasun Anand',
    hrDesignation: 'Co-Founder',
};

// ============================================
// INTERNSHIP COMPLETION CERTIFICATE
// ============================================
export interface InternshipCompletionData {
    companyName: string;
    companyTagline: string;
    refNumber: string;
    date: string;
    internName: string;
    internshipRole: string;
    department: string;
    startDate: string;
    endDate: string;
    duration: string;
    performanceRating: string;
    skills: string;
    hrName: string;
    hrDesignation: string;
}

export const initialInternshipCompletionData: InternshipCompletionData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    refNumber: 'DH/HR/IC/' + new Date().getFullYear() + '/001',
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    internName: '',
    internshipRole: 'Web Development Intern',
    department: 'Engineering',
    startDate: '',
    endDate: '',
    duration: '3 months',
    performanceRating: 'Excellent',
    skills: 'HTML, CSS, JavaScript, React, Git',
    hrName: 'Prasun Anand',
    hrDesignation: 'HR Manager',
};

// ============================================
// TRAINING COMPLETION CERTIFICATE
// ============================================
export interface TrainingCertificateData {
    companyName: string;
    companyTagline: string;
    refNumber: string;
    date: string;
    employeeName: string;
    employeeId: string;
    designation: string;
    department: string;
    trainingProgram: string;
    trainingDuration: string;
    trainingDate: string;
    completionStatus: string;
    trainerName: string;
    hrName: string;
    hrDesignation: string;
}

export const initialTrainingCertificateData: TrainingCertificateData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    refNumber: 'DH/HR/TC/' + new Date().getFullYear() + '/001',
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    employeeName: '',
    employeeId: 'EMP-',
    designation: 'Junior Web Developer',
    department: 'Engineering',
    trainingProgram: 'Advanced Web Development',
    trainingDuration: '40 hours',
    trainingDate: '',
    completionStatus: 'Successfully Completed',
    trainerName: 'Tech Team',
    hrName: 'Prasun Anand',
    hrDesignation: 'HR Manager',
};

// ============================================
// PROMOTION LETTER
// ============================================
export interface PromotionLetterData {
    companyName: string;
    companyTagline: string;
    refNumber: string;
    date: string;
    employeeName: string;
    employeeId: string;
    currentDesignation: string;
    customRole1: string;
    customRole2: string;
    newDesignation: string;
    department: string;
    effectiveDate: string;
    currentCtc: number;
    newCtc: number;
    newResponsibilities: string;
    hrName: string;
    hrDesignation: string;
}

export const initialPromotionLetterData: PromotionLetterData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    refNumber: 'DH/HR/PROM/' + new Date().getFullYear() + '/001',
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    employeeName: '',
    employeeId: 'EMP-',
    currentDesignation: 'Junior Web Developer',
    customRole1: '',
    customRole2: '',
    newDesignation: 'Web Developer',
    department: 'Engineering',
    effectiveDate: '',
    currentCtc: 360000,
    newCtc: 480000,
    newResponsibilities: 'Lead small projects, mentor juniors, handle client communication',
    hrName: 'Prasun Anand',
    hrDesignation: 'HR Manager',
};

// ============================================
// WARNING LETTER
// ============================================
export interface WarningLetterData {
    companyName: string;
    companyTagline: string;
    refNumber: string;
    date: string;
    employeeName: string;
    employeeId: string;
    designation: string;
    customRole1: string;
    customRole2: string;
    department: string;
    warningType: string;
    incidentDate: string;
    incidentDescription: string;
    previousWarnings: string;
    expectedImprovement: string;
    consequenceIfNotImproved: string;
    hrName: string;
    hrDesignation: string;
}

export const initialWarningLetterData: WarningLetterData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    refNumber: 'DH/HR/WARN/' + new Date().getFullYear() + '/001',
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    employeeName: '',
    employeeId: 'EMP-',
    designation: '',
    customRole1: '',
    customRole2: '',
    department: '',
    warningType: 'First Written Warning',
    incidentDate: '',
    incidentDescription: '',
    previousWarnings: 'None',
    expectedImprovement: 'Immediate improvement in attendance and punctuality',
    consequenceIfNotImproved: 'Further disciplinary action up to and including termination',
    hrName: 'Prasun Anand',
    hrDesignation: 'HR Manager',
};

// ============================================
// TERMINATION LETTER
// ============================================
export interface TerminationLetterData {
    companyName: string;
    companyTagline: string;
    refNumber: string;
    date: string;
    employeeName: string;
    employeeId: string;
    designation: string;
    customRole1: string;
    customRole2: string;
    department: string;
    terminationType: string;
    terminationReason: string;
    lastWorkingDate: string;
    noticePeriodStatus: string;
    settlementDetails: string;
    hrName: string;
    hrDesignation: string;
}

export const initialTerminationLetterData: TerminationLetterData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    refNumber: 'DH/HR/TERM/' + new Date().getFullYear() + '/001',
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    employeeName: '',
    employeeId: 'EMP-',
    designation: '',
    customRole1: '',
    customRole2: '',
    department: '',
    terminationType: 'Termination with Notice',
    terminationReason: '',
    lastWorkingDate: '',
    noticePeriodStatus: 'Notice period waived',
    settlementDetails: 'Full and final settlement will be processed within 45 days',
    hrName: 'Prasun Anand',
    hrDesignation: 'HR Manager',
};

// ============================================
// JOINING CONFIRMATION LETTER
// ============================================
export interface JoiningLetterData {
    companyName: string;
    companyTagline: string;
    companyAddress: string;
    refNumber: string;
    date: string;
    employeeName: string;
    employeeId: string;
    designation: string;
    customRole1: string;
    customRole2: string;
    department: string;
    joiningDate: string;
    reportingTo: string;
    location: string;
    annualCtc: number;
    probationPeriod: string;
    hrName: string;
    hrDesignation: string;
}

export const initialJoiningLetterData: JoiningLetterData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    companyAddress: COMPANY_PRESETS.address,
    refNumber: 'DH/HR/JOIN/' + new Date().getFullYear() + '/001',
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    employeeName: '',
    employeeId: 'EMP-',
    designation: 'Junior Web Developer',
    customRole1: '',
    customRole2: '',
    department: 'Engineering',
    joiningDate: '',
    reportingTo: 'Project Manager',
    location: 'Lucknow, Uttar Pradesh (Hybrid)',
    annualCtc: 360000,
    probationPeriod: '3 months (90 days)',
    hrName: 'Prasun Anand',
    hrDesignation: 'HR Manager',
};

// ============================================
// ADDRESS PROOF LETTER
// ============================================
export interface AddressProofLetterData {
    companyName: string;
    companyTagline: string;
    companyAddress: string;
    refNumber: string;
    date: string;
    employeeName: string;
    employeeId: string;
    designation: string;
    department: string;
    joiningDate: string;
    employeeAddress: string;
    purpose: string;
    hrName: string;
    hrDesignation: string;
}

export const initialAddressProofLetterData: AddressProofLetterData = {
    companyName: COMPANY_PRESETS.name,
    companyTagline: COMPANY_PRESETS.tagline,
    companyAddress: COMPANY_PRESETS.address,
    refNumber: 'DH/HR/ADDR/' + new Date().getFullYear() + '/001',
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    employeeName: '',
    employeeId: 'EMP-',
    designation: '',
    department: '',
    joiningDate: '',
    employeeAddress: '',
    purpose: 'Bank Account Opening',
    hrName: 'Prasun Anand',
    hrDesignation: 'HR Manager',
};

// Document type union
export type DocumentType = 'offer-letter' | 'salary-slip' | 'internship-letter' | 'experience-certificate' | 'relieving-letter' | 'appraisal-letter' | 'internship-completion' | 'training-certificate' | 'promotion-letter' | 'warning-letter' | 'termination-letter' | 'joining-letter' | 'address-proof';

export interface DocumentOption {
    id: DocumentType;
    label: string;
    description: string;
    icon: string;
    color: string;
}

export const DOCUMENT_OPTIONS: DocumentOption[] = [
    { id: 'offer-letter', label: 'Offer Letter', description: 'New hire offer', icon: '📄', color: 'blue' },
    { id: 'salary-slip', label: 'Salary Slip', description: 'Monthly payslip', icon: '💰', color: 'emerald' },
    { id: 'internship-letter', label: 'Internship Letter', description: 'Intern offer', icon: '🎓', color: 'purple' },
    { id: 'internship-completion', label: 'Internship Certificate', description: 'Completion cert', icon: '🎖️', color: 'violet' },
    { id: 'training-certificate', label: 'Training Certificate', description: 'Training complete', icon: '📜', color: 'indigo' },
    { id: 'joining-letter', label: 'Joining Letter', description: 'Confirmation', icon: '✅', color: 'green' },
    { id: 'promotion-letter', label: 'Promotion Letter', description: 'Promotion notice', icon: '🚀', color: 'sky' },
    { id: 'appraisal-letter', label: 'Appraisal Letter', description: 'Salary revision', icon: '📈', color: 'cyan' },
    { id: 'experience-certificate', label: 'Experience Certificate', description: 'Work experience', icon: '🏆', color: 'amber' },
    { id: 'relieving-letter', label: 'Relieving Letter', description: 'Exit document', icon: '👋', color: 'rose' },
    { id: 'warning-letter', label: 'Warning Letter', description: 'Disciplinary', icon: '⚠️', color: 'orange' },
    { id: 'termination-letter', label: 'Termination Letter', description: 'Employment end', icon: '🚫', color: 'red' },
    { id: 'address-proof', label: 'Address Proof', description: 'Address verification', icon: '🏠', color: 'slate' },
];

