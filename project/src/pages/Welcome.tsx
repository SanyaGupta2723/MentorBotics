import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, CheckCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Welcome = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    educationLevel: '',
    interests: [] as string[],
  });
  const { setUser } = useUser();
  const navigate = useNavigate();

  const educationLevels = [
    'High School Student',
    'High School Graduate',
    'College Student',
    'College Graduate',
    'Graduate Student',
    'Graduate Degree Holder',
    'Other'
  ];

  const interestOptions = [
    'Technology', 'Science', 'Healthcare', 'Business',
    'Arts', 'Education', 'Engineering', 'Social Sciences'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => {
      if (prev.interests.includes(interest)) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Create user profile
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        educationLevel: formData.educationLevel,
        interests: formData.interests,
        skills: [],
        profileCompleted: false,
        createdAt: new Date(),
      };
      
      setUser(newUser);
      navigate('/');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Compass className="h-16 w-16 text-primary-600" />
          </div>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Welcome to MentorBotics
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Your AI career counselor to help navigate your professional journey
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step > s ? <CheckCircle className="h-6 w-6" /> : s}
                    </div>
                    <p className={`mt-2 text-sm ${step >= s ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                      {s === 1 ? 'Basic Info' : s === 2 ? 'Education' : 'Interests'}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className={`h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'} rounded`}></div>
                <div className={`h-1 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-200'} rounded`}></div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6 animate-slide-up">
                  <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                  <p className="text-gray-500">Let's start with some basic information about you.</p>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input mt-1"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input mt-1"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6 animate-slide-up">
                  <h2 className="text-2xl font-bold text-gray-900">Education Background</h2>
                  <p className="text-gray-500">Tell us about your educational background.</p>
                  
                  <div>
                    <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700">Current Education Level</label>
                    <select
                      id="educationLevel"
                      name="educationLevel"
                      value={formData.educationLevel}
                      onChange={handleInputChange}
                      required
                      className="input mt-1"
                    >
                      <option value="">Select your education level</option>
                      {educationLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-6 animate-slide-up">
                  <h2 className="text-2xl font-bold text-gray-900">Your Interests</h2>
                  <p className="text-gray-500">Select the fields you're interested in exploring.</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {interestOptions.map((interest) => (
                      <div 
                        key={interest}
                        onClick={() => handleInterestChange(interest)}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                          formData.interests.includes(interest)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center ${
                          formData.interests.includes(interest)
                            ? 'border-primary-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.interests.includes(interest) && (
                            <div className="h-3 w-3 rounded-full bg-primary-500"></div>
                          )}
                        </div>
                        <span className="ml-2 text-sm font-medium">{interest}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    (step === 1 && (!formData.name || !formData.email)) ||
                    (step === 2 && !formData.educationLevel) ||
                    (step === 3 && formData.interests.length === 0)
                  }
                >
                  {step < 3 ? (
                    <>Next <ArrowRight className="ml-1 h-4 w-4" /></>
                  ) : (
                    'Get Started'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;