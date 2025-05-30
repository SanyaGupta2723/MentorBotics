import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useUser } from '../context/UserContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {user && (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      )}
      
      <div className="flex flex-col flex-1 h-screen overflow-y-auto">
        <Navbar toggleSidebar={toggleSidebar} showMenu={!!user} />
        
        <main className="flex-1 pb-8">
          <div className="max-w-7xl mx-auto pl-40 pr-4 sm:pr-6 lg:pr-8 py-8">
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Layout;