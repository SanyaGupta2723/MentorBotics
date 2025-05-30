import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, Video, PenTool as Tool, Book, X } from 'lucide-react';
import ResourceCard from '../components/ResourceCard';
import { mockResources } from '../data/mockData';
import { Resource } from '../types';

const Resources = () => {
  const [allResources, setAllResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    types: [] as string[],
    tags: [] as string[],
  });
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(mockResources.flatMap(resource => resource.tags))
  );
  
  useEffect(() => {
    // Initialize with mock data
    setAllResources(mockResources);
    setFilteredResources(mockResources);
  }, []);
  
  useEffect(() => {
    // Apply filters and search
    let results = allResources;
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        resource => 
          resource.title.toLowerCase().includes(term) || 
          resource.description.toLowerCase().includes(term) ||
          resource.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply type filter
    if (filters.types.length > 0) {
      results = results.filter(resource => filters.types.includes(resource.type));
    }
    
    // Apply tag filter
    if (filters.tags.length > 0) {
      results = results.filter(
        resource => resource.tags.some(tag => filters.tags.includes(tag))
      );
    }
    
    setFilteredResources(results);
  }, [allResources, searchTerm, filters]);
  
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
  
  const toggleTagFilter = (tag: string) => {
    setFilters(prev => {
      if (prev.tags.includes(tag)) {
        return {
          ...prev,
          tags: prev.tags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prev,
          tags: [...prev.tags, tag]
        };
      }
    });
  };
  
  const clearFilters = () => {
    setFilters({
      types: [],
      tags: [],
    });
    setSearchTerm('');
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-4 w-4 mr-1 text-primary-500" />;
      case 'video':
        return <Video className="h-4 w-4 mr-1 text-error-500" />;
      case 'tool':
        return <Tool className="h-4 w-4 mr-1 text-secondary-500" />;
      case 'guide':
        return <Book className="h-4 w-4 mr-1 text-accent-500" />;
      default:
        return <FileText className="h-4 w-4 mr-1 text-primary-500" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Career Resources</h1>
        <p className="mt-2 text-gray-600">
          Access guides, tutorials, and tools to help you succeed in your career journey
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
                placeholder="Search resources, topics, or keywords..."
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
                Filters {filters.types.length > 0 || filters.tags.length > 0 ? `(${filters.types.length + filters.tags.length})` : ''}
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
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Resource Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes('article')}
                        onChange={() => toggleTypeFilter('article')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-primary-500" />
                        Articles
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes('video')}
                        onChange={() => toggleTypeFilter('video')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        <Video className="h-4 w-4 mr-1 text-error-500" />
                        Videos
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes('tool')}
                        onChange={() => toggleTypeFilter('tool')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        <Tool className="h-4 w-4 mr-1 text-secondary-500" />
                        Tools
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes('guide')}
                        onChange={() => toggleTypeFilter('guide')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        <Book className="h-4 w-4 mr-1 text-accent-500" />
                        Guides
                      </span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Topics</h4>
                  <div className="max-h-40 overflow-y-auto">
                    <div className="space-y-2">
                      {allTags.map((tag) => (
                        <label key={tag} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.tags.includes(tag)}
                            onChange={() => toggleTagFilter(tag)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{tag}</span>
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
              {filteredResources.length} resources found
            </span>
          </div>
          
          {filteredResources.length > 0 ? (
            <div className="space-y-6">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  title={resource.title}
                  type={resource.type}
                  description={resource.description}
                  url={resource.url}
                  tags={resource.tags}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Search className="h-12 w-12" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No resources found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filters to find more resources.
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

export default Resources;