// src/components/navigation/sidebar.tsx

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  TbBuildingSkyscraper,
  TbPackageExport,
  TbPlaylistAdd,
  TbFileAnalytics,
  TbChartHistogram,
  TbPuzzleFilled,
  TbClockEdit,
  TbClock,
  TbClock24,
  TbChecklist,
  TbPigMoney,
  TbReportMoney,
  TbCreditCardPay,
  TbAbacus,
} from 'react-icons/tb';
import {
  HiChevronDown,
  HiChevronUp,
  HiMenu,
  HiX,
} from 'react-icons/hi';
import SearchBox from '../seachBox/seachBox';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  url?: string;
  submenus?: MenuItem[];
}

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void; }> = ({ isOpen, toggleSidebar }) => {
  const [openModules, setOpenModules] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleModule = (title: string) => {
    if (openModules.includes(title)) {
      setOpenModules(openModules.filter((module) => module !== title));
    } else {
      setOpenModules([...openModules, title]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        toggleSidebar(); // Fechar a sidebar ao clicar fora
        setOpenModules([]);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  const menuData: MenuItem[] = [
    {
      title: 'Relógio Ponto',
      icon: <TbClock   className="text-xl" />,
      submenus: [
        { title: 'Registro de Ponto', icon: <TbClockEdit  className="text-xl" />, url: '/production/apt-production' },
        { title: 'Histórico', icon: <TbClock24  className="text-xl" />, url: '/production/apt-production' },
      ],
    },
    {
      title: 'Lançamentos',
      icon: <TbChecklist  className="text-xl" />,
      submenus: [
        { title: 'Despesas', icon: <TbReportMoney   className="text-xl" />, url: '/production/apt-production' },
        { title: 'Receita', icon: <TbPigMoney className="text-xl text-pink-400" />, url: '/production/apt-production' },
        { title: 'Compras', icon: <TbCreditCardPay  className="text-xl" />, url: '/production/apt-production' },
      ],
    },
    {
      title: 'Relatórios',
      icon: <TbFileAnalytics className="text-xl" />,
      submenus: [
        { title: 'Relação de Pontos', icon: <TbChartHistogram className="text-xl" />, url: '/production/dashboard/ProductionAnalysis' },
        { title: 'Relação de Despesas', icon: <TbChartHistogram className="text-xl" />, url: '/production/dashboard/ProductionAnalysis' },
        { title: 'Relação de Receitas', icon: <TbChartHistogram className="text-xl" />, url: '/production/dashboard/ProductionAnalysis' },
      ],
    },
    {
      title: 'Cadastros',
      icon: <TbPlaylistAdd className="text-xl" />,
      submenus: [
        { title: 'Alguma Coisa', icon: <TbPackageExport className="text-xl" />, url: '/products/list' },
      ],
    },
    {
      title: 'Contratos',
      icon: <TbAbacus  className="text-xl" />,
      submenus: [
        { title: 'Alguma Coisa', icon: <TbPackageExport className="text-xl" />, url: '/products/list' },
      ],
    },
  ];

  return (
    <div
      ref={sidebarRef}
      className={`fixed py-4 px-2 h-screen w-auto flex flex-col z-40 transition-all duration-400 ${
        isOpen ? 'bg-white w-full md:w-64 rounded-r-3xl shadow-lg dark:bg-dark-gray-2' : 'w-16 rounded '
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>
      </div>
      <div className="flex items-center p-4">
        <div className="flex items-center">
          <span className={`text-lg font-semibold transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <TbPuzzleFilled />
          </span>
        </div>
      </div>
      <div className="overflow-y-auto scrollbar-w-2 scrollbar-track-gray-200 scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full">
        {isOpen ? (
          <>
            <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="flex-grow p-4">
              {menuData.map((item, index) => (
                <div key={index} className="mb-2">
                  <div
                    className={`flex items-center py-2 px-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-400 ${
                      openModules.includes(item.title) ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-dark-text'
                    }`}
                    onClick={() => toggleModule(item.title)}
                  >
                    {item.icon}
                    {isOpen && <span className="ml-2">{item.title}</span>}
                    <button className="ml-auto focus:outline-none">
                      {openModules.includes(item.title) ? <HiChevronUp /> : <HiChevronDown />}
                    </button>
                  </div>
                  {item.submenus && openModules.includes(item.title) && isOpen && (
                    <ul className="pl-4">
                      {item.submenus.map((subItem, subIndex) => (
                        <li key={subIndex} className="mb-2">
                          <Link href={subItem.url || '#'} legacyBehavior>
                            <a
                              className="flex items-center py-2 px-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-400 text-gray-600 dark:text-dark-text"
                              onClick={toggleSidebar}
                            >
                              {subItem.icon}
                              <span className="ml-2">{subItem.title}</span>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex-grow p-4">
            {/* Menu icon only view */}
          </div>
        )}
        {isOpen && (
          <div className="mt-auto p-4">
            <div className="text-sm">
            </div>
            {/* <button onClick={logout} className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-red-600 hover:text-white focus:outline-none">
              Sair
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
