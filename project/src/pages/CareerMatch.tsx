import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import CareerCard from '../components/CareerCard';
import { useUser } from '../context/UserContext';
import { mockCareers } from '../data/mockData';
import { CareerPath } from '../types';

const CareerMatch = () => {
  const { user, assessment } = useUser();
  const navigate = useNavigate();
  
  const [careers, setCareers] = useState<CareerPath[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<CareerPath[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    matchThreshold: 0,
    industries: [] as string[],
  });
  
  // Get all unique industries from careers
  const allIndustries = Array.from(
    new Set(mockCareers.flatMap(career => career.industries))
  );
  
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    if (!assessment?.isComplete) {
      navigate('/assessment');
      return;
    }
    
    // Initialize with mock data
    setCareers(mockCareers);
    setFilteredCareers(mockCareers);
  }, [user, assessment, navigate]);
  
  useEffect(() => {
    // Apply filters and search
    let results = careers;
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        career => 
          career.title.toLowerCase().includes(term) || 
          career.description.toLowerCase().includes(term) ||
          career.requiredSkills.some(skill => skill.toLowerCase().includes(term))
      );
    }
    
    // Apply match threshold filter
    if (filters.matchThreshold > 0) {
      results = results.filter(career => career.matchPercentage >= filters.matchThreshold);
    }
    
    // Apply industry filter
    if (filters.industries.length > 0) {
      results = results.filter(
        career => career.industries.some(industry => filters.industries.includes(industry))
      );
    }
    
    // Apply sorting
    results = [...results].sort((a, b) => {
      if (sortOrder === 'desc') {
        return b.matchPercentage - a.matchPercentage;
      } else {
        return a.matchPercentage - b.matchPercentage;
      }
    });
    
    setFilteredCareers(results);
  }, [careers, searchTerm, filters, sortOrder]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };
  
  const toggleIndustryFilter = (industry: string) => {
    setFilters(prev => {
      if (prev.industries.includes(industry)) {
        return {
          ...prev,
          industries: prev.industries.filter(i => i !== industry)
        };
      } else {
        return {
          ...prev,
          industries: [...prev.industries, industry]
        };
      }
    });
  };
  
  const clearFilters = () => {
    setFilters({
      matchThreshold: 0,
      industries: [],
    });
    setSearchTerm('');
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Career Matches</h1>
        <p className="mt-2 text-gray-600">
          Based on your assessment, these careers might be a good fit for you
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
                placeholder="Search careers, skills, or keywords..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 input"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={toggleSortOrder}
                className="btn btn-outline flex items-center"
              >
                Match {sortOrder === 'desc' ? 'Highest' : 'Lowest'} 
                {sortOrder === 'desc' ? <ChevronDown className="ml-1 h-4 w-4" /> : <ChevronUp className="ml-1 h-4 w-4" />}
              </button>
              
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`btn ${filterOpen ? 'btn-primary' : 'btn-outline'} flex items-center`}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters {filters.industries.length > 0 || filters.matchThreshold > 0 ? `(${filters.industries.length + (filters.matchThreshold > 0 ? 1 : 0)})` : ''}
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
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Match Percentage</h4>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={filters.matchThreshold}
                      onChange={(e) => setFilters(prev => ({ ...prev, matchThreshold: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-3 w-12 text-sm text-gray-700">
                      {filters.matchThreshold > 0 ? `${filters.matchThreshold}%+` : 'Any'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Industries</h4>
                  <div className="max-h-40 overflow-y-auto">
                    <div className="space-y-2">
                      {allIndustries.map((industry) => (
                        <label key={industry} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.industries.includes(industry)}
                            onChange={() => toggleIndustryFilter(industry)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{industry}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {filteredCareers.length} career paths matched
            </span>
          </div>
          
          {filteredCareers.length > 0 ? (
            <div className="space-y-6">
              {filteredCareers.map((career) => (
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
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Search className="h-12 w-12" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No matches found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filters to find more career matches.
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

export default CareerMatch;