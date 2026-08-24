export const projects = [
  {
    id: 1,
    title: 'AI Powered Swachhata Monitor',
    description:
      'Web application and dashboard to monitor office cleanliness using OpenCV real-time image analysis. Reduced manual inspection time by ~40%.',
    tags: ['Flutter', 'OpenCV', 'Firebase', 'React'],
    category: 'fullstack',
    liveUrl: '#',
    githubUrl: 'https://github.com/kalaharshal',
    featured: true,
  },
  {
    id: 2,
    title: 'Civic Issue Reporting System',
    description:
      'Crowdsourced civic-issue reporting app with photo upload, geotagging, and real-time tracking. Increased citizen submissions by 50%.',
    tags: ['Flutter', 'Firebase', 'Google Maps API'],
    category: 'mobile',
    liveUrl: '#',
    githubUrl: 'https://github.com/kalaharshal',
    featured: true,
  },
  {
    id: 3,
    title: 'IPO Dashboard',
    description:
      'Real-time IPO dashboard with structured financial data, interactive visualizations, and responsive UI.',
    tags: ['React.js', 'REST APIs', 'Chart.js', 'TailwindCSS'],
    category: 'frontend',
    liveUrl: '#',
    githubUrl: 'https://github.com/kalaharshal',
    featured: true,
  },
  {
    id: 4,
    title: 'Social Media API',
    description: 'RESTful API for a social media platform with authentication and rate limiting.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    category: 'backend',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Portfolio Generator',
    description: 'CLI tool that generates beautiful portfolio websites from a simple config file.',
    tags: ['TypeScript', 'Node.js', 'React'],
    category: 'tools',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'Weather App',
    description: 'Beautiful weather application with location-based forecasts and animations.',
    tags: ['React', 'Weather API', 'Framer Motion'],
    category: 'frontend',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
];

export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'tools', label: 'Tools' },
];

export const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'C/C++', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'Dart / JavaScript', level: 85 },
    ],
  },
  {
    title: 'Web & Mobile',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Node.js / Express', level: 85 },
      { name: 'Flutter', level: 90 },
      { name: 'HTML / CSS', level: 95 },
    ],
  },
  {
    title: 'Data & Tools',
    skills: [
      { name: 'Machine Learning', level: 80 },
      { name: 'SQL / MongoDB', level: 85 },
      { name: 'Git / Docker', level: 80 },
      { name: 'Firebase', level: 85 },
    ],
  },
];

export const technologies = [
  'Python', 'C++', 'Java', 'React.js', 'Node.js', 'Express.js',
  'Flutter', 'Firebase', 'MongoDB', 'PostgreSQL', 'Docker',
  'Git', 'Pandas', 'NumPy', 'Scikit-learn', 'OpenCV',
];

export const experiences = [
  {
    type: 'work',
    title: 'Software Development Intern',
    organization: 'Bluestock Fintech',
    period: 'May 2025 - Jun 2025',
    description:
      'Developed a web-based IPO dashboard using React.js. Integrated REST APIs to display financial data and optimized performance.',
    skills: ['React.js', 'REST APIs', 'UI/UX', 'JSON'],
  },
  {
    type: 'education',
    title: 'B.Tech in Computer Science',
    organization: 'Walchand Institute of Technology',
    period: '2023 - Present',
    description: 'CGPA: 9.65. Minor in EnTC. Focusing on software engineering and data science.',
    skills: ['DSA', 'Web Dev', 'ML'],
  },
  {
    type: 'education',
    title: 'HSC (12th Grade)',
    organization: 'Sarosh Junior College',
    period: '2020 - 2022',
    description: 'Secured 92%',
    skills: ['Science', 'Mathematics'],
  },
];

export const achievements = [
  { title: 'Programming with Generative AI', issuer: 'NPTEL', year: '2025' },
  { title: 'ML Foundation', issuer: 'Infosys', year: '2025' },
  { title: 'Python Foundation', issuer: 'Infosys', year: '2024' },
];

export const contactInfo = [
  { label: 'Email', value: 'kalaharshal03@gmail.com', href: 'mailto:kalaharshal03@gmail.com' },
  { label: 'Location', value: 'Solapur, Maharashtra', href: '#' },
  { label: 'Phone', value: '+91 86687 63831', href: 'tel:+918668763831' },
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/kalaharshal' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/harshal-kala' },
];
