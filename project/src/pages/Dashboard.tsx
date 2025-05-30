import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, 
  Compass, 
  GraduationCap,
  BarChart3,
  BookOpen,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import AssessmentCard from '../components/AssessmentCard';
import ProgressCircle from '../components/ProgressCircle';
import CareerCard from '../components/CareerCard';
import { useUser } from '../context/UserContext';
import { mockCareers, generateMockAssessment } from '../data/mockData';

const Dashboard = () => {
  const { user, assessment, setAssessment } = useUser();

  useEffect(() => {
    // Generate mock assessment data if not already present
    if (!assessment && user) {
      setAssessment(generateMockAssessment(user.id));
    }
  }, [user, assessment, setAssessment]);

  if (!user) {
    return null; // Should never happen as we redirect to Welcome if user is null
  }

  // Calculate profile completion percentage
  const profileCompletion = () => {
    let total = 2; // Name and email are mandatory
    let completed = 2;
    
    // Education level
    total += 1;
    if (user.educationLevel) completed += 1;
    
    // Major
    total += 1;
    if (user.major) completed += 1;
    
    // Interests
    total += 1;
    if (user.interests.length > 0) completed += 1;
    
    // Skills
    total += 1;
    if (user.skills.length > 0) completed += 1;
    
    return Math.round((completed / total) * 100);
  };

  // Top career matches based on mock data
  const topCareers = mockCareers.slice(0, 3);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {user.name}! Track your progress and explore career opportunities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Profile & Assessment Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-gradient-to-br from-primary-500 to-primary-700 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Profile Completion</h3>
                  <p className="mt-1 text-primary-100 text-sm">
                    Complete your profile to get better recommendations
                  </p>
                </div>
                <ProgressCircle 
                  percentage={profileCompletion()} 
                  size={80} 
                  strokeWidth={6}
                  circleColor="rgba(255,255,255,0.2)"
                  progressColor="#ffffff"
                  textColor="#ffffff"
                />
              </div>
              <div className="mt-4">
                <Link to="/profile" className="btn bg-white text-primary-600 hover:bg-primary-50">
                  Update Profile
                </Link>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900">Assessment Progress</h3>
              <p className="mt-1 text-gray-500 text-sm">
                {assessment?.isComplete
                  ? 'You have completed all assessments!'
                  : 'Complete assessments to discover career matches'}
              </p>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {assessment ? 3 : 0}
                  </div>
                  <div className="text-xs text-gray-500">Sections Completed</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {topCareers.length}
                  </div>
                  <div className="text-xs text-gray-500">Career Matches</div>
                </div>
              </div>
              
              <div className="mt-4">
                <Link to="/assessment" className="btn btn-primary">
                  {assessment?.isComplete ? 'Review Assessment' : 'Continue Assessment'}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Top Career Matches */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Your Top Career Matches</h2>
              <Link to="/career-match" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {topCareers.map((career) => (
                <CareerCard
                  key={career.id}
                  title={career.title}
                  description={career.description}
                  matchPercentage={career.matchPercentage}
                  salary={career.averageSalary}
                  outlook={career.growthOutlook}
                  skills={career.requiredSkills}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Sidebar: Quick Links */}
        <div className="space-y-6">
          <div className="card bg-gradient-to-r from-secondary-500 to-secondary-600 text-white">
            <h3 className="text-xl font-semibold">AI Career Counselor</h3>
            <p className="mt-1 text-secondary-100 text-sm">
              Need personalized guidance? Chat with our AI career counselor!
            </p>
            <div className="mt-4">
              <Link to="/ai-counselor" className="btn bg-white text-secondary-600 hover:bg-secondary-50">
                Start Conversation
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Explore Tools</h3>
            <div className="space-y-3">
              <AssessmentCard
                title="Career Assessment"
                description="Discover your ideal career path"
                icon={<ClipboardCheck className="h-5 w-5" />}
                completed={assessment?.isComplete}
                percentage={assessment?.isComplete ? 100 : 0}
                linkTo="/assessment"
              />
              
              <AssessmentCard
                title="Career Explorer"
                description="Browse matching career options"
                icon={<Compass className="h-5 w-5" />}
                completed={false}
                percentage={0}
                linkTo="/career-match"
              />
              
              <AssessmentCard
                title="Education Pathways"
                description="Find relevant courses and degrees"
                icon={<GraduationCap className="h-5 w-5" />}
                completed={false}
                percentage={0}
                linkTo="/education"
              />
              
              <AssessmentCard
                title="Job Market Insights"
                description="Explore industry trends and demand"
                icon={<BarChart3 className="h-5 w-5" />}
                completed={false}
                percentage={0}
                linkTo="/job-insights"
              />
              
              <AssessmentCard
                title="Career Resources"
                description="Access guides, tutorials and more"
                icon={<BookOpen className="h-5 w-5" />}
                completed={false}
                percentage={0}
                linkTo="/resources"
              />
              
              <AssessmentCard
                title="AI Career Counselor"
                description="Get personalized career advice"
                icon={<MessageSquare className="h-5 w-5" />}
                completed={false}
                percentage={0}
                linkTo="/ai-counselor"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;