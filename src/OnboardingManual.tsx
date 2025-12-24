import { useState, useEffect } from 'react';

// Onboarding Manual Content - Split into pages
const MANUAL_PAGES = [
    {
        title: "👋 WELCOME TO DIGITAL HEROES",
        content: `You're now part of something bigger than a job.

**WHO WE ARE:**
→ Founded: 2020 by the team that built Digital Heroes
→ 2.5M+ YouTube subscribers (Digital Marketing Heroes)
→ Shopify-exclusive agency on Fiverr
→ Built and sold ecommerce brands (₹2.1+ crore exits)
→ Team: 8-10 people (hybrid work model)

**WHAT WE DO:**
We don't just build Shopify stores. We build conversion machines that make our clients money.

**WHERE WE'RE GOING:**

Our mission is simple: Become the best online service agency in the world.

→ 2026: Top 100 digital agency globally
→ 2027: Known worldwide for exceptional Shopify stores
→ 2028: The gold standard for ecommerce excellence

We're not chasing revenue numbers. We're chasing MASTERY.

When clients think "world-class Shopify store," they should think of us first. When other agencies look for inspiration, they should study our work. When entrepreneurs need transformation, they should trust us completely.

Excellence is the goal. Revenue is just the scorecard.

You're joining us on this journey. Your success = Our success.`
    },
    {
        title: "⚡ WHAT WE EXPECT FROM YOU",
        content: `This isn't a typical company. We have high standards because we're building something exceptional.

**DISCIPLINE IS YOUR GREATEST INVESTMENT**

Nobody will watch you work. You watch yourself.

Discipline = Doing the work even when you don't feel like it.

That moment when your body says "rest" but your mind says "execute"? That's when you're building who you really are. Every time you choose discipline, you win. Not for us. For YOU.

**TALENT IS IRRELEVANT. VOLUME IS EVERYTHING.**

Think you lack skills? Good—now you know what to do.

→ Put in 100 hours learning
→ Analyze your progress
→ Need more? Put in 500 hours

The people you admire didn't start with talent—they started with commitment.

We don't care about your degree. We care about your OUTPUT.

VOLUME BUILDS MASTERY. YOU CONTROL THE PACE.`
    },
    {
        title: "💬 EMOTIONAL INTELLIGENCE & WORK ETHIC",
        content: `**EMOTIONAL INTELLIGENCE > IQ**

People with high EQ don't just perform better—they LIVE better.

→ They build real relationships
→ They influence outcomes
→ They lead
→ They're respected

Check yourself:
→ How do you respond under pressure?
→ How do you treat people when frustrated?
→ How emotionally intelligent are you?

Master this, and everything else gets easier.

**ALWAYS FIND MORE MEANINGFUL WORK**

Never wait for approval. Always think:
→ "How can I do this better?"
→ "What else needs to be done?"
→ "How can I add more value?"

We don't promote based on time served. We promote based on VALUE CREATED.

Waiting is wasting your time. Never kill time. Always do something that builds your skills.

**INSTANT REPLY = RESPECT**

When you respond quickly to teammates, clients, and management, you're showing CHARACTER.

You're saying:
→ "I respect you"
→ "I'm reliable"
→ "I care about this"

This isn't about surveillance. It's about you deciding to be someone people TRUST.`
    },
    {
        title: "🧠 MINDSET & PRIORITIES",
        content: `**PROTECT YOUR MINDSET**

Stop thinking negative thoughts about yourself, the team, or the work.

If you catch yourself thinking negatively:
→ Figure out what causes it
→ Kill those habits
→ Change your environment
→ Build character that helps your growth

Your mindset is your responsibility. Guard it fiercely.

**CLIENTS AREN'T A BURDEN—THEY'RE YOUR OPPORTUNITY**

When a client succeeds, it's because of YOU.
When they fail, you feel it.

That responsibility is a gift. It means your work MATTERS.

Approach every client like you're personally invested in their success. Because you should be. That's not servitude—that's PRIDE in your craft.

**WORK = HIGHEST PRIORITY**

There is nothing better in life than meaningful work.

When your actions help someone, you feel satisfied automatically. You must help your clients with ALL your heart.

These clients will help others with their products/services. You're a contributor in this beautiful cycle.

Real satisfaction comes from BUILDING something that matters.

**80/20 PRINCIPLE**

→ 80% of your time: Productive work that builds skill and delivers results
→ 20% of your time: Everything else (breaks, rest, fun)

Monitor yourself. Track your activities. Know where every hour goes.`
    },
    {
        title: "🚨 CRITICAL RULES - IMMEDIATE TERMINATION",
        content: `These aren't negotiable. There are no warnings. No second chances.

**IGNORING MESSAGES = INSTANT TERMINATION**

If someone from the team or management messages you and you ignore it? You're done.

No exceptions. No explanations. This is THE #1 termination reason.

Why? Because we serve global clients. Our reputation depends on reliability.

**CLIENT DATA BREACH = TERMINATION + LEGAL ACTION**

→ Sharing client info outside company
→ Leaking confidential data
→ Sharing passwords/access with outsiders
→ Using client data for personal projects

This isn't just termination. This is LEGAL ACTION. We will pursue it.

**POOR CLIENT COMMUNICATION (3 STRIKES)**

→ 1st offense: ₹500 penalty + written warning
→ 2nd offense: ₹1,000 penalty + final warning
→ 3rd offense: TERMINATION

**RESPONSE TIME REQUIREMENTS:**

| Who | Response Time |
|-----|---------------|
| Client messages | <2 hours |
| Manager messages | <1 hour |
| Team messages | <2 hours |
| Emergency | <15 minutes |

**MOONLIGHTING = TERMINATION**

→ Working for competitors
→ Taking client projects directly (bypassing company)
→ Using company resources for personal work

**HARASSMENT OF ANY KIND = TERMINATION**

Zero tolerance. One proven incident = Out.`
    },
    {
        title: "⏰ WORKING HOURS & ATTENDANCE",
        content: `**STANDARD HOURS:**
→ Monday to Saturday: 9:00 AM - 6:00 PM
→ Sunday: Off
→ Lunch: 1:00 PM - 2:00 PM (1 hour)
→ Tea breaks: 15 min (morning & evening)

**FIVERR SALES TEAM (Special Hours):**
→ Must be available/responsive: 9 AM - 9 PM

**LATE ARRIVAL POLICY:**

Arrive after 9:15 AM = Half-day salary deduction

Late arrivals per month:
→ 3 times: Verbal warning
→ 5 times: Written warning
→ 7+ times: Termination review

**UNEXPLAINED ABSENCE:**

Must inform BEFORE 9:00 AM via WhatsApp to manager.

Unexplained absences:
→ 1st: Written warning
→ 3rd: 3 days salary deduction
→ 5th: Termination

**PROBATION PERIOD:**

→ First 90 days = Probation
→ Either party can end with 7 days notice
→ After probation: 30 days notice required

During probation, we're evaluating:
→ Can you do the work?
→ Are you reliable?
→ Do you fit the culture?
→ Are you learning fast?`
    },
    {
        title: "📅 LEAVE POLICY",
        content: `**ANNUAL LEAVE ENTITLEMENT:**

→ Casual Leave (CL): 12 days per year
→ Sick Leave (SL): 6 days per year (medical certificate needed for 2+ consecutive days)
→ Earned Leave (EL): 1 day per month after completing 1 year
→ National Holidays: ~10 days per year

CL and SL don't carry forward. Use them or lose them.

**HOW TO APPLY FOR LEAVE:**

Minimum 3 days advance notice (except emergencies)
Post in #ask-hr with:
- Name
- Type: CL/SL/EL
- Dates: From to To
- Reason
- Work coverage: Who's handling your work

**LEAVE RESTRICTIONS:**

❌ No leave in first 2 months (probation) unless emergency
❌ No leave during month-end (25th-5th) unless emergency
❌ Maximum 3 consecutive CL without medical certificate

**MEDICAL CERTIFICATE:**

Required for:
→ Sick leave >2 consecutive days
→ Any leave that seems suspicious`
    },
    {
        title: "💰 SALARY & PERFORMANCE",
        content: `**SALARY PAYMENT:**

→ Paid on: Last working day of the month
→ Mode: Bank transfer (NEFT/IMPS)
→ Salary slip: Emailed to you

**SALARY IS CONFIDENTIAL.**

Do NOT discuss your salary with other team members.

**SALARY DEDUCTIONS:**

Your salary can be deducted for:
→ Late arrivals (half-day per late arrival after 9:15 AM)
→ Leave without pay
→ Penalties for poor client communication
→ Asset damage

**PERFORMANCE RATINGS:**

→ Exceptional (90-100% KPI): 15-20% increment + bonus
→ Exceeds (75-89% KPI): 10-15% increment
→ Meets (60-74% KPI): 5-10% increment
→ Needs Improvement (<60%): No increment + improvement plan

**HOW TO EARN MORE:**

Your Income = Number of Happy Clients × Your Skill × Your Speed

Want more money?
→ Deliver more projects successfully
→ Make clients happier (better reviews)
→ Learn faster (improve skills)
→ Execute faster (deliver quicker)`
    },
    {
        title: "🏠 WORK FROM HOME & CONFIDENTIALITY",
        content: `**WFH ELIGIBILITY:**

✅ Completed probation (3 months)
✅ Good performance record
✅ Role suitable for remote work

**WFH ALLOWANCE:**

→ Maximum 2 days per week
→ Days must be non-consecutive
→ Requires manager approval 1 day in advance

**WFH REQUIREMENTS:**

→ Stable internet (minimum 10 Mbps)
→ Available on Discord/WhatsApp during work hours
→ Respond to messages within 30 minutes
→ Same productivity as office days

**CONFIDENTIAL INFORMATION INCLUDES:**

→ Client data (contact info, business details, Shopify access)
→ Company financials and revenue
→ Salary information (yours and others')
→ SOPs, processes, internal documents
→ Upcoming launches, strategies, plans

**DATA BREACH = IMMEDIATE TERMINATION + LEGAL ACTION**

**DEVICE SECURITY:**

If you have a company laptop:
→ Password protected (mandatory)
→ Auto-lock after 5 minutes inactivity
→ No storing client data on personal devices`
    },
    {
        title: "📱 COMMUNICATION STANDARDS",
        content: `**RESPONSE TIME EXPECTATIONS:**

| Who | Response Time |
|-----|---------------|
| Client messages | <2 hours (business hours) |
| Manager messages | <1 hour (always) |
| Team messages | <2 hours (work hours) |
| Emergency | <15 minutes (always) |

**COMMUNICATION CHANNELS:**

→ Discord: Primary for team communication
→ WhatsApp: Urgent matters, client communication
→ Email: Official documentation
→ Fiverr: Client project communication

**PROFESSIONAL COMMUNICATION WITH CLIENTS:**

✅ DO:
→ Use proper grammar and spelling
→ Be polite and professional
→ Confirm understanding
→ Update them regularly
→ Under-promise, over-deliver

❌ DON'T:
→ Use casual/slang language
→ Assume things—always confirm
→ Make promises you can't keep
→ Argue with clients

**INSTANT REPLY HABIT:**

We train ourselves to START TYPING within 1 second of seeing a message.

Not always finish typing in 1 second. But START TYPING.

This builds trust. Trust builds careers.`
    },
    {
        title: "🎉 TEAM CULTURE & CELEBRATIONS",
        content: `We work hard. But we also celebrate together.

**FESTIVALS & CELEBRATIONS**

We celebrate major festivals together:
→ Diwali, Holi, Christmas, Eid, New Year

**BIRTHDAY CELEBRATIONS**

→ Team wishes in #birthdays-events channel
→ Small office celebration (cake, snacks)
→ Half-day off or leave (your choice)

**TEAM LUNCHES & DINNERS**

→ Monthly team lunch (company paid)
→ Quarterly team dinner (company paid)
→ Project celebration meals

**HALF-YEARLY OFFSITE TRIPS**

Twice a year, 2-3 days:
→ Team-building activities
→ Recreation and fun
→ Company pays for travel, accommodation, food

**CELEBRATION & OUTING BUDGET**

→ ₹500-1,000 per person per month
→ For team movies, bowling, restaurants, etc.

**BUDDY SYSTEM**

Every new employee gets a "buddy" for first 2 weeks who helps with:
→ Understanding unwritten rules
→ Navigating office culture
→ Making friends

**OPEN DOOR POLICY**

Management is accessible. Your voice matters.`
    },
    {
        title: "🚪 IF YOU DECIDE TO LEAVE",
        content: `**NOTICE PERIOD:**

→ During probation (0-3 months): 7 days notice
→ After confirmation: 30 days notice

**RESIGNATION PROCESS:**

1. Submit written resignation to manager & HR
2. Complete handover checklist
3. Knowledge transfer to replacement
4. Exit interview with HR
5. Return all company assets
6. Transfer all client accesses

**FULL & FINAL SETTLEMENT:**

Processed within 30 days of last working day.

**EXIT DOCUMENTS PROVIDED:**

→ Experience letter
→ Relieving letter
→ Service certificate (if requested)

**POST-EXIT:**

→ NDA continues
→ Non-compete clause applies for 6 months
→ You can be rehired if eligible

**EXIT WITH GRACE:**

Even if you're leaving because you're unhappy, leave professionally:
→ Don't badmouth the company
→ Do proper handover
→ Maintain relationships

Burn bridges = Burn opportunities.

---

**Welcome to Digital Heroes. Let's build something remarkable together! 🚀**`
    }
];

// Quiz Questions - In-depth questions to verify reading
const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: "What is the #1 reason for immediate termination at Digital Heroes?",
        options: [
            "Being late to work",
            "Ignoring messages from team or management",
            "Missing deadlines",
            "Poor code quality"
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "What is the maximum response time allowed for manager messages?",
        options: [
            "15 minutes",
            "30 minutes",
            "1 hour",
            "2 hours"
        ],
        correctAnswer: 2
    },
    {
        id: 3,
        question: "According to the manual, what percentage of your time should be spent on productive work?",
        options: [
            "60%",
            "70%",
            "80%",
            "90%"
        ],
        correctAnswer: 2
    },
    {
        id: 4,
        question: "What happens if you arrive after 9:15 AM?",
        options: [
            "Verbal warning",
            "₹500 fine",
            "Half-day salary deduction",
            "No penalty for first offense"
        ],
        correctAnswer: 2
    },
    {
        id: 5,
        question: "How many Casual Leave (CL) days are you entitled to per year?",
        options: [
            "6 days",
            "10 days",
            "12 days",
            "15 days"
        ],
        correctAnswer: 2
    },
    {
        id: 6,
        question: "What is Digital Heroes' mission for 2026?",
        options: [
            "Reach 5M YouTube subscribers",
            "Become Top 100 digital agency globally",
            "Open 10 international offices",
            "Achieve ₹10 crore revenue"
        ],
        correctAnswer: 1
    },
    {
        id: 7,
        question: "After how many months of probation can you apply for Work From Home?",
        options: [
            "1 month",
            "2 months",
            "3 months",
            "6 months"
        ],
        correctAnswer: 2
    },
    {
        id: 8,
        question: "What is the penalty for first offense of poor client communication?",
        options: [
            "Verbal warning only",
            "₹500 penalty + written warning",
            "₹1,000 penalty",
            "Immediate termination"
        ],
        correctAnswer: 1
    },
    {
        id: 9,
        question: "According to the manual, what builds MASTERY?",
        options: [
            "Natural talent",
            "Expensive courses",
            "Volume of work/hours",
            "University degree"
        ],
        correctAnswer: 2
    },
    {
        id: 10,
        question: "How many maximum WFH days are allowed per week?",
        options: [
            "1 day",
            "2 days",
            "3 days",
            "Unlimited"
        ],
        correctAnswer: 1
    }
];

interface OnboardingSubmission {
    id: string;
    name: string;
    email: string;
    phone: string;
    // Bank Details
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
    upiId: string;
    // Quiz
    submittedAt: string;
    answers: number[];
    score: number;
    totalQuestions: number;
}

// Storage functions
const getSubmissions = (): OnboardingSubmission[] => {
    try {
        const data = localStorage.getItem('onboarding_submissions');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const saveSubmission = (submission: OnboardingSubmission) => {
    const submissions = getSubmissions();
    submissions.unshift(submission);
    localStorage.setItem('onboarding_submissions', JSON.stringify(submissions));
};

// Main Onboarding Component
export default function OnboardingManual() {
    const [currentPage, setCurrentPage] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // Bank Details
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [branchName, setBranchName] = useState('');
    const [upiId, setUpiId] = useState('');
    const [answers, setAnswers] = useState<number[]>(Array(QUIZ_QUESTIONS.length).fill(-1));

    const totalPages = MANUAL_PAGES.length;

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
        }
    };

    const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerIndex;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        if (!name.trim() || !email.trim() || !phone.trim()) {
            alert('Please enter your name, email, and phone number.');
            return;
        }
        if (!bankName.trim() || !accountNumber.trim() || !ifscCode.trim()) {
            alert('Please fill in all bank details (Bank Name, Account Number, IFSC Code).');
            return;
        }
        if (answers.includes(-1)) {
            alert('Please answer all questions before submitting.');
            return;
        }

        // Calculate score
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer === QUIZ_QUESTIONS[index].correctAnswer) {
                score++;
            }
        });

        const submission: OnboardingSubmission = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            bankName: bankName.trim(),
            accountNumber: accountNumber.trim(),
            ifscCode: ifscCode.trim().toUpperCase(),
            branchName: branchName.trim(),
            upiId: upiId.trim(),
            submittedAt: new Date().toISOString(),
            answers,
            score,
            totalQuestions: QUIZ_QUESTIONS.length
        };

        saveSubmission(submission);
        setShowSuccess(true);
    };

    if (showSuccess) {
        const score = answers.reduce((acc, answer, index) => {
            return acc + (answer === QUIZ_QUESTIONS[index].correctAnswer ? 1 : 0);
        }, 0);

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">✅</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Submission Successful!</h2>
                    <p className="text-slate-600 mb-4">
                        Thank you, <strong>{name}</strong>! Your onboarding quiz has been submitted.
                    </p>
                    <div className="bg-slate-100 rounded-lg p-4 mb-6">
                        <p className="text-lg font-bold text-slate-800">Your Score</p>
                        <p className="text-3xl font-black text-purple-600">{score}/{QUIZ_QUESTIONS.length}</p>
                        <p className="text-sm text-slate-500">{Math.round((score / QUIZ_QUESTIONS.length) * 100)}% Correct</p>
                    </div>
                    <p className="text-sm text-slate-500">
                        {score >= 8 ? "Excellent! You've read the manual thoroughly. 🎉" :
                            score >= 6 ? "Good job! You understand most of the policies. 👍" :
                                "Please review the manual again to better understand our policies. 📚"}
                    </p>
                </div>
            </div>
        );
    }

    if (showQuiz) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-white mb-2">📝 Onboarding Quiz</h1>
                        <p className="text-purple-200">Answer all 10 questions to complete your onboarding</p>
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
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bank Details */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">🏦 Bank Account Details</h3>
                        <p className="text-sm text-slate-500 mb-4">Required for salary transfer. Please ensure details are correct.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Bank Name *</label>
                                <select
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                >
                                    <option value="">Select your bank</option>
                                    <option value="State Bank of India">State Bank of India (SBI)</option>
                                    <option value="HDFC Bank">HDFC Bank</option>
                                    <option value="ICICI Bank">ICICI Bank</option>
                                    <option value="Axis Bank">Axis Bank</option>
                                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                                    <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
                                    <option value="Bank of Baroda">Bank of Baroda</option>
                                    <option value="Canara Bank">Canara Bank</option>
                                    <option value="Union Bank of India">Union Bank of India</option>
                                    <option value="Bank of India">Bank of India</option>
                                    <option value="Indian Bank">Indian Bank</option>
                                    <option value="Central Bank of India">Central Bank of India</option>
                                    <option value="IDBI Bank">IDBI Bank</option>
                                    <option value="Yes Bank">Yes Bank</option>
                                    <option value="IndusInd Bank">IndusInd Bank</option>
                                    <option value="Federal Bank">Federal Bank</option>
                                    <option value="South Indian Bank">South Indian Bank</option>
                                    <option value="Bandhan Bank">Bandhan Bank</option>
                                    <option value="RBL Bank">RBL Bank</option>
                                    <option value="UCO Bank">UCO Bank</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Account Number *</label>
                                <input
                                    type="text"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                    placeholder="Enter account number"
                                    maxLength={18}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">IFSC Code *</label>
                                <input
                                    type="text"
                                    value={ifscCode}
                                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none uppercase"
                                    placeholder="e.g., SBIN0001234"
                                    maxLength={11}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Branch Name</label>
                                <input
                                    type="text"
                                    value={branchName}
                                    onChange={(e) => setBranchName(e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                    placeholder="Enter branch name"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-600 mb-1">UPI ID (Optional)</label>
                                <input
                                    type="text"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                    placeholder="e.g., yourname@upi or 9876543210@paytm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Questions */}
                    <div className="space-y-6">
                        {QUIZ_QUESTIONS.map((q, qIndex) => (
                            <div key={q.id} className="bg-white rounded-xl shadow-lg p-6">
                                <p className="font-bold text-slate-800 mb-4">
                                    <span className="text-purple-600">Q{qIndex + 1}.</span> {q.question}
                                </p>
                                <div className="space-y-2">
                                    {q.options.map((option, oIndex) => (
                                        <label
                                            key={oIndex}
                                            className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${answers[qIndex] === oIndex
                                                ? 'border-purple-500 bg-purple-50'
                                                : 'border-slate-200 hover:border-purple-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${qIndex}`}
                                                checked={answers[qIndex] === oIndex}
                                                onChange={() => handleAnswerChange(qIndex, oIndex)}
                                                className="w-4 h-4 text-purple-600"
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
                            ← Back to Manual
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg"
                        >
                            Submit Quiz ✓
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const page = MANUAL_PAGES[currentPage];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-purple-200 mb-2">
                        <span>Page {currentPage + 1} of {totalPages}</span>
                        <span>{Math.round(((currentPage + 1) / totalPages) * 100)}% Complete</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-4">
                        <h1 className="text-xl font-bold text-white">{page.title}</h1>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6">
                        <div className="prose prose-slate max-w-none">
                            {page.content.split('\n\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4 text-slate-700 whitespace-pre-line leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={handleBack}
                        disabled={currentPage === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${currentPage === 0
                            ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                            : 'bg-white text-slate-700 hover:bg-slate-100'
                            }`}
                    >
                        ← Previous
                    </button>
                    <div className="flex gap-1">
                        {MANUAL_PAGES.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-colors ${idx === currentPage ? 'bg-purple-500' :
                                    idx < currentPage ? 'bg-purple-300' : 'bg-slate-500'
                                    }`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-lg"
                    >
                        {currentPage === totalPages - 1 ? 'Take Quiz →' : 'Next →'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Submissions Viewer Component
export function OnboardingSubmissions() {
    const [submissions, setSubmissions] = useState<OnboardingSubmission[]>([]);

    useEffect(() => {
        setSubmissions(getSubmissions());
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
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800">📋 Onboarding Submissions</h1>
                        <p className="text-slate-600">Total: {submissions.length} submissions</p>
                    </div>
                    <a
                        href="/"
                        className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        ← Back to Dashboard
                    </a>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">#</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Name</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Email</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Phone</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Bank</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Account No.</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">IFSC</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">UPI ID</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Score</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold">Date</th>
                                    {QUIZ_QUESTIONS.map((_, idx) => (
                                        <th key={idx} className="px-1 py-3 text-center text-xs font-semibold">Q{idx + 1}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {submissions.length === 0 ? (
                                    <tr>
                                        <td colSpan={10 + QUIZ_QUESTIONS.length} className="px-4 py-8 text-center text-slate-500">
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
                                            <td className="px-3 py-2 text-xs text-slate-600">{sub.bankName || '-'}</td>
                                            <td className="px-3 py-2 text-xs text-slate-600 font-mono">{sub.accountNumber || '-'}</td>
                                            <td className="px-3 py-2 text-xs text-slate-600 font-mono">{sub.ifscCode || '-'}</td>
                                            <td className="px-3 py-2 text-xs text-slate-600">{sub.upiId || '-'}</td>
                                            <td className="px-3 py-2">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${sub.score >= 8 ? 'bg-green-100 text-green-800' :
                                                    sub.score >= 6 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {sub.score}/{sub.totalQuestions}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-xs text-slate-600">{formatDate(sub.submittedAt)}</td>
                                            {sub.answers?.map((answer, aIdx) => (
                                                <td key={aIdx} className="px-1 py-2 text-center">
                                                    <span className={`inline-flex w-5 h-5 items-center justify-center rounded-full text-xs font-bold ${answer === QUIZ_QUESTIONS[aIdx]?.correctAnswer
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {String.fromCharCode(65 + answer)}
                                                    </span>
                                                </td>
                                            ))}
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
