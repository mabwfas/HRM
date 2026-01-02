import { useState, useEffect } from 'react';

// Role data with KRAs and KPIs
const ROLE_DATA = {
    'project-manager': {
        title: 'Project Manager',
        icon: '👨‍💼',
        reportsTo: 'General Manager',
        kras: [
            {
                title: 'PROJECT DELIVERY EXCELLENCE',
                description: 'Manage 3-5 concurrent Shopify stores from order to delivery. Own the entire project lifecycle.',
                responsibilities: [
                    'Manage 3-5 projects simultaneously',
                    'Ensure 95% on-time delivery rate',
                    'Maintain 4.8+ average client satisfaction rating',
                    'Zero projects delivered late without client approval'
                ]
            },
            {
                title: 'CLIENT COMMUNICATION & EXPECTATION MANAGEMENT',
                description: 'Be the primary point of contact for clients. Set clear expectations and manage scope effectively.',
                responsibilities: [
                    'Respond to client messages within 6 hours',
                    'Send daily progress updates with screenshots',
                    'Conduct milestone check-ins at 25%, 50%, 75%, 100%',
                    'Hold kickoff call within 48 hours of order'
                ]
            },
            {
                title: 'QUALITY ASSURANCE & RISK MANAGEMENT',
                description: 'Implement comprehensive QA process before every launch. Catch and fix issues before clients see them.',
                responsibilities: [
                    'Execute 60-point QA checklist before delivery',
                    'Ensure ZERO critical bugs at launch',
                    'Mobile PageSpeed 90+, Desktop 95+',
                    'Keep revision rate below 30%'
                ]
            },
            {
                title: 'RESOURCE COORDINATION & TEAM LEADERSHIP',
                description: 'Allocate work effectively across developers and designers. Keep team productive.',
                responsibilities: [
                    'Assign tasks based on team capacity',
                    'Maintain 75-85% team utilization rate',
                    'Identify bottlenecks and redistribute work',
                    'Conduct daily 15-min standup with team'
                ]
            },
            {
                title: 'PROCESS IMPROVEMENT & DOCUMENTATION',
                description: 'Continuously improve processes. Update SOPs and share knowledge.',
                responsibilities: [
                    'Update project SOPs quarterly',
                    'Track weekly metrics',
                    'Target 10-15% reduction in project time',
                    'Share best practices with team'
                ]
            }
        ],
        kpis: [
            { name: 'On-Time Delivery Rate', target: '95%+', measure: '(Projects on time) ÷ (Total projects) × 100' },
            { name: 'Client Satisfaction Rating', target: '4.8+', measure: 'Average of all client ratings' },
            { name: 'Response Time to Clients', target: '<6 hours', measure: 'Average client message response time' },
            { name: 'Team Utilization Rate', target: '75-85%', measure: '(Billable hours) ÷ (Available hours) × 100' },
            { name: 'First-Time Acceptance Rate', target: '70%+', measure: 'Projects approved on first delivery' }
        ],
        questions: [
            { q: 'What is the target on-time delivery rate for a Project Manager?', options: ['85%+', '90%+', '95%+', '100%'], correct: 2 },
            { q: 'Within how many hours should you respond to client messages?', options: ['2 hours', '4 hours', '6 hours', '12 hours'], correct: 2 },
            { q: 'What is the target team utilization rate?', options: ['50-60%', '65-75%', '75-85%', '85-95%'], correct: 2 },
            { q: 'At what milestones should you conduct check-ins?', options: ['50%, 100%', '25%, 50%, 75%, 100%', '33%, 66%, 100%', 'Only at 100%'], correct: 1 },
            { q: 'Within how many hours should kickoff call be held after order?', options: ['12 hours', '24 hours', '48 hours', '72 hours'], correct: 2 },
            { q: 'What is the target first-time acceptance rate?', options: ['50%+', '60%+', '70%+', '80%+'], correct: 2 },
            { q: 'How many projects should a PM manage simultaneously?', options: ['1-2', '3-5', '6-8', '10+'], correct: 1 },
            { q: 'What is the minimum mobile PageSpeed target?', options: ['80+', '85+', '90+', '95+'], correct: 2 },
            { q: 'How often should SOPs be updated?', options: ['Weekly', 'Monthly', 'Quarterly', 'Annually'], correct: 2 },
            { q: 'What is the target client satisfaction rating?', options: ['4.0+', '4.5+', '4.8+', '5.0'], correct: 2 }
        ]
    },
    'senior-developer': {
        title: 'Senior Developer',
        icon: '👨‍💻',
        reportsTo: 'General Manager / Tech Lead',
        kras: [
            {
                title: 'TECHNICAL DELIVERY & DEVELOPMENT',
                description: 'Build 2-3 high-quality Shopify stores per week while maintaining code quality.',
                responsibilities: [
                    'Complete 2-3 Shopify store projects weekly',
                    'Write clean, maintainable, well-commented code',
                    'Follow mobile-first development approach',
                    'Complete projects within estimated timeline'
                ]
            },
            {
                title: 'PERFORMANCE OPTIMIZATION',
                description: 'Achieve exceptional performance scores on all stores.',
                responsibilities: [
                    'Achieve 90+ mobile PageSpeed score (target: 92-95)',
                    'Achieve 95+ desktop PageSpeed score (target: 96-98)',
                    'Optimize all images (compress, lazy load)',
                    'Minimize custom code bloat'
                ]
            },
            {
                title: 'QUALITY ASSURANCE & TESTING',
                description: 'Deliver bug-free stores. Test thoroughly before handing to PM.',
                responsibilities: [
                    'Zero critical bugs at delivery (P1 issues)',
                    'Maximum 3 minor bugs per project',
                    'Test on Chrome, Safari, Firefox',
                    'Test on real iPhone and Android devices'
                ]
            },
            {
                title: 'CODE DOCUMENTATION & KNOWLEDGE SHARING',
                description: 'Document your work so others can maintain it.',
                responsibilities: [
                    'Comment all custom Liquid code',
                    'Update README for each project',
                    'Create changelog of modifications',
                    'Train junior developers weekly (1 hour)'
                ]
            },
            {
                title: 'TECHNICAL SUPPORT & PROBLEM SOLVING',
                description: 'Handle post-delivery technical issues quickly.',
                responsibilities: [
                    'Respond to support tickets within 4 hours',
                    'Resolve P1 (critical) issues within 24 hours',
                    'Resolve P2 (high) issues within 48 hours',
                    'Maintain 90%+ first-contact resolution rate'
                ]
            }
        ],
        kpis: [
            { name: 'Projects Completed Per Week', target: '2-3', measure: 'Count of projects moved to Delivered status' },
            { name: 'PageSpeed Mobile Score', target: '90+', measure: 'Google PageSpeed Insights mobile score' },
            { name: 'PageSpeed Desktop Score', target: '95+', measure: 'Google PageSpeed Insights desktop score' },
            { name: 'Bug Rate', target: '<5 bugs/project', measure: 'Bugs found after marking complete' },
            { name: 'Code Quality Score', target: '7+/10', measure: 'Subjective score from PM/Tech Lead' }
        ],
        questions: [
            { q: 'How many Shopify stores should a Senior Developer complete per week?', options: ['1-2', '2-3', '3-4', '4-5'], correct: 1 },
            { q: 'What is the target mobile PageSpeed score?', options: ['80+', '85+', '90+', '95+'], correct: 2 },
            { q: 'What is the target desktop PageSpeed score?', options: ['85+', '90+', '95+', '98+'], correct: 2 },
            { q: 'Within how many hours should P1 (critical) issues be resolved?', options: ['4 hours', '12 hours', '24 hours', '48 hours'], correct: 2 },
            { q: 'What is the maximum acceptable bug rate per project?', options: ['2 bugs', '3 bugs', '5 bugs', '10 bugs'], correct: 2 },
            { q: 'How often should junior developers be trained?', options: ['Daily', 'Weekly (1 hour)', 'Bi-weekly', 'Monthly'], correct: 1 },
            { q: 'Within how many hours should support tickets get a response?', options: ['1 hour', '2 hours', '4 hours', '8 hours'], correct: 2 },
            { q: 'What is the target code quality score?', options: ['5+/10', '6+/10', '7+/10', '8+/10'], correct: 2 },
            { q: 'What is the first-contact resolution rate target?', options: ['70%+', '80%+', '90%+', '95%+'], correct: 2 },
            { q: 'How many P1 (critical) bugs are acceptable at delivery?', options: ['Zero', '1', '2', '3'], correct: 0 }
        ]
    },
    'junior-developer': {
        title: 'Junior Developer',
        icon: '👨‍💻',
        reportsTo: 'Senior Developer / Team Lead',
        kras: [
            {
                title: 'BASIC SHOPIFY STORE DEVELOPMENT',
                description: 'Build 1-2 Shopify stores per week under senior developer guidance.',
                responsibilities: [
                    'Complete 1-2 store projects weekly',
                    'Follow senior developer technical guidance',
                    'Implement designs accurately from Figma',
                    'Meet assigned deadlines'
                ]
            },
            {
                title: 'PERFORMANCE & QUALITY STANDARDS',
                description: 'Achieve good performance scores with senior developer support.',
                responsibilities: [
                    'Achieve 85+ mobile PageSpeed score',
                    'Achieve 90+ desktop PageSpeed score',
                    'Keep bugs below 5 per project',
                    'Follow QA checklist before submission'
                ]
            },
            {
                title: 'LEARNING & SKILL DEVELOPMENT',
                description: 'Continuously improve your Shopify and coding skills.',
                responsibilities: [
                    'Complete weekly training with senior developer',
                    'Practice new techniques on development stores',
                    'Ask questions when stuck',
                    'Study Shopify docs 30 mins daily'
                ]
            },
            {
                title: 'CODE QUALITY & BEST PRACTICES',
                description: 'Write clean code following team standards.',
                responsibilities: [
                    'Follow naming conventions',
                    'Comment your code clearly',
                    'Keep code organized and formatted',
                    'Get code reviewed before final submission'
                ]
            },
            {
                title: 'COMMUNICATION & COLLABORATION',
                description: 'Communicate clearly with team. Update progress daily.',
                responsibilities: [
                    'Post daily standup before 9:30 AM',
                    'Update PM on project progress',
                    'Report blockers immediately',
                    'Respond to messages within 2 hours'
                ]
            }
        ],
        kpis: [
            { name: 'Projects Completed Per Week', target: '1-2', measure: 'Count of projects delivered' },
            { name: 'PageSpeed Mobile Score', target: '85+', measure: 'Google PageSpeed Insights mobile score' },
            { name: 'PageSpeed Desktop Score', target: '90+', measure: 'Google PageSpeed Insights desktop score' },
            { name: 'Bug Rate', target: '<5 bugs/project', measure: 'Bugs found in first review' },
            { name: 'Code Quality Score', target: '7+/10', measure: 'Senior developer rating' }
        ],
        questions: [
            { q: 'How many Shopify stores should a Junior Developer complete per week?', options: ['0.5-1', '1-2', '2-3', '3-4'], correct: 1 },
            { q: 'What is the target mobile PageSpeed score for Junior Developers?', options: ['75+', '80+', '85+', '90+'], correct: 2 },
            { q: 'What is the target desktop PageSpeed score?', options: ['85+', '90+', '95+', '98+'], correct: 1 },
            { q: 'By what time should daily standup be posted?', options: ['8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM'], correct: 2 },
            { q: 'How long should you study Shopify docs daily?', options: ['15 mins', '30 mins', '45 mins', '1 hour'], correct: 1 },
            { q: 'Within how many hours should you respond to messages?', options: ['1 hour', '2 hours', '4 hours', '6 hours'], correct: 1 },
            { q: 'What is the maximum acceptable bug rate per project?', options: ['2 bugs', '3 bugs', '5 bugs', '8 bugs'], correct: 2 },
            { q: 'What should you do when stuck for more than 30 minutes?', options: ['Keep trying alone', 'Ask for help', 'Skip the task', 'Wait until tomorrow'], correct: 1 },
            { q: 'What is the target code quality score?', options: ['5+/10', '6+/10', '7+/10', '8+/10'], correct: 2 },
            { q: 'Who should review your code before final submission?', options: ['PM', 'HR', 'Senior Developer', 'Client'], correct: 2 }
        ]
    },
    'designer': {
        title: 'Designer',
        icon: '🎨',
        reportsTo: 'General Manager',
        kras: [
            {
                title: 'DESIGN DELIVERY & CREATIVITY',
                description: 'Create 3-4 complete Figma mockups per week.',
                responsibilities: [
                    'Deliver 3-4 complete store designs weekly',
                    'Complete designs within 3-5 days from brief',
                    'Create mobile + desktop mockups',
                    'Maintain brand consistency'
                ]
            },
            {
                title: 'DESIGN QUALITY & APPROVAL RATE',
                description: 'Get designs approved on first or second attempt.',
                responsibilities: [
                    'Achieve 70%+ first-design approval rate',
                    '100% mobile-responsive designs',
                    '95%+ adherence to brand guidelines',
                    'Maximum 2 revision rounds per project'
                ]
            },
            {
                title: 'ASSET PREPARATION & HANDOFF',
                description: 'Provide developers with complete, organized asset packages.',
                responsibilities: [
                    'Export all assets optimized (PNG, JPG, SVG)',
                    'Compress images before delivery',
                    'Organize files clearly (folders by page)',
                    'Attend handoff meeting with developer'
                ]
            },
            {
                title: 'CLIENT COLLABORATION & REVISIONS',
                description: 'Work directly with clients during design phase.',
                responsibilities: [
                    'Attend design review calls',
                    'Present designs confidently',
                    'Incorporate feedback within 24 hours',
                    'Explain design decisions clearly'
                ]
            },
            {
                title: 'DESIGN SYSTEMS & CONSISTENCY',
                description: 'Build reusable design components.',
                responsibilities: [
                    'Create reusable Figma components',
                    'Maintain design system library',
                    'Use consistent spacing, typography, colors',
                    'Document design patterns'
                ]
            }
        ],
        kpis: [
            { name: 'Designs Delivered Per Week', target: '3-4', measure: 'Complete design packages delivered' },
            { name: 'First-Approval Rate', target: '70%+', measure: 'Designs approved without revisions' },
            { name: 'Asset Quality Score', target: '90%+', measure: 'Complete, error-free handoffs' },
            { name: 'Handoff Quality Rating', target: '8+/10', measure: 'Developer rating of handoff' },
            { name: 'Average Revision Rounds', target: '<2', measure: 'Rounds until final approval' }
        ],
        questions: [
            { q: 'How many complete store designs should a Designer deliver per week?', options: ['1-2', '2-3', '3-4', '4-5'], correct: 2 },
            { q: 'What is the target first-approval rate?', options: ['50%+', '60%+', '70%+', '80%+'], correct: 2 },
            { q: 'Within how many days should designs be completed from brief?', options: ['1-2 days', '3-5 days', '7-10 days', '14 days'], correct: 1 },
            { q: 'What is the target asset quality score?', options: ['70%+', '80%+', '90%+', '95%+'], correct: 2 },
            { q: 'Within how many hours should feedback be incorporated?', options: ['12 hours', '24 hours', '48 hours', '72 hours'], correct: 1 },
            { q: 'What is the maximum number of revision rounds per project?', options: ['1', '2', '3', '4'], correct: 1 },
            { q: 'What is the target handoff quality rating?', options: ['6+/10', '7+/10', '8+/10', '9+/10'], correct: 2 },
            { q: 'What percentage of designs should be mobile-responsive?', options: ['80%', '90%', '95%', '100%'], correct: 3 },
            { q: 'What should be included in asset handoff?', options: ['Only PNG files', 'Only mobile designs', 'Optimized assets + documentation', 'Raw files only'], correct: 2 },
            { q: 'What is the target adherence to brand guidelines?', options: ['80%+', '85%+', '90%+', '95%+'], correct: 3 }
        ]
    },
    'sales-executive': {
        title: 'Sales Executive',
        icon: '💰',
        reportsTo: 'General Manager',
        commission: '5% of order value',
        kras: [
            {
                title: 'RAPID RESPONSE & LEAD ENGAGEMENT',
                description: 'Respond to all inquiries within 1 hour. First response wins 40% more conversions.',
                responsibilities: [
                    'Reply within 1 hour to all inquiries (Target: <30 mins)',
                    'Monitor Fiverr inbox 12 hours/day',
                    'Handle 40-60 inquiries per week',
                    'Professional, engaging responses'
                ]
            },
            {
                title: 'LEAD QUALIFICATION & CONVERSION',
                description: 'Qualify leads using scoring system. Focus on serious buyers.',
                responsibilities: [
                    'Use 15-point lead scoring system',
                    'Achieve 15-25% inquiry-to-order conversion',
                    'Focus 80% time on Hot leads (10-15 points)',
                    'Politely disengage from time-wasters'
                ]
            },
            {
                title: 'CUSTOM PROPOSALS & VALUE COMMUNICATION',
                description: 'Create compelling custom offers within 24 hours.',
                responsibilities: [
                    'Custom proposal within 24 hours of qualification',
                    'Achieve 25-40% proposal-to-order conversion',
                    'Include portfolio, process, timeline, pricing',
                    'Address objections proactively'
                ]
            },
            {
                title: 'MONTHLY REVENUE TARGET',
                description: 'Generate $15K-25K in monthly order value.',
                responsibilities: [
                    'Close $15K-25K monthly ($3K-5K weekly)',
                    'Maintain pipeline of $45K-75K',
                    'Focus on Standard ($600-900) and Premium ($1200-2000)',
                    'Track conversion funnel weekly'
                ]
            },
            {
                title: 'SMOOTH CLIENT HANDOFF',
                description: 'Gather complete requirements during sales.',
                responsibilities: [
                    'Complete requirements form during sales',
                    'Conduct discovery call for $1000+ orders',
                    'Handoff within 2 hours of order',
                    '90%+ client satisfaction with sales experience'
                ]
            }
        ],
        kpis: [
            { name: 'Average Response Time', target: '<1 hour', measure: 'Time from inquiry to first response' },
            { name: 'Inquiries Handled Per Week', target: '40+', measure: 'Total inquiries responded to' },
            { name: 'Inquiry-to-Order Conversion', target: '15-25%', measure: '(Orders) ÷ (Total inquiries) × 100' },
            { name: 'Weekly Revenue Generated', target: '$3K-5K', measure: 'Sum of all order values' },
            { name: 'Pipeline Value', target: '$9K-15K', measure: 'Total value of active proposals + leads' }
        ],
        questions: [
            { q: 'What is the target response time to inquiries?', options: ['<15 minutes', '<30 minutes', '<1 hour', '<2 hours'], correct: 2 },
            { q: 'How many inquiries should be handled per week?', options: ['20+', '30+', '40+', '50+'], correct: 2 },
            { q: 'What is the target inquiry-to-order conversion rate?', options: ['5-10%', '10-15%', '15-25%', '25-35%'], correct: 2 },
            { q: 'What is the weekly revenue target?', options: ['$1K-2K', '$2K-3K', '$3K-5K', '$5K-8K'], correct: 2 },
            { q: 'Within how many hours should custom proposal be sent?', options: ['6 hours', '12 hours', '24 hours', '48 hours'], correct: 2 },
            { q: 'What percentage of time should be spent on Hot leads?', options: ['50%', '60%', '70%', '80%'], correct: 3 },
            { q: 'What is the pipeline value target (3X rule)?', options: ['$3K-6K', '$6K-9K', '$9K-15K', '$15K-25K'], correct: 2 },
            { q: 'Within how many hours should client handoff happen after order?', options: ['1 hour', '2 hours', '4 hours', '6 hours'], correct: 1 },
            { q: 'What is the commission percentage?', options: ['3%', '5%', '7%', '10%'], correct: 1 },
            { q: 'For orders above what amount is discovery call required?', options: ['$500+', '$800+', '$1000+', '$1500+'], correct: 2 }
        ]
    },
    'hr-manager': {
        title: 'HR Manager',
        icon: '👥',
        reportsTo: 'Managing Director / General Manager',
        kras: [
            {
                title: 'RECRUITMENT & HIRING',
                description: 'Complete hiring process within 14 days from JD approval.',
                responsibilities: [
                    'Complete hiring cycle in 14 days',
                    'Shortlist 5 qualified candidates for interview',
                    '80%+ new hire retention after 90-day probation',
                    'Maintain pipeline for future hires'
                ]
            },
            {
                title: 'ONBOARDING & INTEGRATION',
                description: 'Execute flawless Day 1 onboarding.',
                responsibilities: [
                    'Complete 100% of Day 1 onboarding checklist',
                    'New hire productive by Day 3',
                    '90%+ new hire satisfaction with onboarding',
                    'All documentation complete before joining'
                ]
            },
            {
                title: 'PERFORMANCE MANAGEMENT',
                description: 'Conduct monthly performance reviews for all team members.',
                responsibilities: [
                    'Monthly 1-on-1 reviews with each team member',
                    'Track KPIs weekly, share with management',
                    'Address performance issues within 48 hours',
                    'Document all reviews and PIPs'
                ]
            },
            {
                title: 'TEAM ENGAGEMENT & CULTURE',
                description: 'Keep team happy, motivated, and engaged.',
                responsibilities: [
                    'Organize monthly team activity/celebration',
                    'Maintain 85%+ team satisfaction score',
                    'Employee turnover below 20% annually',
                    'Quick resolution of team conflicts'
                ]
            },
            {
                title: 'HR OPERATIONS & COMPLIANCE',
                description: 'Handle payroll, leaves, and HR admin flawlessly.',
                responsibilities: [
                    'Payroll processed by 1st of every month',
                    'Leave management with 100% accuracy',
                    'Updated employee records for all team members',
                    'Compliance with labor laws'
                ]
            }
        ],
        kpis: [
            { name: 'Hiring Cycle Time', target: '≤14 days', measure: 'Days from JD approval to offer accepted' },
            { name: 'New Hire Retention (90 days)', target: '80%+', measure: 'Completed probation ÷ Total new hires' },
            { name: 'Onboarding Completion Rate', target: '100%', measure: 'Day 1 checklist items completed' },
            { name: 'Team Satisfaction Score', target: '8+/10', measure: 'Monthly anonymous survey average' },
            { name: 'Payroll Accuracy', target: '100%', measure: 'Error-free payroll months' }
        ],
        questions: [
            { q: 'What is the target hiring cycle time?', options: ['7 days', '10 days', '14 days', '21 days'], correct: 2 },
            { q: 'What is the target new hire retention rate after 90 days?', options: ['60%+', '70%+', '80%+', '90%+'], correct: 2 },
            { q: 'What is the target onboarding completion rate?', options: ['90%', '95%', '98%', '100%'], correct: 3 },
            { q: 'By which day should new hire be productive?', options: ['Day 1', 'Day 3', 'Day 5', 'Day 7'], correct: 1 },
            { q: 'What is the target team satisfaction score?', options: ['6+/10', '7+/10', '8+/10', '9+/10'], correct: 2 },
            { q: 'Within how many hours should performance issues be addressed?', options: ['24 hours', '48 hours', '72 hours', '1 week'], correct: 1 },
            { q: 'What is the target payroll accuracy?', options: ['95%', '98%', '99%', '100%'], correct: 3 },
            { q: 'How many candidates should be shortlisted for interview?', options: ['3', '5', '7', '10'], correct: 1 },
            { q: 'What is the maximum acceptable annual employee turnover?', options: ['10%', '15%', '20%', '25%'], correct: 2 },
            { q: 'By which date should payroll be processed each month?', options: ['1st', '5th', '7th', '10th'], correct: 0 }
        ]
    }
};

interface KRASubmission {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    roleTitle: string;
    submittedAt: string;
    answers: number[];
    score: number;
    totalQuestions: number;
}

// API Base URL - uses relative path on Vercel
const API_BASE = '/api';

// Storage functions using Vercel API
const getKRASubmissions = async (): Promise<KRASubmission[]> => {
    try {
        const response = await fetch(`${API_BASE}/kra-submissions`);
        if (response.ok) {
            return await response.json();
        }
        // Fallback to localStorage if API fails
        const data = localStorage.getItem('kra_submissions');
        return data ? JSON.parse(data) : [];
    } catch {
        // Fallback to localStorage
        const data = localStorage.getItem('kra_submissions');
        return data ? JSON.parse(data) : [];
    }
};

const saveKRASubmission = async (submission: KRASubmission): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE}/kra-submissions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submission),
        });
        if (response.ok) {
            return true;
        }
        // Fallback to localStorage
        const submissions = JSON.parse(localStorage.getItem('kra_submissions') || '[]');
        submissions.unshift(submission);
        localStorage.setItem('kra_submissions', JSON.stringify(submissions));
        return true;
    } catch {
        // Fallback to localStorage
        const submissions = JSON.parse(localStorage.getItem('kra_submissions') || '[]');
        submissions.unshift(submission);
        localStorage.setItem('kra_submissions', JSON.stringify(submissions));
        return true;
    }
};

export default function KRAKPIManual() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [answers, setAnswers] = useState<number[]>([]);

    const roles = Object.entries(ROLE_DATA).map(([key, data]) => ({
        key,
        ...data
    }));

    const roleData = selectedRole ? ROLE_DATA[selectedRole as keyof typeof ROLE_DATA] : null;
    const totalPages = roleData ? roleData.kras.length + 1 : 0; // KRAs + KPIs summary page

    useEffect(() => {
        if (roleData) {
            setAnswers(Array(roleData.questions.length).fill(-1));
        }
    }, [selectedRole]);

    const handleRoleSelect = (roleKey: string) => {
        setSelectedRole(roleKey);
        setCurrentPage(0);
        setShowQuiz(false);
        setShowSuccess(false);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        } else {
            setShowQuiz(true);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (showQuiz) {
            setShowQuiz(false);
        } else if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        } else {
            setSelectedRole(null);
        }
    };

    const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerIndex;
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        if (!name.trim() || !email.trim() || !phone.trim()) {
            alert('Please enter your name, email, and phone number.');
            return;
        }
        if (answers.includes(-1)) {
            alert('Please answer all questions before submitting.');
            return;
        }

        let score = 0;
        answers.forEach((answer, index) => {
            if (answer === roleData!.questions[index].correct) {
                score++;
            }
        });

        const submission: KRASubmission = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            role: selectedRole!,
            roleTitle: roleData!.title,
            submittedAt: new Date().toISOString(),
            answers,
            score,
            totalQuestions: roleData!.questions.length
        };

        await saveKRASubmission(submission);
        setShowSuccess(true);
    };

    // Role Selection Screen
    if (!selectedRole) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-white mb-4">📊 KRA & KPI Training</h1>
                        <p className="text-indigo-200 text-lg">Select your role to view your Key Result Areas and Key Performance Indicators</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {roles.map((role) => (
                            <button
                                key={role.key}
                                onClick={() => handleRoleSelect(role.key)}
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-left hover:bg-white/20 transition-all hover:scale-105 group"
                            >
                                <div className="text-4xl mb-3">{role.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                                <p className="text-sm text-indigo-300">Reports to: {role.reportsTo}</p>
                                <div className="mt-3 text-xs text-indigo-400">
                                    {role.kras.length} KRAs • {role.kpis.length} KPIs • 10 Questions
                                </div>
                                <div className="mt-4 text-indigo-300 group-hover:text-white transition-colors text-sm font-medium">
                                    Start Training →
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Success Screen with Animation
    if (showSuccess) {
        const score = answers.reduce((acc, answer, index) => {
            return acc + (answer === roleData!.questions[index].correct ? 1 : 0);
        }, 0);

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
                <div className="text-center">
                    {/* Animated Welcome */}
                    <div className="animate-bounce mb-8">
                        <div className="text-8xl mb-4">🎉</div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg mx-auto">
                        <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                            Welcome to Digital Heroes!
                        </h1>

                        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <span className="text-white text-4xl">{roleData?.icon}</span>
                        </div>

                        <p className="text-slate-700 text-lg mb-4">
                            <strong>{name}</strong>, you've completed your {roleData?.title} KRA/KPI training!
                        </p>

                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                            <p className="text-lg font-bold text-slate-800 mb-2">Your Score</p>
                            <p className="text-4xl font-black text-purple-600">{score}/{roleData?.questions.length}</p>
                            <p className="text-slate-600">{Math.round((score / roleData!.questions.length) * 100)}% Correct</p>
                        </div>

                        {score >= 8 ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                <p className="text-green-800 font-medium">
                                    🏆 Excellent! You understand your role responsibilities thoroughly. Time to make an impact!
                                </p>
                            </div>
                        ) : score >= 6 ? (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                <p className="text-yellow-800 font-medium">
                                    👍 Good job! Review the areas you missed and you'll be ready to excel!
                                </p>
                            </div>
                        ) : (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <p className="text-red-800 font-medium">
                                    📚 Please review the KRA/KPI material again to ensure you understand your responsibilities.
                                </p>
                            </div>
                        )}

                        <p className="text-slate-500 text-sm">
                            Your success = Our success. Let's build something remarkable together! 🚀
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Quiz Screen
    if (showQuiz && roleData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-white mb-2">📝 {roleData.title} Quiz</h1>
                        <p className="text-indigo-200">Answer all 10 questions to complete your KRA/KPI training</p>
                    </div>

                    {/* User Info */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Your Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Questions */}
                    <div className="space-y-6">
                        {roleData.questions.map((q, qIndex) => (
                            <div key={qIndex} className="bg-white rounded-xl shadow-lg p-6">
                                <p className="font-bold text-slate-800 mb-4">
                                    <span className="text-indigo-600">Q{qIndex + 1}.</span> {q.q}
                                </p>
                                <div className="space-y-2">
                                    {q.options.map((option, oIndex) => (
                                        <label
                                            key={oIndex}
                                            className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${answers[qIndex] === oIndex
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-slate-200 hover:border-indigo-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${qIndex}`}
                                                checked={answers[qIndex] === oIndex}
                                                onChange={() => handleAnswerChange(qIndex, oIndex)}
                                                className="w-4 h-4 text-indigo-600"
                                            />
                                            <span className="ml-3 text-slate-700">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                        >
                            ← Back to KPIs
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg"
                        >
                            Submit & Complete Training ✓
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Content Pages
    const isKRAPage = currentPage < roleData!.kras.length;
    const kra = isKRAPage ? roleData!.kras[currentPage] : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-indigo-200 mb-2">
                        <span>{roleData?.icon} {roleData?.title}</span>
                        <span>Page {currentPage + 1} of {totalPages}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {isKRAPage && kra ? (
                        <>
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-4">
                                <div className="text-indigo-200 text-sm mb-1">KRA {currentPage + 1} of {roleData!.kras.length}</div>
                                <h1 className="text-xl font-bold text-white">📌 {kra.title}</h1>
                            </div>
                            <div className="px-6 py-6">
                                <p className="text-slate-700 mb-6 text-lg">{kra.description}</p>
                                <h3 className="font-bold text-slate-800 mb-4">Your Responsibilities:</h3>
                                <ul className="space-y-3">
                                    {kra.responsibilities.map((resp, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="text-green-500 mt-1">✓</span>
                                            <span className="text-slate-700">{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-gradient-to-r from-purple-600 to-pink-700 px-6 py-4">
                                <h1 className="text-xl font-bold text-white">📊 Key Performance Indicators (KPIs)</h1>
                            </div>
                            <div className="px-6 py-6">
                                <p className="text-slate-600 mb-6">These are the metrics we use to measure your success:</p>
                                <div className="space-y-4">
                                    {roleData!.kpis.map((kpi, idx) => (
                                        <div key={idx} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-slate-800">{idx + 1}. {kpi.name}</h4>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                                                    Target: {kpi.target}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600">📏 Measure: {kpi.measure}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                    >
                        ← {currentPage === 0 ? 'Change Role' : 'Previous'}
                    </button>
                    <div className="flex gap-1">
                        {Array(totalPages).fill(0).map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-colors ${idx === currentPage ? 'bg-indigo-500' :
                                    idx < currentPage ? 'bg-indigo-300' : 'bg-slate-500'
                                    }`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg"
                    >
                        {currentPage === totalPages - 1 ? 'Take Quiz →' : 'Next →'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Submissions Viewer
export function KRASubmissions() {
    const [submissions, setSubmissions] = useState<KRASubmission[]>([]);

    useEffect(() => {
        const loadSubmissions = async () => {
            const data = await getKRASubmissions();
            setSubmissions(data);
        };
        loadSubmissions();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800">📊 KRA/KPI Training Submissions</h1>
                        <p className="text-slate-600">Total: {submissions.length} submissions</p>
                    </div>
                    <a
                        href="/"
                        className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        ← Back to Dashboard
                    </a>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-indigo-900 text-white">
                                <tr>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">#</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Name</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Email</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Phone</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Role</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Score</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Date</th>
                                    {Array(10).fill(0).map((_, idx) => (
                                        <th key={idx} className="px-1 py-3 text-center text-xs font-semibold">Q{idx + 1}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {submissions.length === 0 ? (
                                    <tr>
                                        <td colSpan={17} className="px-4 py-8 text-center text-slate-500">
                                            No submissions yet
                                        </td>
                                    </tr>
                                ) : (
                                    submissions.map((sub, idx) => (
                                        <tr key={sub.id} className="hover:bg-slate-50">
                                            <td className="px-3 py-2 text-xs text-slate-600">{idx + 1}</td>
                                            <td className="px-3 py-2 text-xs font-medium text-slate-800">{sub.name}</td>
                                            <td className="px-3 py-2 text-xs text-slate-600">{sub.email}</td>
                                            <td className="px-3 py-2 text-xs text-slate-600">{sub.phone || '-'}</td>
                                            <td className="px-3 py-2">
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                                                    {sub.roleTitle}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${sub.score >= 8 ? 'bg-green-100 text-green-800' :
                                                    sub.score >= 6 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {sub.score}/{sub.totalQuestions}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-xs text-slate-600">{formatDate(sub.submittedAt)}</td>
                                            {sub.answers?.map((answer, aIdx) => {
                                                const roleQuestions = ROLE_DATA[sub.role as keyof typeof ROLE_DATA]?.questions;
                                                const isCorrect = roleQuestions && answer === roleQuestions[aIdx]?.correct;
                                                return (
                                                    <td key={aIdx} className="px-1 py-2 text-center">
                                                        <span className={`inline-flex w-5 h-5 items-center justify-center rounded-full text-xs font-bold ${isCorrect
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                            }`}>
                                                            {String.fromCharCode(65 + answer)}
                                                        </span>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
