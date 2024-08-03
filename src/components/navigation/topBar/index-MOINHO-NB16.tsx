// src/components/navigation/topBar.tsx

import React, { useState } from 'react';
import { HiOutlineCog, HiMenu, HiX } from 'react-icons/hi'; // Import HiX para alternar ícone
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '../../../services/authService';

const TopBar = ({ isOpen, toggleSidebar }) => { // Adicione isOpen como prop
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="w-full bg-white dark:bg-dark-gray-2 shadow-md fixed top-0 left-0 z-50 flex justify-between items-center p-4">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="focus:outline-none mr-4">
          {isOpen ? <HiX className="text-2xl text-gray-700 dark:text-gray-300" /> : <HiMenu className="text-2xl text-gray-700 dark:text-gray-300" />}
        </button>
        <Link className="text-xl font-bold text-gray-700 dark:text-gray-300" href="/">Início</Link>
      </div>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <button 
            onClick={toggleDropdown} 
            className="flex items-center space-x-2 focus:outline-none"
          >
            <HiOutlineCog className="text-gray-700 dark:text-gray-300 text-2xl" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded shadow-md z-10">
              <ul>
                <li 
                  onClick={handleLogout} 
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
