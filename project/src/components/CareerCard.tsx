import React from 'react';
import { Briefcase, ArrowUpRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CareerCardProps {
  title: string;
  description: string;
  matchPercentage: number;
  salary: string;
  outlook: string;
  skills: string[];
}

const CareerCard: React.FC<CareerCardProps> = ({
  title,
  description,
  matchPercentage,
  salary,
  outlook,
  skills
}) => {
  const getTrendIcon = () => {
    if (outlook.toLowerCase().includes('strong')) {
      return <TrendingUp className="w-4 h-4 text-success-500" />;
    } else if (outlook.toLowerCase().includes('declining')) {
      return <TrendingDown className="w-4 h-4 text-error-500" />;
    }
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="card hover:border-l-4 hover:border-primary-500 transition-all">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="p-3 rounded-full bg-primary-50 text-primary-600">
            <Briefcase className="h-6 w-6" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {matchPercentage}% Match
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase">Salary Range</p>
              <p className="text-sm font-medium text-gray-900">{salary}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Growth Outlook</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                {getTrendIcon()}
                <span className="ml-1">{outlook}</span>
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-xs text-gray-500 uppercase mb-2">Top Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="badge badge-primary">
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="badge bg-gray-100 text-gray-800">
                  +{skills.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-800">
              View Details <ArrowUpRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;