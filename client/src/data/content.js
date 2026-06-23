// Static portfolio content sourced from Anjali's resume.
// Projects & skills are fetched from the backend API, but these
// sections (profile, education, experience, achievements) live here.

export const profile = {
  name: 'Anjali Devi',
  role: 'Software Engineer',
  tagline: 'I build scalable backend systems & full-stack MERN applications.',
  location: 'Jaipur, India',
  email: 'anjalidevi312005@gmail.com',
  summary:
    'Computer Science undergraduate (CGPA 8.85) with hands-on experience in backend development, REST APIs, authentication and payment integration. I’ve shipped production systems serving real users and solved 200+ DSA problems. Currently building backend for a live electronics resale platform.',
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    leetcode: 'https://leetcode.com/'
  }
};

export const stats = [
  { value: '8.85', label: 'CGPA' },
  { value: '200+', label: 'DSA Problems' },
  { value: '2', label: 'Internships' },
  { value: '1M+', label: 'URLs Served' }
];

export const education = [
  {
    school: 'Swami Keshvanand Institute of Technology',
    detail: 'B.Tech in Computer Science Engineering',
    score: 'CGPA: 8.85',
    period: '2023 – 2027'
  },
  {
    school: 'JKBOSE — Class XII (PCM)',
    detail: 'Senior Secondary',
    score: '91.6%',
    period: '2023'
  },
  {
    school: 'JKBOSE — Class X',
    detail: 'Secondary',
    score: '91%',
    period: '2021'
  }
];

export const experience = [
  {
    company: 'Casheco.in',
    role: 'Backend Developer',
    period: 'May 2026 – Present',
    current: true,
    points: [
      'Contributing to backend development of a live electronics resale platform serving production users.',
      'Developing and integrating REST APIs and business logic for device valuation and inventory workflows.',
      'Working with MySQL databases, debugging production issues, and optimizing backend performance.',
      'Collaborating with the backend team using Git and industry-standard development practices.'
    ]
  },
  {
    company: 'Stoxilla',
    role: 'Software Engineer Intern',
    period: 'Jun 2025 – Aug 2025',
    current: false,
    points: [
      'Built and integrated a payment gateway and wallet system supporting 1,000+ active users.',
      'Developed and tested 10+ REST APIs, improving backend response latency by 25%.',
      'Implemented JWT authentication and secure access control for protected endpoints.',
      'Collaborated on backend debugging, API documentation, and version control using Git.'
    ]
  }
];

export const achievements = [
  { icon: '🧩', text: 'Solved 200+ DSA problems on LeetCode.' },
  { icon: '🎓', text: 'Awarded Prime Minister’s Special Scholarship Scheme (PMSSS) for academic excellence.' },
  { icon: '🏆', text: 'Finalist at Codeformer-4 — awarded Best Communicator.' }
];

// Fallback data used only if the API can't be reached.
export const fallbackProjects = [
  {
    slug: 'casheco-crm',
    title: 'Casheco CRM & POS',
    tagline: 'Live full-stack platform serving real production users',
    description:
      'A complete CRM + Point-of-Sale system for a live electronics resale business — inventory, device valuation, EMI/payments, invoicing, buyback and role-based staff access. Deployed and running in production.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Firebase Auth', 'AWS EC2', 'Nginx'],
    highlights: [
      'Deployed live on AWS EC2 with Nginx, PM2 & HTTPS',
      'Firebase phone-OTP auth + role-based access control',
      'Invoice PDF export with WhatsApp & email delivery',
      'MongoDB Atlas with daily backups & Sentry monitoring'
    ],
    liveUrl: 'https://www.casheco.store',
    repoUrl: '',
    featured: true,
    year: 2026
  },
  {
    slug: 'distributed-ai-url-shortener',
    title: 'Distributed AI URL Shortener',
    tagline: 'Scalable backend with AI-powered slug generation',
    description:
      'A high-performance URL shortener integrating Gemini AI for smart slug generation and automated URL safety analysis.',
    tech: ['Node.js', 'Backend', 'Gemini AI', 'System Design'],
    highlights: [
      'Scalable backend supporting 1M+ URLs with sub-10ms latency',
      'Gemini AI smart slug generation',
      'Automated URL safety analysis'
    ],
    liveUrl: '',
    repoUrl: 'https://github.com/',
    featured: false,
    year: 2025
  },
  {
    slug: 'multi-document-chat-assistant',
    title: 'Multi-Document Chat Assistant (RAG)',
    tagline: 'AI assistant for querying multiple PDFs',
    description:
      'A RAG assistant to chat across multiple PDFs using embeddings, FAISS vector search and semantic retrieval.',
    tech: ['Python', 'Embeddings', 'FAISS', 'RAG', 'LLM'],
    highlights: [
      'Semantic retrieval across multiple documents',
      'PDF parsing → embeddings → retrieval → LLM response'
    ],
    liveUrl: '',
    repoUrl: 'https://github.com/',
    featured: false,
    year: 2025
  },
  {
    slug: 'smart-inventory-system',
    title: 'Smart Inventory System',
    tagline: 'Inventory backend with automated stock monitoring',
    description:
      'An inventory backend with low-stock alerts and automated stock monitoring, focused on database performance.',
    tech: ['Backend', 'MySQL', 'REST APIs', 'Query Optimization'],
    highlights: ['Low-stock alerts & automated monitoring', 'Improved query performance by 45%'],
    liveUrl: '',
    repoUrl: 'https://github.com/',
    featured: false,
    year: 2024
  }
];

export const fallbackSkills = [
  { category: 'Languages', items: ['Python', 'JavaScript', 'C++', 'SQL'], order: 1 },
  { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'JWT Auth', 'Payment Integration'], order: 2 },
  { category: 'Frontend', items: ['React', 'Vite', 'HTML5', 'CSS3', 'Framer Motion'], order: 3 },
  { category: 'Databases', items: ['MongoDB', 'MySQL', 'Schema Design', 'Query Optimization'], order: 4 },
  { category: 'DevOps & Tools', items: ['Git', 'GitHub', 'Linux', 'Docker', 'CI/CD', 'AWS', 'Postman'], order: 5 },
  { category: 'Libraries / ML', items: ['NumPy', 'Pandas', 'scikit-learn'], order: 6 }
];
