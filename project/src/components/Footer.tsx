import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-gray-500 text-sm">
              © {new Date().getFullYear()} MentorBotics. All rights reserved.
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-sm text-gray-500">
            <a href="#" className="hover:text-primary-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-600 transition-colors">
              Contact Us
            </a>
            <span className="flex items-center">
              Made with <Heart className="h-4 w-4 text-error-500 mx-1" /> for students
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;