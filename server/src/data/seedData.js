// Seed content for Anjali Devi's portfolio.
// This is the single source of truth: it seeds MongoDB on first run,
// and also acts as a fallback if the database is unavailable so the
// site always has data to serve.

export const projects = [
  {
    slug: 'casheco-crm',
    title: 'Casheco CRM & POS',
    tagline: 'Live full-stack platform serving real production users',
    description:
      'A complete CRM + Point-of-Sale system for a live electronics resale business. Handles inventory, device valuation, EMI/payments, invoicing, buyback rules, repairs and role-based staff access — deployed and running in production.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Firebase Auth', 'AWS EC2', 'Nginx'],
    highlights: [
      'Deployed live on AWS EC2 with Nginx, PM2 & HTTPS (Let’s Encrypt)',
      'Firebase phone-OTP authentication + role-based access control',
      'Invoice generation with PDF export, WhatsApp & email delivery',
      'MongoDB Atlas with daily automated backups & Sentry monitoring'
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
      'A high-performance URL shortener built to scale, integrating Gemini AI for smart slug generation and automated URL safety analysis.',
    tech: ['Node.js', 'Backend', 'Gemini AI', 'System Design'],
    highlights: [
      'Scalable backend supporting 1M+ URLs with sub-10ms latency',
      'Integrated Gemini AI for smart slug generation',
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
      'A Retrieval-Augmented Generation assistant that lets you chat across multiple PDF documents using embeddings, FAISS vector search and semantic retrieval.',
    tech: ['Python', 'Embeddings', 'FAISS', 'RAG', 'LLM'],
    highlights: [
      'Semantic retrieval across multiple PDF documents',
      'Pipeline: PDF parsing → embeddings → retrieval → LLM response',
      'Scalable design for large document sets'
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
      'An inventory management backend featuring low-stock alerts and automated stock monitoring, with a strong focus on database performance.',
    tech: ['Backend', 'MySQL', 'REST APIs', 'Query Optimization'],
    highlights: [
      'Low-stock alerts & automated stock monitoring',
      'Improved database query performance by 45%'
    ],
    liveUrl: '',
    repoUrl: 'https://github.com/',
    featured: false,
    year: 2024
  }
];

export const skills = [
  {
    category: 'Languages',
    items: ['Python', 'JavaScript', 'C++', 'SQL'],
    order: 1
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'JWT Auth', 'Payment Integration'],
    order: 2
  },
  {
    category: 'Frontend',
    items: ['React', 'Vite', 'HTML5', 'CSS3', 'Framer Motion'],
    order: 3
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'MySQL', 'Schema Design', 'Query Optimization'],
    order: 4
  },
  {
    category: 'DevOps & Tools',
    items: ['Git', 'GitHub', 'Linux', 'Docker', 'CI/CD', 'AWS', 'Postman'],
    order: 5
  },
  {
    category: 'Libraries / ML',
    items: ['NumPy', 'Pandas', 'scikit-learn'],
    order: 6
  }
];
