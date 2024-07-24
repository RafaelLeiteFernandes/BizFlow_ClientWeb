import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import Sidebar from './navigation/sidebar/sidebar';
import TopBar from './navigation/topBar';
import Footer from './navigation/footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div>
      <TopBar toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-grow transition-all duration-400 ${isOpen ? 'ml-64' : 'ml-16'}`}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
