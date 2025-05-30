import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, GraduationCap, Award, BookOpen, X } from 'lucide-react';
import EducationCard from '../components/EducationCard';
import { useUser } from '../context/UserContext';
import { mockEducation, mockCareers } from '../data/mockData';
import { Education } from '../types';

const EducationPath = () => {
  const { user, assessment } = useUser();
  const navigate = useNavigate();
  
  const [allEducation, setAllEducation] = useState<Education[]>([]);
  const [filteredEducation, setFilteredEducation] = useState<Education[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    types: [] as string[],
    careerPath: '',
  });
  
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    // Initialize with mock data
    setAllEducation(mockEducation);
    setFilteredEducation(mockEducation);
  }, [user, navigate]);
  
  useEffect(() => {
    // Apply filters and search
    let results = allEducation;
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        edu => 
          edu.name.toLowerCase().includes(term) || 
          edu.provider.toLowerCase().includes(term) ||
          edu.description.toLowerCase().includes(term)
      );
    }
    
    // Apply type filter
    if (filters.types.length > 0) {
      results = results.filter(edu => filters.types.includes(edu.type));
    }
    
    // Apply career path filter
    if (filters.careerPath) {
      const career = mockCareers.find(c => c.id === filters.careerPath);
      if (career) {
        results = results.filter(edu => 
          career.recommendedEducation.some(recEdu => 
            edu.name.toLowerCase().includes(recEdu.toLowerCase())
          )
        );
      }
    }
    
    setFilteredEducation(results);
  }, [allEducation, searchTerm, filters]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleTypeFilter = (type: string) => {
    setFilters(prev => {
      if (prev.types.includes(type)) {
        return {
          ...prev,
          types: prev.types.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          types: [...prev.types, type]
        };
      }
    });
  };
  
  const clearFilters = () => {
    setFilters({
      types: [],
      careerPath: '',
    });
    setSearchTerm('');
  };
  
  // Get relevant careers based on assessment
  const relevantCareers = mockCareers.slice(0, 3);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Education Pathways</h1>
        <p className="mt-2 text-gray-600">
          Explore educational opportunities to prepare for your ideal career
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search programs, courses, or keywords..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 input"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`btn ${filterOpen ? 'btn-primary' : 'btn-outline'} flex items-center`}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters {filters.types.length > 0 || filters.careerPath ? `(${filters.types.length + (filters.careerPath ? 1 : 0)})` : ''}
              </button>
            </div>
          </div>
          
          {filterOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
                >
                  <X className="h-4 w-4 mr-1" /> Clear all
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes('degree')}
                        onChange={() => toggleTypeFilter('degree')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        <GraduationCap className="h-4 w-4 mr-1 text-primary-500" />
                        Degrees
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes('certification')}
                        onChange={() => toggleTypeFilter('certification')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        <Award className="h-4 w-4 mr-1 text-accent-500" />
                        Certifications
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes('course')}
                        onChange={() => toggleTypeFilter('course')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-secondary-500" />
                        Courses
                      </span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">For Career Path</h4>
                  <select
                    value={filters.careerPath}
                    onChange={(e) => setFilters(prev => ({ ...prev, careerPath: e.target.value }))}
                    className="input text-sm"
                  >
                    <option value="">All Career Paths</option>
                    {relevantCareers.map(career => (
                      <option key={career.id} value={career.id}>
                        {career.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {filteredEducation.length} educational paths found
            </span>
          </div>
          
          {filteredEducation.length > 0 ? (
            <div className="space-y-6">
              {filteredEducation.map((education) => (
                <EducationCard
                  key={education.id}
                  name={education.name}
                  provider={education.provider}
                  type={education.type}
                  duration={education.duration}
                  cost={education.cost}
                  description={education.description}
                  link={education.link}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Search className="h-12 w-12" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No matches found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filters to find more educational options.
              </p>
              <div className="mt-6">
                <button
                  onClick={clearFilters}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationPath;