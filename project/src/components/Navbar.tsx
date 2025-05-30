import { useNavigate } from 'react-router-dom';
import { Menu, User, LogOut, Compass } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface NavbarProps {
  toggleSidebar: () => void;
  showMenu: boolean;
}

const Navbar = ({ toggleSidebar, showMenu }: NavbarProps) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div id="test" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {showMenu && (
              <button
                onClick={toggleSidebar}
                className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden p-2 rounded-md"
                aria-label="Open sidebar menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}

            <div className="flex-shrink-0 flex items-center ml-2 md:ml-0">
              <Compass className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-primary-600 select-none">
               MentorBotics
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/profile')}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  aria-label="View profile"
                >
                  <User className="h-6 w-6" />
                </button>

                <span className="hidden md:block text-sm font-medium text-gray-700 select-none">
                  {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  aria-label="Logout"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
                aria-label="Get Started"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
