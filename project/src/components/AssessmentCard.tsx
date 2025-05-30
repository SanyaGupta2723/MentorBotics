import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AssessmentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  completed?: boolean;
  percentage?: number;
  linkTo: string;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  title,
  description,
  icon,
  completed = false,
  percentage = 0,
  linkTo
}) => {
  return (
    <div className={`card hover:border-l-4 ${completed ? 'hover:border-success-500' : 'hover:border-primary-500'} transition-all`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className={`p-3 rounded-full ${completed ? 'bg-success-50 text-success-500' : 'bg-primary-50 text-primary-500'}`}>
            {icon}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="w-full max-w-xs bg-gray-100 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${completed ? 'bg-success-500' : 'bg-primary-500'}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-500">{percentage}%</span>
          </div>
          <div className="mt-4">
            <Link
              to={linkTo}
              className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
            >
              {completed ? 'View Results' : 'Continue'} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCard;