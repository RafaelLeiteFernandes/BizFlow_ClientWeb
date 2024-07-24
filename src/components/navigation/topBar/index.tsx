import React, { useState } from 'react';
import { HiOutlineCog, HiMenu } from 'react-icons/hi';
import { useAuth } from '../../../context/authContext';
import ChangePasswordForm from '../../users/register/ChangePasswordForm';
import Link from 'next/link';
import ThemeSwitcher from '../theme';

const TopBar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const handleOpenChangePassword = () => {
    setShowChangePasswordModal(true);
    setDropdownOpen(false);
  };

  const handleCloseChangePassword = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <div className="w-full bg-white dark:bg-dark-gray-2 shadow-md fixed top-0 left-0 z-50 flex justify-between items-center p-4">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="focus:outline-none mr-4">
          <HiMenu className="text-2xl text-gray-700 dark:text-gray-300" />
        </button>
        <Link className="text-xl font-bold pl-4 text-gray-700 dark:text-gray-300" href="/">Início</Link>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 dark:text-gray-300">Olá, {user?.full_name}</span>
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
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                  onClick={handleOpenChangePassword}
                >
                  Alterar Senha
                </li>
                <li 
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                  onClick={handleLogout}
                >
                  Sair do sistema
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                  <ThemeSwitcher />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-auto md:w-1/3 relative">
            <button 
              onClick={handleCloseChangePassword} 
              className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              X
            </button>
            <ChangePasswordForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
