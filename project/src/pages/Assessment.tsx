import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Assessment as AssessmentType } from '../types';
import { generateMockAssessment } from '../data/mockData';

const Assessment = () => {
  const { user, assessment, setAssessment } = useUser();
  const navigate = useNavigate();
  
  const [currentSection, setCurrentSection] = useState('personality');
  const [isCompleting, setIsCompleting] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    // Initialize assessment if not exists
    if (!assessment) {
      const initialAssessment: AssessmentType = {
        id: Date.now().toString(),
        userId: user.id,
        personalityType: '',
        strengths: [],
        weaknesses: [],
        learningStyle: '',
        workEnvironmentPreferences: [],
        values: [],
        completedSections: {
          personality: false,
          skills: false,
          interests: false,
          values: false
        },
        isComplete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setAssessment(initialAssessment);
    }
    
    // Calculate progress
    const sections = ['personality', 'skills', 'interests', 'values'];
    if (assessment) {
      const completedCount = Object.values(assessment.completedSections).filter(Boolean).length;
      setProgress(Math.round((completedCount / sections.length) * 100));
    }
  }, [user, assessment, navigate, setAssessment]);
  
  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };
  
  const completeAssessment = () => {
    setIsCompleting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate mock assessment results
      const mockResults = generateMockAssessment(user!.id);
      setAssessment({
        ...mockResults,
        completedSections: {
          personality: true,
          skills: true,
          interests: true,
          values: true
        },
        isComplete: true,
        updatedAt: new Date()
      });
      
      setIsCompleting(false);
      navigate('/career-match');
    }, 3000);
  };
  
  if (!user || !assessment) return null;
  
  const sections = [
    { id: 'personality', title: 'Personality Assessment', description: 'Understand your working style and preferences' },
    { id: 'skills', title: 'Skills Assessment', description: 'Identify your strengths and areas for growth' },
    { id: 'interests', title: 'Interest Inventory', description: 'Discover what types of work excite you most' },
    { id: 'values', title: 'Work Values', description: 'Determine what matters most to you in a career' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Career Assessment</h1>
        <p className="mt-2 text-gray-600">
          Complete the assessment to receive personalized career recommendations
        </p>
      </div>
      
      {assessment.isComplete ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="rounded-full p-3 bg-success-50 text-success-500">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-medium text-gray-900">Assessment Complete!</h2>
              <p className="text-gray-500 mt-1">
                You have successfully completed your career assessment.
              </p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">Your Personality Type</h3>
              <p className="text-gray-700 mt-1 text-lg">{assessment.personalityType}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">Learning Style</h3>
              <p className="text-gray-700 mt-1 text-lg">{assessment.learningStyle}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">Key Strengths</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {assessment.strengths.map((strength, index) => (
                  <span key={index} className="badge badge-primary">
                    {strength}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">Work Values</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {assessment.values.map((value, index) => (
                  <span key={index} className="badge badge-secondary">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate('/career-match')}
              className="btn btn-primary"
            >
              View Career Matches <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-medium text-gray-900">Assessment Progress</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Complete all sections to see your career matches
                </p>
              </div>
              <div className="bg-gray-100 rounded-full w-32 h-2.5">
                <div
                  className="bg-primary-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`p-4 rounded-lg text-left transition ${
                    currentSection === section.id
                      ? 'bg-primary-50 border-l-4 border-primary-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  } ${
                    assessment.completedSections[section.id as keyof typeof assessment.completedSections]
                      ? 'border-r-4 border-success-500'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{section.title}</h3>
                    {assessment.completedSections[section.id as keyof typeof assessment.completedSections] ? (
                      <CheckCircle2 className="h-5 w-5 text-success-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                </button>
              ))}
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              {currentSection === 'personality' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Personality Assessment</h3>
                  <p className="text-gray-600 mb-6">
                    This assessment helps identify your natural preferences and working style. 
                    Answer honestly to get the most accurate results.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">I prefer working:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="workingStyle" className="h-4 w-4 text-primary-600" />
                          <span className="ml-2">In a team environment with lots of collaboration</span>
                        </label>
                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="workingStyle" className="h-4 w-4 text-primary-600" />
                          <span className="ml-2">Independently with focused time for deep work</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">When solving problems, I typically:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="problemSolving" className="h-4 w-4 text-primary-600" />
                          <span className="ml-2">Follow a methodical approach with careful analysis</span>
                        </label>
                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="problemSolving" className="h-4 w-4 text-primary-600" />
                          <span className="ml-2">Trust my intuition and explore creative solutions</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">I am most motivated by:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="motivation" className="h-4 w-4 text-primary-600" />
                          <span className="ml-2">Achieving goals and getting recognition for my work</span>
                        </label>
                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="motivation" className="h-4 w-4 text-primary-600" />
                          <span className="ml-2">Making a positive impact and helping others</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentSection === 'skills' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Skills Assessment</h3>
                  <p className="text-gray-600 mb-6">
                    Rate your proficiency in the following skill areas to help identify your strengths 
                    and areas for development.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">Communication Skills</h4>
                        <span className="text-sm text-gray-500">Rate 1-5</span>
                      </div>
                      <div className="flex space-x-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <label key={num} className="flex flex-col items-center">
                            <input type="radio" name="communicationSkills" value={num} className="h-4 w-4 text-primary-600" />
                            <span className="mt-1 text-sm">{num}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">Problem Solving</h4>
                        <span className="text-sm text-gray-500">Rate 1-5</span>
                      </div>
                      <div className="flex space-x-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <label key={num} className="flex flex-col items-center">
                            <input type="radio" name="problemSolvingSkills" value={num} className="h-4 w-4 text-primary-600" />
                            <span className="mt-1 text-sm">{num}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">Technical Aptitude</h4>
                        <span className="text-sm text-gray-500">Rate 1-5</span>
                      </div>
                      <div className="flex space-x-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <label key={num} className="flex flex-col items-center">
                            <input type="radio" name="technicalSkills" value={num} className="h-4 w-4 text-primary-600" />
                            <span className="mt-1 text-sm">{num}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">Leadership</h4>
                        <span className="text-sm text-gray-500">Rate 1-5</span>
                      </div>
                      <div className="flex space-x-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <label key={num} className="flex flex-col items-center">
                            <input type="radio" name="leadershipSkills" value={num} className="h-4 w-4 text-primary-600" />
                            <span className="mt-1 text-sm">{num}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentSection === 'interests' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Interest Inventory</h3>
                  <p className="text-gray-600 mb-6">
                    Indicate your level of interest in the following activities to help identify 
                    career paths that align with your passions.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">I enjoy:</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <span>Working with data and analyzing information</span>
                          <select className="ml-2 rounded border p-1 text-sm">
                            <option value="">Select</option>
                            <option value="high">Very Interested</option>
                            <option value="medium">Somewhat Interested</option>
                            <option value="low">Not Interested</option>
                          </select>
                        </label>
                        
                        <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <span>Creating visual designs or artwork</span>
                          <select className="ml-2 rounded border p-1 text-sm">
                            <option value="">Select</option>
                            <option value="high">Very Interested</option>
                            <option value="medium">Somewhat Interested</option>
                            <option value="low">Not Interested</option>
                          </select>
                        </label>
                        
                        <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <span>Writing code or developing software</span>
                          <select className="ml-2 rounded border p-1 text-sm">
                            <option value="">Select</option>
                            <option value="high">Very Interested</option>
                            <option value="medium">Somewhat Interested</option>
                            <option value="low">Not Interested</option>
                          </select>
                        </label>
                        
                        <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <span>Teaching or helping others learn</span>
                          <select className="ml-2 rounded border p-1 text-sm">
                            <option value="">Select</option>
                            <option value="high">Very Interested</option>
                            <option value="medium">Somewhat Interested</option>
                            <option value="low">Not Interested</option>
                          </select>
                        </label>
                        
                        <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <span>Managing projects or leading teams</span>
                          <select className="ml-2 rounded border p-1 text-sm">
                            <option value="">Select</option>
                            <option value="high">Very Interested</option>
                            <option value="medium">Somewhat Interested</option>
                            <option value="low">Not Interested</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentSection === 'values' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Work Values</h3>
                  <p className="text-gray-600 mb-6">
                    Select the values that are most important to you in your career. 
                    These will help match you with environments where you'll thrive.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Which values are most important to you?</h4>
                      <p className="text-sm text-gray-500 mb-4">Select up to 5 values</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          'Work-Life Balance', 'High Income', 'Job Security',
                          'Recognition', 'Independence', 'Helping Others',
                          'Creativity', 'Challenge', 'Achievement',
                          'Innovation', 'Leadership', 'Working with Others'
                        ].map((value) => (
                          <label key={value} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input type="checkbox" name="values" className="h-4 w-4 text-primary-600" />
                            <span className="ml-2 text-sm">{value}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Preferred work environment:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="workEnvironment" className="h-4 w-4 text-primary-600" />
                          <span className="ml-2">Structured with clear expectations and procedures</span>
                        </label>
                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="workEnvironment" className="h-4 w-4 text-primary-600" />
                          <span className="ml-2">Flexible with room for creativity and innovation</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6 bg-gray-50 flex justify-between">
            <button
              onClick={() => navigate('/')}
              className="btn btn-outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </button>
            
            <button
              onClick={completeAssessment}
              disabled={isCompleting}
              className="btn btn-primary"
            >
              {isCompleting ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </>
              ) : (
                <>
                  Complete Assessment <Sparkles className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessment;