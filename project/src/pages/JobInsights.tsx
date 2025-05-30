import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowRight, TrendingUp, TrendingDown, Minus, BarChart } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { mockJobInsights, mockCareers } from '../data/mockData';

const JobInsights = () => {
  const { user, assessment } = useUser();
  const [activeTab, setActiveTab] = useState<'trends' | 'market'>('trends');
  
  const trendingJobs = mockJobInsights.filter(job => job.demandTrend === 'rising');
  
  // Use assessment data to get top matching careers
  const topCareers = assessment 
    ? mockCareers.slice(0, 3) 
    : [];
  
  const getTrendIcon = (trend: string) => {
    if (trend === 'rising') {
      return <TrendingUp className="w-5 h-5 text-success-500" />;
    } else if (trend === 'declining') {
      return <TrendingDown className="w-5 h-5 text-error-500" />;
    }
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Job Market Insights</h1>
        <p className="mt-2 text-gray-600">
          Explore job market trends and demand for different career paths
        </p>
      </div>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('trends')}
              className={`py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
                activeTab === 'trends'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Industry Trends
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'market'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Market Analysis
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'trends' && (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Trending Career Paths</h2>
              <p className="mt-1 text-gray-500">
                Career paths with significant growth potential in the coming years
              </p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingJobs.map((job, index) => (
                  <div key={index} className="card hover:border-l-4 hover:border-success-500 transition-all">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="p-3 rounded-full bg-success-50 text-success-600">
                          {getTrendIcon(job.demandTrend)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{job.industry}</p>
                        
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Salary Range</p>
                            <p className="text-sm font-medium text-gray-900">{job.salaryRange}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Trend</p>
                            <p className="text-sm font-medium text-success-600 flex items-center">
                              {getTrendIcon(job.demandTrend)}
                              <span className="ml-1 capitalize">{job.demandTrend}</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-xs text-gray-500 uppercase mb-1">Top Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {job.requiredSkills.slice(0, 2).map((skill, i) => (
                              <span key={i} className="badge badge-primary">
                                {skill}
                              </span>
                            ))}
                            {job.requiredSkills.length > 2 && (
                              <span className="badge bg-gray-100 text-gray-800">
                                +{job.requiredSkills.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Skills in High Demand</h2>
              <p className="mt-1 text-gray-500">
                Key skills that employers are increasingly looking for
              </p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Technology</h3>
                  <ul className="space-y-3">
                    {['Cloud Computing', 'Machine Learning', 'Data Analysis', 'Cybersecurity', 'DevOps'].map((skill, index) => (
                      <li key={index} className="flex items-center">
                        <ArrowUp className="h-4 w-4 text-success-500 mr-2" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="card bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Business</h3>
                  <ul className="space-y-3">
                    {['Digital Marketing', 'Project Management', 'Data-driven Decision Making', 'Remote Team Management', 'Business Analytics'].map((skill, index) => (
                      <li key={index} className="flex items-center">
                        <ArrowUp className="h-4 w-4 text-success-500 mr-2" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="card bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Soft Skills</h3>
                  <ul className="space-y-3">
                    {['Adaptability', 'Communication', 'Critical Thinking', 'Emotional Intelligence', 'Collaboration'].map((skill, index) => (
                      <li key={index} className="flex items-center">
                        <ArrowUp className="h-4 w-4 text-success-500 mr-2" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'market' && (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Industry Growth Forecast</h2>
              <p className="mt-1 text-gray-500">
                Projected growth rates for key industries over the next 5 years
              </p>
            </div>
            
            <div className="p-6">
              <div className="relative">
                <div className="overflow-hidden">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Technology</span>
                    <span className="text-sm font-medium text-success-600">+24%</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div className="h-4 bg-success-500 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
                
                <div className="mt-6 overflow-hidden">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Healthcare</span>
                    <span className="text-sm font-medium text-success-600">+18%</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div className="h-4 bg-success-500 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div className="mt-6 overflow-hidden">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Renewable Energy</span>
                    <span className="text-sm font-medium text-success-600">+32%</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div className="h-4 bg-success-500 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div className="mt-6 overflow-hidden">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">E-commerce</span>
                    <span className="text-sm font-medium text-success-600">+15%</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div className="h-4 bg-success-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div className="mt-6 overflow-hidden">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Finance</span>
                    <span className="text-sm font-medium text-success-600">+7%</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div className="h-4 bg-success-500 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
                
                <div className="mt-6 overflow-hidden">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Manufacturing</span>
                    <span className="text-sm font-medium text-warning-600">+2%</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div className="h-4 bg-warning-500 rounded-full" style={{ width: '52%' }}></div>
                  </div>
                </div>
                
                <div className="mt-6 overflow-hidden">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Retail (Traditional)</span>
                    <span className="text-sm font-medium text-error-600">-3%</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div className="h-4 bg-error-500 rounded-full" style={{ width: '37%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Your Career Matches: Market Analysis</h2>
              <p className="mt-1 text-gray-500">
                Job market outlook for your top matching career paths
              </p>
            </div>
            
            <div className="p-6">
              {topCareers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topCareers.map((career, index) => (
                    <div key={index} className="card bg-gradient-to-r from-primary-50 to-white">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{career.title}</h3>
                      <div className="flex items-center mb-4">
                        <div className="p-2 rounded-full bg-primary-100 text-primary-600 mr-2">
                          <BarChart className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-primary-700">
                          {career.matchPercentage}% Match
                        </span>
                      </div>
                      
                      <ul className="space-y-2">
                        <li className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Growth Outlook:</span>
                          <span className="font-medium text-gray-900">{career.growthOutlook}</span>
                        </li>
                        <li className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Salary Range:</span>
                          <span className="font-medium text-gray-900">{career.averageSalary}</span>
                        </li>
                        <li className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Competition Level:</span>
                          <span className="font-medium text-gray-900">Moderate</span>
                        </li>
                      </ul>
                      
                      <button className="mt-4 w-full flex items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-800">
                        Full Analysis <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p>Complete your career assessment to see personalized market analysis</p>
                  <button 
                    onClick={() => window.location.href = '/assessment'}
                    className="mt-4 btn btn-primary"
                  >
                    Take Assessment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobInsights;