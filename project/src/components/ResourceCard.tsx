import React from 'react';
import { FileText, Video, PenTool as Tool, Book, ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  type: 'article' | 'video' | 'tool' | 'guide';
  description: string;
  url: string;
  tags: string[];
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  type,
  description,
  url,
  tags
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'article':
        return <FileText className="h-6 w-6" />;
      case 'video':
        return <Video className="h-6 w-6" />;
      case 'tool':
        return <Tool className="h-6 w-6" />;
      case 'guide':
        return <Book className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'article':
        return 'bg-primary-50 text-primary-600';
      case 'video':
        return 'bg-error-50 text-error-600';
      case 'tool':
        return 'bg-secondary-50 text-secondary-600';
      case 'guide':
        return 'bg-accent-50 text-accent-600';
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
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <span className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize bg-gray-100 text-gray-800">
              {type}
            </span>
          </div>
          
          <p className="mt-3 text-sm text-gray-500">{description}</p>
          
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="badge badge-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline flex items-center text-sm"
            >
              View Resource <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;