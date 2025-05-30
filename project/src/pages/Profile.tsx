import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Trash, PlusCircle, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { user, updateProfile } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    educationLevel: user?.educationLevel || '',
    major: user?.major || '',
    interests: [...(user?.interests || [])],
    newInterest: '',
    skills: [...(user?.skills || [])],
    newSkill: '',
  });

  if (!user) {
    navigate('/');
    return null;
  }

  const educationLevels = [
    'High School Student',
    'High School Graduate',
    'College Student',
    'College Graduate', 
    'Graduate Student',
    'Graduate Degree Holder',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddInterest = () => {
    if (formData.newInterest.trim() === '') return;
    
    setFormData({
      ...formData,
      interests: [...formData.interests, formData.newInterest.trim()],
      newInterest: '',
    });
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(i => i !== interest),
    });
  };

  const handleAddSkill = () => {
    if (formData.newSkill.trim() === '') return;
    
    setFormData({
      ...formData,
      skills: [...formData.skills, formData.newSkill.trim()],
      newSkill: '',
    });
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProfile({
      name: formData.name,
      email: formData.email,
      educationLevel: formData.educationLevel,
      major: formData.major || undefined,
      interests: formData.interests,
      skills: formData.skills,
      profileCompleted: true,
    });
    
    navigate('/');
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-2 text-gray-600">
          Update your information to get better career recommendations
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
            </div>
          </div>
          
          {/* Education */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Education Level
                </label>
                <select
                  id="educationLevel"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Select education level</option>
                  {educationLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                  Major / Field of Study
                </label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., Computer Science, Business, etc."
                />
              </div>
            </div>
          </div>
          
          {/* Interests */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Interests</h2>
            <div className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  id="newInterest"
                  name="newInterest"
                  value={formData.newInterest}
                  onChange={handleChange}
                  className="input rounded-r-none"
                  placeholder="Add an interest"
                />
                <button
                  type="button"
                  onClick={handleAddInterest}
                  className="px-4 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="ml-1 text-primary-600 hover:text-primary-800 focus:outline-none"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {formData.interests.length === 0 && (
                <p className="text-sm text-gray-500 italic">No interests added yet</p>
              )}
            </div>
          </div>
          
          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  id="newSkill"
                  name="newSkill"
                  value={formData.newSkill}
                  onChange={handleChange}
                  className="input rounded-r-none"
                  placeholder="Add a skill"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-secondary-50 text-secondary-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 text-secondary-600 hover:text-secondary-800 focus:outline-none"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {formData.skills.length === 0 && (
                <p className="text-sm text-gray-500 italic">No skills added yet</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-outline"
          >
            <Trash className="h-4 w-4 mr-2" />
            Cancel
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;