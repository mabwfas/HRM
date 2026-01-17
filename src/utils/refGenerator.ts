// Utility function to generate unique reference numbers and certificate codes
// Format: DMH/{TYPE}/{YYYYMMDD}/{INITIALS}-{RANDOM}

export const generateRefNumber = (name: string, type: string): string => {
    // Get employee initials (first letter of each word in name)
    const initials = (name || 'XX')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 3)
        .padEnd(2, 'X');

    // Get current date in YYYYMMDD format
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');

    // Generate 4-digit random number
    const randomNum = Math.floor(1000 + Math.random() * 9000);

    return `DMH/${type}/${dateStr}/${initials}-${randomNum}`;
};

// Generate Employee ID based on name
// Format: DMH{INITIALS}{RANDOM}
export const generateEmployeeId = (name: string): string => {
    const initials = (name || 'XX')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 3)
        .padEnd(2, 'X');

    const randomNum = Math.floor(100 + Math.random() * 900);
    return `DMH${initials}${randomNum}`;
};

// Document type codes
export const DOC_TYPES = {
    LOR: 'LOR',           // Letter of Recommendation
    IC: 'IC',             // Internship Certificate
    TRN: 'TRN',           // Training Certificate
    EXP: 'EXP',           // Experience Certificate
    WRN: 'WRN',           // Warning Letter
    PRM: 'PRM',           // Promotion Letter
    TRM: 'TRM',           // Termination Letter
    REL: 'REL',           // Relieving Letter
    APR: 'APR',           // Appraisal Letter
    JON: 'JON',           // Joining Letter
    ADR: 'ADR',           // Address Proof Letter
    OFR: 'OFR',           // Offer Letter
    INT: 'INT',           // Internship Offer Letter
    SAL: 'SAL',           // Salary Slip
} as const;

