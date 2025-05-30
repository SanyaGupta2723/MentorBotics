export interface UserProfile {
  id: string;
  name: string;
  email: string;
  educationLevel: string;
  major?: string;
  interests: string[];
  skills: string[];
  profileCompleted: boolean;
  createdAt: Date;
}

export interface Assessment {
  id: string;
  userId: string;
  personalityType: string;
  strengths: string[];
  weaknesses: string[];
  learningStyle: string;
  workEnvironmentPreferences: string[];
  values: string[];
  completedSections: {
    personality: boolean;
    skills: boolean;
    interests: boolean;
    values: boolean;
  };
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  growthOutlook: string;
  averageSalary: string;
  requiredSkills: string[];
  recommendedEducation: string[];
  industries: string[];
}

export interface Education {
  id: string;
  type: 'degree' | 'certification' | 'course';
  name: string;
  provider: string;
  duration: string;
  description: string;
  link: string;
  cost: string;
}

export interface JobInsight {
  title: string;
  industry: string;
  demandTrend: 'rising' | 'stable' | 'declining';
  salaryRange: string;
  requiredSkills: string[];
  futureOutlook: string;
  description: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'tool' | 'guide';
  description: string;
  url: string;
  tags: string[];
  createdAt: Date;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}