const emails = [
    {
        id: 1,
        sender: 'Bank of New York',
        subject: 'Urgent: Your Account Has Been Suspended',
        content: 'Dear Valued Customer,\n\nYour account has been suspended due to suspicious activity. Click the link below to verify your identity and restore access:\n\nhttp://bankofdataverify.com/restore-account\n\nIf you do not verify within 24 hours, your account will be permanently closed.\n\nSincerely,\nBank of New York Security Team',
        isPhishing: true,
        difficulty: 'easy',
        explanation: 'This is a phishing email. Legitimate banks don\'t ask you to click on links to verify your identity. The URL is also suspicious and not the official bank website.',
        resources: ['https://www.fdic.gov/consumers/consumer/news/cnsum16/phishing.html']
    },
    {
        id: 2,
        sender: 'Amazon Customer Service',
        subject: 'Your Recent Amazon Order',
        content: 'Hello,\n\nThank you for your recent order from Amazon.com. Your order #123-4567890-1234567 has been shipped and will arrive on July 15, 2024.\n\nTo track your package or view your order details, please visit Your Orders on Amazon.com.\n\nIf you have any questions, please visit our Help pages.\n\nWe hope you enjoyed your shopping experience with us!\n\nAmazon.com',
        isPhishing: false,
        difficulty: 'easy',
        explanation: 'This is a legitimate email. It doesn\'t ask for personal information, provides an order number, and directs you to the official Amazon website for more information.',
        resources: ['https://www.amazon.com/gp/help/customer/display.html?nodeId=15835501']
    },
    {
        id: 3,
        sender: 'IT Support',
        subject: 'Immediate Action Required: Password Reset',
        content: 'Dear Employee,\n\nOur systems have detected an unauthorized access attempt on your account. To secure your account, please reset your password immediately by clicking the link below:\n\nhttp://companyname.password-reset.net/secure-reset\n\nThis link will expire in 1 hour. If you did not request this reset, please contact IT Support immediately.\n\nBest regards,\nIT Support Team',
        isPhishing: true,
        difficulty: 'medium',
        explanation: 'This is a phishing email. The urgency and the external link for password reset are red flags. Legitimate IT departments usually require you to reset passwords on the company\'s official website.',
        resources: ['https://www.sans.org/security-awareness-training/resources/stop-phish']
    },
    {
        id: 4,
        sender: 'LinkedIn',
        subject: 'John Doe has endorsed you!',
        content: 'Hi there,\n\nGreat news! John Doe has endorsed you for the skill "Project Management" on LinkedIn.\n\nWant to return the favor? Follow this link to endorse John for a skill: https://lnkd.in/endorsements\n\nCheers,\nThe LinkedIn Team',
        isPhishing: false,
        difficulty: 'medium',
        explanation: 'This is a legitimate email from LinkedIn. The link uses LinkedIn\'s URL shortener (lnkd.in) which is commonly used in their emails. However, it\'s always good practice to hover over links before clicking.',
        resources: ['https://www.linkedin.com/help/linkedin/answer/a522735']
    },
    {
        id: 5,
        sender: 'PayPal Service',
        subject: 'PayPal account verification required',
        content: 'Dear valued PayPal member,\n\nWe have noticed some unusual activity on your account. To ensure your account security, we require you to verify your information.\n\nPlease click on the link below to verify your account:\n\nhttps://paypal-secure.com/verify.php\n\nFailure to verify your account within 24 hours will result in account suspension.\n\nThank you for your prompt attention to this matter.\n\nSincerely,\nPayPal Customer Service',
        isPhishing: true,
        difficulty: 'hard',
        explanation: 'This is a sophisticated phishing attempt. While it may look legitimate at first glance, the URL is not an official PayPal domain. PayPal will never ask you to verify your account through an email link.',
        resources: ['https://www.paypal.com/us/security/learn-about-online-security']
    },
    {
        id: 6,
        sender: 'Netflix <info@mailer.netflix.com>',
        subject: 'New sign-in to your account',
        content: 'Hello,\n\nWe noticed a new sign-in to your Netflix account. If this was you, you don\'t need to do anything. If it wasn\'t you, please secure your account by resetting your password here:\n\nhttps://www.netflix.com/LoginHelp\n\nDevice: Windows 10 Chrome Browser\nLocation: New York, United States\nTime: June 15, 2023, 3:45 PM EST\n\nIf you have any questions, please visit the Netflix Help Center.\n\n-The Netflix team',
        isPhishing: false,
        difficulty: 'easy',
        explanation: 'This is a legitimate email from Netflix. It uses an official Netflix domain, provides specific details about the login, and directs you to the official Netflix website to take action if needed.',
        resources: ['https://help.netflix.com/en/node/65674']
    },
    {
        id: 7,
        sender: 'Bank of America <secure@bankofamerica.com>',
        subject: 'Action Required: Verify Your Account',
        content: 'Dear Valued Customer,\n\nWe have updated our security systems and require all customers to verify their account information.\n\nPlease click the link below to verify your account details:\n\nhttp://bankofamerica-secure.com/verify\n\nFailure to verify your account within 48 hours may result in account suspension.\n\nThank you for your prompt attention to this matter.\n\nSincerely,\nBank of America Security Team',
        isPhishing: true,
        difficulty: 'easy',
        explanation: 'This is a phishing email. While the sender\'s address looks legitimate, the link provided is not an official Bank of America website. Banks typically don\'t ask you to verify account information via email links.',
        resources: ['https://www.bankofamerica.com/security-center/avoid-bank-scams/']
    },
    {
        id: 8,
        sender: 'LinkedIn <messages-noreply@linkedin.com>',
        subject: 'John Doe has sent you a message on LinkedIn',
        content: 'Hi there,\n\nYou have a new message from John Doe on LinkedIn:\n\n"Hi! I came across your profile and I\'m impressed with your experience. I\'d love to connect and discuss potential opportunities."\n\nTo view and respond to your message, click here:\nhttps://www.linkedin.com/messaging/\n\nThanks,\nThe LinkedIn Team',
        isPhishing: false,
        difficulty: 'easy',
        explanation: 'This is a legitimate email from LinkedIn. It uses an official LinkedIn email address and directs you to the LinkedIn website. It doesn\'t ask for any personal information.',
        resources: ['https://www.linkedin.com/help/linkedin/answer/a568332']
    },
    {
        id: 9,
        sender: 'IRS Refund <refund@irs-gov.com>',
        subject: 'Your tax refund is ready',
        content: 'Dear Taxpayer,\n\nGood news! Your tax refund for the year 2022 is ready to be processed.\n\nTo claim your refund, please click the link below and enter your personal and banking information:\n\nhttp://irs-gov.com/claim-refund\n\nYour refund amount: $3,247.89\n\nPlease process your claim within 7 days to avoid delays.\n\nInternal Revenue Service',
        isPhishing: true,
        difficulty: 'easy',
        explanation: 'This is a phishing email. The IRS never initiates contact with taxpayers via email about refunds. The sender\'s email address and the link provided are not official IRS domains.',
        resources: ['https://www.irs.gov/privacy-disclosure/report-phishing']
    },
    {
        id: 10,
        sender: 'Google Account Team <no-reply@accounts.google.com>',
        subject: 'Security alert for your linked accounts',
        content: 'Dear Google User,\n\nWe detected a sign-in attempt from an unrecognized device to your Google Account.\n\nTime: June 16, 2023, 10:23 AM UTC\nLocation: Mumbai, India\nDevice: Windows PC\n\nIf this wasn\'t you, please secure your account here:\nhttps://myaccount.google.com/security-checkup\n\nIf this was you, you can ignore this message.\n\nBest,\nThe Google Accounts team',
        isPhishing: false,
        difficulty: 'easy',
        explanation: 'This is a legitimate email from Google. It uses an official Google email address, provides specific details about the login attempt, and directs you to the official Google website to take action if needed.',
        resources: ['https://support.google.com/accounts/answer/180744?hl=en']
    }
];
