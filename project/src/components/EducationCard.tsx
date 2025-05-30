import React from 'react';
import { GraduationCap, Award, Calendar, DollarSign, ExternalLink } from 'lucide-react';

interface EducationCardProps {
  name: string;
  provider: string;
  type: 'degree' | 'certification' | 'course';
  duration: string;
  cost: string;
  description: string;
  link: string;
}

const EducationCard: React.FC<EducationCardProps> = ({
  name,
  provider,
  type,
  duration,
  cost,
  description,
  link
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'degree':
        return <GraduationCap className="h-6 w-6" />;
      case 'certification':
        return <Award className="h-6 w-6" />;
      case 'course':
        return <Calendar className="h-6 w-6" />;
      default:
        return <GraduationCap className="h-6 w-6" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'degree':
        return 'bg-primary-50 text-primary-600';
      case 'certification':
        return 'bg-accent-50 text-accent-600';
      case 'course':
        return 'bg-secondary-50 text-secondary-600';
      default:
        return 'bg-primary-50 text-primary-600';
    }
  };

  return (
    <div className="card hover:border-l-4 hover:border-primary-500 transition-all">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className={`p-3 rounded-full ${getTypeColor()}`}>
            {getTypeIcon()}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{name}</h3>
              <p className="mt-1 text-sm text-gray-600">{provider}</p>
            </div>
            <span className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize bg-gray-100 text-gray-800">
              {type}
            </span>
          </div>
          
          <p className="mt-3 text-sm text-gray-500">{description}</p>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <p className="text-sm text-gray-600">{duration}</p>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
              <p className="text-sm text-gray-600">{cost}</p>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline flex items-center text-sm"
            >
              Learn More <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;