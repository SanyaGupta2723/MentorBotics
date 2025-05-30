import { NavLink } from 'react-router-dom';
import { 
  Home, 
  User, 
  ClipboardCheck, 
  Compass, 
  GraduationCap, 
  BarChart, 
  BookOpen, 
  MessageSquare, 
  X
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const closeSidebar = () => {
    setOpen(false);
  };

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { path: '/profile', name: 'My Profile', icon: <User className="h-5 w-5" /> },
    { path: '/assessment', name: 'Assessment', icon: <ClipboardCheck className="h-5 w-5" /> },
    { path: '/career-match', name: 'Career Matches', icon: <Compass className="h-5 w-5" /> },
    { path: '/education', name: 'Education Path', icon: <GraduationCap className="h-5 w-5" /> },
    { path: '/job-insights', name: 'Job Insights', icon: <BarChart className="h-5 w-5" /> },
    { path: '/resources', name: 'Resources', icon: <BookOpen className="h-5 w-5" /> },
    { path: '/ai-counselor', name: 'AI Counselor', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 transition-opacity md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar for mobile */}
      <div className={`fixed inset-y-0 left-0 flex flex-col z-30 w-64 bg-white shadow-lg transform transition duration-300 ease-in-out md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <Compass className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-primary-600">MentorBotics</span>
          </div>
          <button 
            onClick={closeSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto pt-5 pb-4">
          <div className="space-y-1 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                <div className="mr-3">{item.icon}</div>
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;