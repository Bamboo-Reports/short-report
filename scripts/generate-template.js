const XLSX = require("xlsx");
const path = require("path");

const wb = XLSX.utils.book_new();

// ─── Sheet 1: Business ───
const business = [
  {
    companyName: "Zscaler Inc.",
    incYear: "2007",
    revenue: "$2,167 Mn",
    employees: "7384",
    headquarters: "California, United States",
    industry: "Security and Compliance Software",
    companyType: "Public",
    about:
      "Zscaler, Inc. is a cloud-based information security company that provides internet security, web filtering, and secure access solutions for businesses and organizations. Their platform enables secure and fast connections between users and applications, regardless of device, location, or network.",
    services:
      "Cyber threat Protection\nData Protection\nDigital Experience Management\nSecurity Strategy",
    executives:
      "Jay Chaudhry \u2013 Chairman & CEO\nRemo Canessa \u2013 Chief Financial Officer\nRobert Schlossman \u2013 Chief Legal Officer\nDali Rajic \u2013 Chief Revenue Officer\nDeepen Desai \u2013 Chief Security Officer",
    competitors:
      "Palo Alto Networks\nCrowdStrike\nFortinet\nCloudflare\nCheck Point Software",
    website: "https://zscaler.com",
    linkedin: "https://linkedin.com/company/zscaler",
    twitter: "https://x.com/zscaler",
    instagram: "https://instagram.com/zscaler",
    stockTicker: "ZS",
    netIncome: "$430 Mn",
    marketCap: "$31.2 Bn",
    stockPrice: "$213.45",
  },
];
const ws1 = XLSX.utils.json_to_sheet(business);
// Set column widths
ws1["!cols"] = [
  { wch: 18 }, { wch: 10 }, { wch: 14 }, { wch: 10 }, { wch: 30 },
  { wch: 35 }, { wch: 12 }, { wch: 60 }, { wch: 40 }, { wch: 50 },
  { wch: 30 }, { wch: 30 }, { wch: 35 }, { wch: 30 }, { wch: 30 },
  { wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 14 },
];
XLSX.utils.book_append_sheet(wb, ws1, "Business");

// ─── Sheet 2: Centers ───
const centers = [
  {
    legalName: "Zscaler Softech India Pvt. Ltd.",
    incYear: "2007",
    centerType: "IT",
    location: "Bengaluru",
    employeeCount: "1001",
    address: "Bengaluru, Karnataka, India",
    phone: "",
    accountName: "Zscaler Inc.",
    domain: "zscaler.com",
    focusRegions: "Global\nAPAC\nASEAN\nJapan",
    techStack: "AWS Lambda\nTerraform\nMicrosoft Azure\nSalesforce Sales Cloud",
    latitude: 12.9716,
    longitude: 77.5946,
    analystNotes:
      "Drives core engineering and cloud security platform development for Zscaler's global Zero Trust Exchange.",
    "IT Services":
      "Web Security Service\nData Protection Services\nCloud Security Services\nWeb Managing Services\nGlobal IT Service Desk Management",
  },
  {
    legalName: "Zscaler Softech India Pvt. Ltd.",
    incYear: "2024",
    centerType: "IT",
    location: "Hyderabad",
    employeeCount: "113",
    address: "Hyderabad, Telangana, India",
    phone: "",
    accountName: "Zscaler Inc.",
    domain: "zscaler.com",
    focusRegions: "Global\nIndia",
    techStack:
      "Microsoft Azure\nTerraform\nKubernetes\nAWS Cloud\nAnsible",
    latitude: 17.385,
    longitude: 78.4867,
    analystNotes:
      "Newly established center focused on platform engineering, AI/ML, and data center operations to scale Zscaler's infrastructure.",
    "IT Services":
      "Platform Engineering\nIT Infrastructure\nCloud Services\nIT Architecture\nArtificial Intelligence\nMachine Learning\nData Center Operations",
  },
];
const ws2 = XLSX.utils.json_to_sheet(centers);
ws2["!cols"] = [
  { wch: 35 }, { wch: 10 }, { wch: 12 }, { wch: 15 }, { wch: 14 },
  { wch: 30 }, { wch: 14 }, { wch: 18 }, { wch: 15 }, { wch: 25 },
  { wch: 30 }, { wch: 12 }, { wch: 12 }, { wch: 60 }, { wch: 40 },
];
XLSX.utils.book_append_sheet(wb, ws2, "Centers");

// ─── Sheet 3: Contacts ───
const contacts = [
  {
    accountName: "Zscaler Inc.",
    entityName: "Zscaler Softech India Pvt. Ltd.",
    firstName: "Vishal",
    lastName: "Gautam",
    designation: "Vice President, Engineering & Site Managing Director",
    email: "vgautam@zscaler.com",
    profileImage: "https://media.licdn.com/dms/image/v2/C5103AQEYs_VLHGxuSg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1579959346180?e=1775692800&v=beta&t=1Ndl39pnAOXoVAmIXkywKCXdodKeO6LVrIjLszhXQN0",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    linkedin: "linkedin.com/in/gautamvishal",
    career:
      "Former Head of APAC Payments & Head of Global Verification and Compliance at Stripe\nFormer Senior Engineering Leader at Amazon\nFormer Software Development Manager III at Amazon\nFormer Manager Technology at SapientNitro\nFormer Project Lead at UnitedHealthcare",
    currentProfile:
      "Currently serving as VP of Engineering & Site Managing Director at Zscaler India, responsible for scaling the India Development Center.\nIn this role, he leads engineering strategy and execution for cloud security initiatives, while driving growth and operational excellence in Zscaler's India tech hub.",
    qualification:
      "B.Tech in Computer Science from Gurukula Kangri Vishwavidyalaya (2000-2004)\nI.Sc. in Physics, Chemistry, Mathematics from Science College, Patna (1997-1999)\n10th grade with PCM from Don Bosco Academy, Patna (1997)",
  },
  {
    accountName: "Zscaler Inc.",
    entityName: "Zscaler Softech India Pvt. Ltd.",
    firstName: "Kirabkumar",
    lastName: "D G",
    designation: "Director of Engineering",
    email: "kirankumardg@zscaler.com",
    profileImage: "https://media.licdn.com/dms/image/v2/D5603AQE56a8YnlFEag/profile-displayphoto-scale_400_400/B56ZrzDavJGkAg-/0/1765014355728?e=1775692800&v=beta&t=qA5ZWrcEpacvY6aqBAMjW2dD8O5O1Aa3cmb11cMV8qI",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    linkedin: "linkedin.com/in/kirankumardg",
    career:
      "Former Senior Engineering Manager at Cisco Systems\nFormer Technical Lead at Juniper Networks\nFormer Software Engineer at Wipro Technologies",
    currentProfile:
      "Currently serving as Director of Engineering at Zscaler, leading a team focused on Zero Trust Exchange platform development.\nDrives architecture decisions for cloud-native security solutions and oversees cross-functional engineering delivery across multiple product lines.",
    qualification:
      "M.Tech in Computer Science & Engineering from IIT Bombay (2008-2010)\nB.E. in Information Science from RVCE, Bengaluru (2003-2007)",
  },
  {
    accountName: "Zscaler Inc.",
    entityName: "Zscaler Softech India Pvt. Ltd.",
    firstName: "Saurav",
    lastName: "G",
    designation: "Director of Engineering",
    email: "sauravg@zscaler.com",
    profileImage: "",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    linkedin: "linkedin.com/in/sauravmware",
    career:
      "Former Senior Engineering Manager at VMware\nFormer Staff Engineer at VMware\nFormer Technical Lead at Oracle\nFormer Software Developer at Infosys",
    currentProfile:
      "Currently serving as Director of Engineering at Zscaler, overseeing the Data Protection engineering team.\nResponsible for building scalable DLP and CASB solutions, driving innovation in cloud data security, and managing a team of 50+ engineers across multiple product verticals.",
    qualification:
      "M.S. in Computer Science from University of Texas at Dallas (2010-2012)\nB.Tech in Electronics & Communication from NIT Warangal (2004-2008)",
  },
  {
    accountName: "Zscaler Inc.",
    entityName: "Zscaler Softech India Pvt. Ltd.",
    firstName: "Kishore",
    lastName: "Thakur",
    designation: "Senior Director, Site Reliability Engineering",
    email: "kthakur@zscaler.com",
    profileImage: "https://media.licdn.com/dms/image/v2/D5603AQER7Sfo3TwPwQ/profile-displayphoto-scale_400_400/B56ZmBA08xHQAg-/0/1758806107358?e=1775692800&v=beta&t=c45hSjh37vM3Dn8Y7RNj3nMGTIdSDQEj7sEs-qy_vaI",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    linkedin: "linkedin.com/in/kishorethakur",
    career:
      "Former Head of SRE at Nutanix\nFormer Principal SRE Manager at Microsoft Azure\nFormer Senior DevOps Lead at Salesforce\nFormer Systems Architect at Yahoo!",
    currentProfile:
      "Currently serving as Senior Director of Site Reliability Engineering at Zscaler, leading the Hyderabad SRE center.\nOversees platform reliability, incident management, and infrastructure automation for Zscaler's global cloud security platform processing 400B+ daily transactions.",
    qualification:
      "M.Tech in Distributed Systems from IIIT Hyderabad (2006-2008)\nB.Tech in Computer Science from JNTU Hyderabad (2001-2005)",
  },
  {
    accountName: "Zscaler Inc.",
    entityName: "Zscaler Softech India Pvt. Ltd.",
    firstName: "Satish",
    lastName: "Sreenivasaiah",
    designation: "Director - Product Security Engineering",
    email: "satishsreenivasaiah@zscaler.com",
    profileImage: "https://media.licdn.com/dms/image/v2/C5603AQHSEJZcJX95_w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1589366853469?e=1775692800&v=beta&t=hQjyo9B9N2SrcVsZEqBg_P2JB29Jy9GoJBkXx1of75E",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    linkedin: "linkedin.com/in/satish-sreenivasaiah-b661983/",
    career:
      "Former Security Engineering Manager at Palo Alto Networks\nFormer Senior Security Engineer at Symantec\nFormer Application Security Lead at Flipkart\nFormer Security Analyst at TCS",
    currentProfile:
      "Currently serving as Director of Product Security Engineering at Zscaler, leading security assurance for the entire product portfolio.\nResponsible for application security, vulnerability management, penetration testing, and secure SDLC practices across all engineering teams.",
    qualification:
      "M.S. in Information Security from Carnegie Mellon University (2011-2013)\nB.E. in Computer Science from BMS College of Engineering, Bengaluru (2005-2009)\nCISSP, OSCP, CEH Certified",
  },
];
const ws3 = XLSX.utils.json_to_sheet(contacts);
ws3["!cols"] = [
  { wch: 18 }, { wch: 35 }, { wch: 14 }, { wch: 18 }, { wch: 45 },
  { wch: 30 }, { wch: 60 }, { wch: 14 }, { wch: 14 }, { wch: 10 },
  { wch: 35 }, { wch: 60 }, { wch: 60 }, { wch: 60 },
];
XLSX.utils.book_append_sheet(wb, ws3, "Contacts");

// ─── Sheet 4: Deals ───
const deals = [
  {
    solutionType: "Cloud",
    dealType: "Partnership",
    dealYear: "2024",
    dealYearEnd: "",
    country: "United States",
    companyEntity: "Zscaler Inc.",
    partnerName: "nCino, Inc.",
    partnerUrl: "ncino.com",
    solution: "Allegro",
    dealDetails:
      "nCino purchased Allegro from TruStage.\nAllegro is a powerful lending software that enables lenders the flexibility to help manage, process data and respond to customer inquiries more efficiently.",
    companyKeyPerson: "",
    partnerKeyPerson:
      "Law Helie \u2014 General Manager of Consumer Lending, nCino, Inc.",
    url: "https://bit.ly/4at93kd",
  },
  {
    solutionType: "Data and Analytics",
    dealType: "Outsourced Deal",
    dealYear: "2024",
    dealYearEnd: "",
    country: "United States",
    companyEntity: "Zscaler Inc.",
    partnerName: "Lucky Orange LLC",
    partnerUrl: "luckyorange.com",
    solution: "Lucky Orange",
    dealDetails:
      "TruStage has purchased software from Lucky Orange for Marketing Analytics",
    companyKeyPerson: "",
    partnerKeyPerson: "",
    url: "https://bit.ly/4bqgDgY",
  },
  {
    solutionType: "Digital Transformation",
    dealType: "Customer Deals",
    dealYear: "2024",
    dealYearEnd: "",
    country: "United States",
    companyEntity: "Zscaler Inc.",
    partnerName: "Community Resource Credit Union",
    partnerUrl: "crcu.org",
    solution: "LPL Financial Institution Services Platform",
    dealDetails:
      "LPL and TruStage partners to serve the growing CRCU Retirement and Investment Services program and capabilities.\nCRCU Retirement and Investment Services will onboard to the LPL Financial Institution Services platform.",
    companyKeyPerson: "",
    partnerKeyPerson:
      "Tim Foley \u2014 Chief Operations Officer, Community Resource Credit Union",
    url: "https://bit.ly/4ayxzR3",
  },
  {
    solutionType: "Digital Transformation",
    dealType: "Customer Deals",
    dealYear: "2024",
    dealYearEnd: "",
    country: "United States",
    companyEntity: "Zscaler Inc.",
    partnerName: "Beem",
    partnerUrl: "beem.com",
    solution: "TruStage Payment Guard",
    dealDetails:
      "The collaboration with TruStage underscores Beem's commitment to enhancing its members' financial well-being. TruStage Payment Guard, now integrated into Beem's offerings.",
    companyKeyPerson:
      "Danielle Sesko \u2014 Director of Product Management, TruStage Financial Group, Inc.",
    partnerKeyPerson: "Akshay K \u2014 CEO, Beem",
    url: "https://bit.ly/4bFGa5C",
  },
  {
    solutionType: "Digital Transformation",
    dealType: "Customer Deals",
    dealYear: "2024",
    dealYearEnd: "",
    country: "United States",
    companyEntity: "Zscaler Inc.",
    partnerName: "QCash Financial, LLC",
    partnerUrl: "qcashfinancial.com",
    solution: "Payment Guard Insurance",
    dealDetails:
      "QCash Financial Partners With TruStage for Payment Guard Insurance.",
    companyKeyPerson:
      "Danielle Sesko \u2014 Director of Product Management, TruStage Financial Group, Inc.",
    partnerKeyPerson:
      "Seth Brickman \u2014 CEO, QCash Financial, LLC",
    url: "https://bit.ly/4dQ07IA",
  },
  {
    solutionType: "Digital Transformation",
    dealType: "In-House Deal",
    dealYear: "2024",
    dealYearEnd: "",
    country: "United States",
    companyEntity: "Zscaler Inc.",
    partnerName: "TruStage Financial Group, Inc.",
    partnerUrl: "trustage.com",
    solution: "TruStage GAP",
    dealDetails:
      "TruStage\u2122 makes GAP coverage available through the Digital Storefront Software as a Service (SaaS) solution.\nDigital Storefront allows credit unions to efficiently market financial and insurance products, boosting member engagement and increasing various income streams.",
    companyKeyPerson:
      "Brian Bodell \u2014 Vice President of Technology, TruStage Financial Group, Inc.",
    partnerKeyPerson: "",
    url: "https://bit.ly/4dPs7Mm",
  },
  {
    solutionType: "Workflow Automation",
    dealType: "Customer Deals",
    dealYear: "2024",
    dealYearEnd: "",
    country: "United States",
    companyEntity: "Zscaler Inc.",
    partnerName: "Union Bank of Vermont",
    partnerUrl: "ublocal.com",
    solution: "TruStage\u2122 Compliance Doc Prep",
    dealDetails:
      "Union Bank leverage Baker Hill NextGen\u00ae for consumer lending, along with TruStage\u2122 Compliance Solutions for document preparation.\nBaker Hill NextGen\u00ae and TruStage\u2122 Compliance Solutions offer banks an integrated, end-to-end solution that streamlines the entire loan process with increased speed, consistency, and simplified compliance.",
    companyKeyPerson: "",
    partnerKeyPerson:
      "Jonathan Gould \u2014 SVP, Union Bank of Vermont",
    url: "https://bit.ly/4aBxDPP",
  },
  {
    solutionType: "Digital Transformation",
    dealType: "Partnership",
    dealYear: "2023",
    dealYearEnd: "",
    country: "United States",
    companyEntity: "Zscaler Inc.",
    partnerName: "Chartway Federal Credit Union",
    partnerUrl: "chartway.com",
    solution: "Digital Deposits Solution",
    dealDetails:
      "Chartway Credit Union launched a test of the TruStage Digital Deposit solution with a small segment of its membership.",
    companyKeyPerson: "",
    partnerKeyPerson:
      "Melissa Cade \u2014 Senior Vice President (SVP) of Product and Innovation, Chartway Federal Credit Union",
    url: "https://bit.ly/4dRL3dC",
  },
  {
    solutionType: "Digital Transformation",
    dealType: "Partnership",
    dealYear: "2023",
    dealYearEnd: "",
    country: "United States",
    companyEntity: "Zscaler Inc.",
    partnerName: "Baxter Credit Union",
    partnerUrl: "bcu.org",
    solution:
      "LPL's Institution Services platform\nDigital Tools",
    dealDetails:
      "Collaboration integrates extensive credit union expertise, advanced data, and LPL's digital tools, providing financial professionals serving BCU members with robust resources to enhance consumer financial decision-making.",
    companyKeyPerson:
      "Rob Comfort \u2014 EX Vice President, TruStage Financial Group, Inc.",
    partnerKeyPerson:
      "Mike Valentine \u2014 President and CEO, Baxter Credit Union\nDave Blum \u2014 Executive vice president of BCU and chair of the board of managers, BCU Wealth Advisors LLC\nRich Steinmeier \u2014 Managing Director and Divisional President, Business Development, LPL Financial Holdings Inc.",
    url: "https://bit.ly/4dMYoUr",
  },
  {
    solutionType: "Digital Transformation",
    dealType: "Customer Deals",
    dealYear: "2023",
    dealYearEnd: "",
    country: "United States",
    companyEntity: "Zscaler Inc.",
    partnerName: "Zirtue, LLC",
    partnerUrl: "zirtue.com",
    solution: "Payment Guard Insurance",
    dealDetails:
      "Zirtue announce its deployment of the TruStage Payment Guard product.\nPayment Guard solution enables an innovative solution that could act as a safety net for lenders, underscoring.",
    companyKeyPerson:
      "Danielle Sesko \u2014 Director of Product Management, TruStage Financial Group, Inc.",
    partnerKeyPerson:
      "Dennis Cail \u2014 Co-founder and CEO, Zirtue, LLC",
    url: "https://bit.ly/4bN3IVV",
  },
  {
    solutionType: "Digital Transformation",
    dealType: "In-House Deal",
    dealYear: "2023",
    dealYearEnd: "",
    country: "United States",
    companyEntity: "Zscaler Inc.",
    partnerName: "TruStage Financial Group, Inc.",
    partnerUrl: "trustage.com",
    solution: "Digital Deposits Solution",
    dealDetails:
      "TruStage\u2122 renames CuneXus as Digital Storefront and adds Digital Deposits solution.\nThe adaptable Digital Storefront allows financial institutions to customize and present personalized offers and pre-approvals for lending, deposit products, insurance, or financial services to consumers.",
    companyKeyPerson: "",
    partnerKeyPerson: "",
    url: "https://bit.ly/4dRL3dC",
  },
];
const ws4 = XLSX.utils.json_to_sheet(deals);
ws4["!cols"] = [
  { wch: 22 }, { wch: 16 }, { wch: 10 }, { wch: 12 }, { wch: 16 },
  { wch: 18 }, { wch: 30 }, { wch: 20 }, { wch: 40 }, { wch: 60 },
  { wch: 50 }, { wch: 50 }, { wch: 30 },
];
XLSX.utils.book_append_sheet(wb, ws4, "Deals");

// ─── Sheet 5: Tech Stack ───
const techStack = [
  { company: "Zscaler Inc.", tool: "Cassandra", category: "Database", count: 4 },
  { company: "Zscaler Inc.", tool: "Dynamo DB", category: "Database", count: 2 },
  { company: "Zscaler Inc.", tool: "Redis", category: "Database", count: 2 },
  { company: "Zscaler Inc.", tool: "Snowflake", category: "Database", count: 2 },
  { company: "Zscaler Inc.", tool: "JIRA", category: "DevOps", count: 2 },
  { company: "Zscaler Inc.", tool: "Confluence", category: "DevOps", count: 2 },
  { company: "Zscaler Inc.", tool: "Sentry", category: "DevOps", count: 2 },
  { company: "Zscaler Inc.", tool: "Datadog", category: "DevOps", count: 2 },
  { company: "Zscaler Inc.", tool: "Github", category: "DevOps", count: 2 },
  { company: "Zscaler Inc.", tool: "Circle CI", category: "DevOps", count: 2 },
  { company: "Zscaler Inc.", tool: "Ruby", category: "Programming", count: 2 },
  { company: "Zscaler Inc.", tool: "Python", category: "Programming", count: 1 },
  { company: "Zscaler Inc.", tool: "GO", category: "Programming", count: 2 },
  { company: "Zscaler Inc.", tool: "Swift", category: "Programming", count: 3 },
  { company: "Zscaler Inc.", tool: "Scala", category: "Programming", count: 2 },
  { company: "Zscaler Inc.", tool: "Kotlin", category: "Programming", count: 4 },
  { company: "Zscaler Inc.", tool: "AWS", category: "Cloud", count: 2 },
  { company: "Zscaler Inc.", tool: "Cloudflare", category: "Cloud", count: 2 },
];
const ws5 = XLSX.utils.json_to_sheet(techStack);
ws5["!cols"] = [
  { wch: 18 }, { wch: 18 }, { wch: 16 }, { wch: 8 },
];
XLSX.utils.book_append_sheet(wb, ws5, "Tech Stack");

// ─── Sheet 6: Opportunities ───
const opportunities = [
  {
    opportunity: "AI-Driven Rider Lifecycle Optimization",
    opportunityDetails:
      "Zscaler Inc. is investing in streamlining its logistics and operations, including improvements to rider onboarding and experience.\nBuild a complete AI-driven rider lifecycle platform \u2014 from intelligent onboarding, performance prediction, and churn analysis to real-time route optimization. This would reduce delivery time, improve operational efficiency, and enhance rider satisfaction.",
  },
  {
    opportunity: "Real-Time Personalization Through Advanced Data Analytics",
    opportunityDetails:
      "With a large and diverse user base across multiple countries, Zscaler Inc. can benefit from deeper personalization.\nImplement a real-time analytics system that personalizes content, search results, and promotional offers based on individual user behavior, location, and order history. This enhances customer engagement and increases order frequency.",
  },
  {
    opportunity: "Next-Generation Retail Media Monetization Platform",
    opportunityDetails:
      "Zscaler Inc. has begun developing in-app advertising solutions and achieved notable success through its partnership with Criteo.\nBuild a scalable in-app advertising solution that allows restaurant and FMCG partners to create, manage, and analyze their ad campaigns. Integrate with programmatic ad partners and deliver precise targeting to boost advertising revenue.",
  },
  {
    opportunity: "Unified Merchant Experience Platform",
    opportunityDetails:
      "Create a comprehensive portal for restaurant partners that centralizes onboarding, performance analytics, order management, menu configuration, and integration with POS and inventory systems. This simplifies operations and improves partner satisfaction.",
  },
  {
    opportunity: "Cloud-Native Microservices Architecture",
    opportunityDetails:
      "Design and implement a modular, microservices-based backend architecture supported by automated CI/CD pipelines and container orchestration. This ensures scalability, resilience, and faster feature rollout across global markets.",
  },
  {
    opportunity: "AI-Based Customer Support System",
    opportunityDetails:
      "Deploy a conversational AI system across multiple channels to automate common customer queries, enable intelligent escalation, and continuously learn from user interactions. This reduces response time and improves customer experience at scale.",
  },
];
const ws6 = XLSX.utils.json_to_sheet(opportunities);
ws6["!cols"] = [{ wch: 45 }, { wch: 80 }];
XLSX.utils.book_append_sheet(wb, ws6, "Opportunities");

// ─── Sheet 7: Financials ───
const financials = [
  { year: "2023", revenue: 6761, netIncome: 1336, operatingIncome: 191.3 },
  { year: "2024", revenue: 6774, netIncome: 1107, operatingIncome: 228.7 },
  { year: "2025", revenue: 8290, netIncome: 2031, operatingIncome: 1157 },
];
const ws7 = XLSX.utils.json_to_sheet(financials);
ws7["!cols"] = [
  { wch: 10 }, { wch: 14 }, { wch: 14 }, { wch: 18 },
];
XLSX.utils.book_append_sheet(wb, ws7, "Financials");

// ─── Sheet 8: Headcount History ───
const headcountHistory = [
  { year: "2023", count: 897 },
  { year: "2024", count: 1100 },
  { year: "2025", count: 1114 },
];
const ws8 = XLSX.utils.json_to_sheet(headcountHistory);
ws8["!cols"] = [{ wch: 10 }, { wch: 10 }];
XLSX.utils.book_append_sheet(wb, ws8, "Headcount History");

// ─── Sheet 9: Analyst Notes (section-level only, no summary, no per-center) ───
const analystNotes = [
  {
    section: "Business Snapshot",
    notes:
      "Revenue stands at $2,167 Mn with a net income of $430 Mn, reflecting a healthy ~19.8% profit margin \u2014 a strong indicator of operational efficiency in the cybersecurity SaaS space.\nMarket cap of $31.2 Bn implies a ~14.4x revenue multiple, signaling the market continues to price in significant growth expectations despite the recent stock pullback.\nStock price has retreated from its 2024\u201325 peak of ~$260 to the current $213.45, a ~18% correction. The 5-year chart shows cyclical volatility \u2014 the 2021\u201323 drawdown recovered fully before the latest downturn.\nP/E ratio of ~72x (based on current earnings) remains elevated, suggesting the valuation is predicated on sustained topline acceleration and margin expansion over the next 2\u20133 fiscal years.",
  },
  {
    section: "GCC Snapshot",
    notes:
      "The oldest center was established in 2007 in Bengaluru (Zscaler Softech India Pvt. Ltd.), anchoring the company's long-standing India presence.\nThe largest facility by headcount is in Bengaluru with 1001 employees, indicating a primary hub for delivery and operations.\nThe dominant center model is IT, reflecting the organization's preference for captive technology operations in the India geography.\nAverage center size is approximately 557 employees, suggesting large-scale, mature operations across the portfolio.",
  },
  {
    section: "Center Details",
    notes:
      "The oldest center was established in 2007 in Bengaluru, anchoring the company's long-standing India presence.\nThe largest facility by headcount is in Bengaluru with 1001 employees, indicating a primary hub for delivery and operations.\nThe dominant center model is IT, reflecting the organization's preference for captive technology operations.\nAverage center size is approximately 557 employees, suggesting large-scale, mature operations.",
  },
  {
    section: "Contact Details",
    notes:
      "The team features a strong engineering leadership bench with Vice President, Director, and Senior Director level roles.\n80% of the identified contacts are based in Bengaluru, aligning with it being the primary development hub.\n100% of the contacts have LinkedIn profiles, enabling direct professional engagement.\nThe leadership mix spans engineering, security, and SRE \u2014 reflecting a well-rounded technical management structure.",
  },
  {
    section: "Deal Details",
    notes:
      "Digital Transformation is the primary solution focus with 7 deals, followed by Cloud (1) and Data and Analytics (1). This diversification across solution categories reduces vendor concentration risk.\n100% of deals are concentrated in United States. A single-geography focus may present expansion opportunities in other markets.\nThe partnership strategy spans credit unions, fintech firms, and financial service providers \u2014 indicating a focused vertical approach in the financial services industry.",
  },
  {
    section: "Tech Details",
    notes:
      "Database layer led by Cassandra (4 adoptions) and supplemented by Dynamo DB, Redis, and Snowflake \u2014 a polyglot persistence strategy balancing performance and analytics.\nDevOps toolchain includes JIRA, Confluence, Sentry, Datadog, Github, and Circle CI \u2014 indicating a mature CI/CD and observability practice.\nProgramming languages span Ruby, Python, GO, Swift, Scala, and Kotlin \u2014 with Kotlin (4) and Swift (3) leading, reflecting strong mobile and modern backend investment.\nCloud infrastructure built on AWS and Cloudflare, consistent with a security-first, multi-cloud approach.",
  },
  {
    section: "Opportunity Map",
    notes:
      "AI-driven initiatives (Rider Lifecycle, Customer Support) signal strong demand for intelligent automation and ML-powered optimization.\nPersonalization and retail media opportunities indicate potential for data monetization and engagement-driven revenue growth.\nCloud-native microservices architecture opportunity aligns with industry trends toward scalable, resilient distributed systems.\nMerchant experience platform opportunity suggests a need for partner-facing digital tools \u2014 a common growth vector in platform businesses.",
  },
];
const ws9 = XLSX.utils.json_to_sheet(analystNotes);
ws9["!cols"] = [{ wch: 22 }, { wch: 100 }];
XLSX.utils.book_append_sheet(wb, ws9, "Analyst Notes");

// ─── Write file ───
const outPath = path.join(__dirname, "..", "data", "zscaler.xlsx");
XLSX.writeFile(wb, outPath);
console.log(`Template written to ${outPath}`);
