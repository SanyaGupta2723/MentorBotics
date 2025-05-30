import { UserProfile, Assessment, CareerPath, Education, JobInsight, Resource } from '../types';

export const mockCareers: CareerPath[] = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software systems and applications. Work with various programming languages and frameworks to create efficient and scalable software solutions.',
    matchPercentage: 92,
    growthOutlook: 'Strong growth (22% over 10 years)',
    averageSalary: '$110,000 - $150,000',
    requiredSkills: ['Programming', 'Problem Solving', 'Software Design', 'Data Structures', 'Algorithms'],
    recommendedEducation: ['Bachelor\'s in Computer Science', 'Full-Stack Development Bootcamp', 'Cloud Certification'],
    industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce']
  },
  {
    id: '2',
    title: 'Data Scientist',
    description: 'Analyze complex data sets to identify patterns and insights. Build predictive models and machine learning algorithms to solve business problems and inform decision-making.',
    matchPercentage: 88,
    growthOutlook: 'Very strong growth (36% over 10 years)',
    averageSalary: '$120,000 - $160,000',
    requiredSkills: ['Statistics', 'Machine Learning', 'Python', 'Data Visualization', 'SQL'],
    recommendedEducation: ['Master\'s in Data Science', 'Statistics Degree', 'Machine Learning Certification'],
    industries: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing']
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    description: 'Create intuitive and engaging user experiences for digital products. Design user interfaces that are both aesthetically pleasing and functional, focusing on user needs and behaviors.',
    matchPercentage: 85,
    growthOutlook: 'Strong growth (23% over 10 years)',
    averageSalary: '$90,000 - $130,000',
    requiredSkills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
    recommendedEducation: ['Degree in Design', 'UX Certificate Program', 'Human-Computer Interaction Course'],
    industries: ['Technology', 'E-commerce', 'Media', 'Entertainment']
  },
  {
    id: '4',
    title: 'Digital Marketing Specialist',
    description: 'Develop and implement marketing strategies across digital channels. Create campaigns, analyze performance metrics, and optimize marketing efforts to reach target audiences.',
    matchPercentage: 79,
    growthOutlook: 'Moderate growth (10% over 10 years)',
    averageSalary: '$60,000 - $90,000',
    requiredSkills: ['SEO', 'Social Media Marketing', 'Content Creation', 'Analytics', 'Email Marketing'],
    recommendedEducation: ['Marketing Degree', 'Digital Marketing Certificate', 'Google Analytics Certification'],
    industries: ['Retail', 'Media', 'Technology', 'Non-profit', 'Hospitality']
  },
  {
    id: '5',
    title: 'Project Manager',
    description: 'Plan, execute, and close projects on time and within budget. Coordinate resources, manage teams, and ensure project goals are achieved according to specifications.',
    matchPercentage: 75,
    growthOutlook: 'Moderate growth (8% over 10 years)',
    averageSalary: '$80,000 - $120,000',
    requiredSkills: ['Leadership', 'Organization', 'Communication', 'Risk Management', 'Budgeting'],
    recommendedEducation: ['Business Degree', 'PMP Certification', 'Agile/Scrum Certification'],
    industries: ['Technology', 'Construction', 'Healthcare', 'Finance', 'Manufacturing']
  }
];

export const mockEducation: Education[] = [
  {
    id: '1',
    type: 'degree',
    name: 'Bachelor of Science in Computer Science',
    provider: 'State University',
    duration: '4 years',
    description: 'A comprehensive program covering programming fundamentals, algorithms, data structures, software engineering, databases, and more.',
    link: 'https://example.edu/cs-degree',
    cost: '$40,000 - $120,000 (total)'
  },
  {
    id: '2',
    type: 'certification',
    name: 'Full-Stack Web Development Bootcamp',
    provider: 'Tech Academy',
    duration: '12 weeks',
    description: 'Intensive training in front-end and back-end web development technologies including HTML, CSS, JavaScript, React, Node.js, and databases.',
    link: 'https://example.edu/webdev-bootcamp',
    cost: '$12,000 - $15,000'
  },
  {
    id: '3',
    type: 'course',
    name: 'Introduction to Machine Learning',
    provider: 'Online Learning Platform',
    duration: '8 weeks',
    description: 'Learn the fundamentals of machine learning algorithms, techniques, and implementation using Python and popular libraries.',
    link: 'https://example.edu/machine-learning',
    cost: '$200 - $500'
  },
  {
    id: '4',
    type: 'degree',
    name: 'Master of Business Administration (MBA)',
    provider: 'Business School',
    duration: '2 years',
    description: 'Advanced business education covering management, finance, marketing, operations, and leadership skills.',
    link: 'https://example.edu/mba',
    cost: '$60,000 - $150,000 (total)'
  },
  {
    id: '5',
    type: 'certification',
    name: 'Project Management Professional (PMP)',
    provider: 'Project Management Institute',
    duration: 'Self-paced (exam prep)',
    description: 'Industry-recognized certification validating expertise in project management methodologies and best practices.',
    link: 'https://example.edu/pmp',
    cost: '$1,500 - $2,000'
  }
];

export const mockJobInsights: JobInsight[] = [
  {
    title: 'Software Developer',
    industry: 'Technology',
    demandTrend: 'rising',
    salaryRange: '$80,000 - $150,000',
    requiredSkills: ['JavaScript', 'Python', 'Cloud Computing', 'Agile Methodologies'],
    futureOutlook: 'Continued strong demand with increased focus on AI and cloud technologies',
    description: 'Software developers design and build computer applications. The job market for developers continues to grow with expanding digital transformation across industries.'
  },
  {
    title: 'Data Analyst',
    industry: 'Various',
    demandTrend: 'rising',
    salaryRange: '$65,000 - $110,000',
    requiredSkills: ['SQL', 'Data Visualization', 'Statistical Analysis', 'Excel'],
    futureOutlook: 'Growing demand as organizations increasingly rely on data-driven decision making',
    description: 'Data analysts interpret data and turn it into information which can offer ways to improve a business, thus affecting business decisions.'
  },
  {
    title: 'Healthcare Administrator',
    industry: 'Healthcare',
    demandTrend: 'stable',
    salaryRange: '$70,000 - $120,000',
    requiredSkills: ['Healthcare Regulations', 'Management', 'Electronic Health Records', 'Budgeting'],
    futureOutlook: 'Stable growth with aging population increasing healthcare needs',
    description: 'Healthcare administrators manage healthcare facilities, services, programs, staff, budgets, and relations with other organizations.'
  },
  {
    title: 'Marketing Specialist',
    industry: 'Various',
    demandTrend: 'stable',
    salaryRange: '$50,000 - $90,000',
    requiredSkills: ['Social Media Marketing', 'Content Creation', 'SEO', 'Analytics'],
    futureOutlook: 'Evolving role with increasing focus on digital channels and data analytics',
    description: 'Marketing specialists help organizations promote their products, services, or ideas. The field is evolving with digital transformation.'
  },
  {
    title: 'Mechanical Engineer',
    industry: 'Manufacturing',
    demandTrend: 'stable',
    salaryRange: '$70,000 - $110,000',
    requiredSkills: ['CAD Software', 'Product Design', 'Thermodynamics', 'Material Science'],
    futureOutlook: 'Steady demand with opportunities in renewable energy and automation',
    description: 'Mechanical engineers design, develop, build, and test mechanical devices, including tools, engines, and machines.'
  }
];

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'How to Prepare for Technical Interviews',
    type: 'article',
    description: 'A comprehensive guide to preparing for technical interviews in the software industry. Includes common questions, preparation strategies, and tips from hiring managers.',
    url: 'https://example.com/tech-interview-guide',
    tags: ['Interviews', 'Technology', 'Career Tips'],
    createdAt: new Date('2023-05-15')
  },
  {
    id: '2',
    title: 'Introduction to Data Science',
    type: 'video',
    description: 'A beginner-friendly overview of the data science field, explaining key concepts, required skills, and career paths.',
    url: 'https://example.com/data-science-intro',
    tags: ['Data Science', 'Beginner', 'Career Overview'],
    createdAt: new Date('2023-06-22')
  },
  {
    id: '3',
    title: 'Resume Builder Tool',
    type: 'tool',
    description: 'An interactive tool to create professional resumes tailored to specific industries and job roles.',
    url: 'https://example.com/resume-builder',
    tags: ['Resume', 'Job Application', 'Tools'],
    createdAt: new Date('2023-04-10')
  },
  {
    id: '4',
    title: 'Networking for Career Success',
    type: 'guide',
    description: 'A step-by-step guide to building and leveraging professional networks for career advancement.',
    url: 'https://example.com/networking-guide',
    tags: ['Networking', 'Professional Development', 'Career Growth'],
    createdAt: new Date('2023-07-05')
  },
  {
    id: '5',
    title: 'Finding Your Career Path: A Self-Assessment Guide',
    type: 'article',
    description: 'A structured approach to self-assessment that helps identify suitable career paths based on your strengths, interests, and values.',
    url: 'https://example.com/career-self-assessment',
    tags: ['Self-Assessment', 'Career Planning', 'Personal Development'],
    createdAt: new Date('2023-03-18')
  }
];

export const generateMockAssessment = (userId: string): Assessment => {
  return {
    id: '1',
    userId,
    personalityType: 'Analytical Thinker',
    strengths: ['Problem Solving', 'Attention to Detail', 'Logical Reasoning', 'Critical Thinking'],
    weaknesses: ['Public Speaking', 'Multitasking'],
    learningStyle: 'Visual',
    workEnvironmentPreferences: ['Collaborative', 'Innovative', 'Structured'],
    values: ['Growth', 'Creativity', 'Balance', 'Challenge'],
    completedSections: {
      personality: true,
      skills: true,
      interests: true,
      values: true
    },
    isComplete: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};