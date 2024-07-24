import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  TbPackageExport,
  TbBuildingSkyscraper,
  TbPackageOff,
  TbPlaylistAdd,
  TbPlus,
  TbPuzzleFilled,
  TbWaveSawTool,
  TbSettings,
  TbUserPlus,
  TbUserShield,
  TbFileAnalytics,
  TbChartHistogram,
  TbClockShield,
  TbTruckReturn,
  TbHistory,
  TbCheckupList,
  TbPencilExclamation,
  TbPasswordUser 
} from 'react-icons/tb';
import {
  HiOutlineDesktopComputer,
  HiOutlineTruck,
  HiOutlineClipboardList,
  HiChevronDown,
  HiChevronUp,
  HiMenu,
  HiX,
} from 'react-icons/hi';
import SearchBox from '../seachBox/seachBox';
import { useAuth } from '../../../context/authContext';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  url?: string;
  submenus?: MenuItem[];
}

const TreeMenu: React.FC<{ data: MenuItem[]; openModules: string[]; toggleModule: (title: string) => void; isOpen: boolean; searchQuery: string; setOpenModules: React.Dispatch<React.SetStateAction<string[]>> }> = ({
  data,
  openModules,
  toggleModule,
  isOpen,
  searchQuery,
  setOpenModules
}) => {
  const filteredData = data.filter((item) => {
    if (searchQuery === '') return true;
    if (item.title.toLowerCase().includes(searchQuery.toLowerCase())) return true;
    if (item.submenus) {
      const hasMatchingSubmenu = item.submenus.some((subItem) => subItem.title.toLowerCase().includes(searchQuery.toLowerCase()));
      if (hasMatchingSubmenu && !openModules.includes(item.title)) {
        setOpenModules((prev) => [...prev, item.title]);
      }
      return hasMatchingSubmenu;
    }
    return false;
  });

  return (
    <ul className="pl-4 border-b border-gray-300 pb-4">
      {filteredData.map((item, index) => (
        <li key={index} className="mb-2 relative">
          {item.url ? (
            <Link href={item.url} legacyBehavior>
              <a
                className={`flex items-center py-2 px-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-400 ${
                  openModules.includes(item.title) ? 'font-semibold text-gray-900' : 'text-gray-600 dark:text-dark-text'
                }`}
              >
                {item.icon}
                {isOpen && <span className="ml-2">{item.title}</span>}
              </a>
            </Link>
          ) : (
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
          )}
          {item.submenus && openModules.includes(item.title) && isOpen && (
            <TreeMenu data={item.submenus} openModules={openModules} toggleModule={toggleModule} isOpen={isOpen} searchQuery={searchQuery} setOpenModules={setOpenModules} />
          )}
          {!isOpen && item.submenus && openModules.includes(item.title) && (
            <div className="absolute left-full top-0 mt-2 bg-white text-black rounded-lg shadow-lg z-50">
              <ul className="p-2">
                {item.submenus.map((subItem, subIndex) => (
                  <li key={subIndex} className="hover:bg-gray-200 rounded-md">
                    <Link href={subItem.url || '#'}>
                      <a className="block px-4 py-2 text-sm text-gray-700">{subItem.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void; }> = ({ isOpen, toggleSidebar }) => {
  const [openModules, setOpenModules] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

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
      title: 'Produção',
      icon: <TbBuildingSkyscraper className="text-xl" />,
      submenus: [
        { title: 'Apontar Produção Haver 1', icon: <TbPackageExport className="text-xl" />, url: '/production/apt-production' },
        { title: 'Apontar Produção Fábrica', icon: <TbPackageExport className="text-xl" />, url: '/production/apt-production-operator' },
        { title: 'Acompanhamento Produção', icon: <HiOutlineClipboardList className="text-xl" />, url: '/production/list-production' },
        {
          title: 'Cadastros',
          icon: <TbPlaylistAdd className="text-xl" />,
          submenus: [
            { title: 'Meta cor/peso', icon: <TbPackageExport className="text-xl" />, url: '/products/list' },
          ],
        },
      ],
    },
    {
      title: 'Expedição',
      icon: <HiOutlineTruck className="text-xl" />,
      submenus: [
        {
          title: 'Devoluções',
          icon: <TbPencilExclamation className="text-xl" />,
          submenus: [
            { title: 'Lançamento de Devolução', icon: <TbTruckReturn  className="text-xl" />, url: '/expedition/devolution' },
            { title: 'Confirmação de Devolução', icon: <TbHistory className="text-xl" />, url: '/expedition/review' },
            { title: 'Entradas de Notas Fiscais', icon: <TbCheckupList className="text-xl" />, url: '/expedition/pendency' },
            { title: 'Tranferência de Avarias', icon: <TbCheckupList className="text-xl" />, url: '/expedition/discard' },
            { title: 'Histórico de Entradas', icon: <TbHistory className="text-xl" />, url: '/expedition/listAll' },
          ],
        },
        {
          title: 'Carregamentos',
          icon: <TbPackageOff className="text-xl" />,
          submenus: [
            {
              title: 'Erro Entrega',
              icon: <TbPlaylistAdd className="text-xl" />,
              submenus: [
                { title: 'Registrar Erro de Entrega', icon: <TbTruckReturn  className="text-xl " />, url: '/expedition/delivery/createDelivery' },
                { title: 'Listagem de Erros', icon: <TbTruckReturn  className="text-xl " />, url: '/expedition/delivery/listAllDelivery' },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Estoque',
      icon: <TbPackageExport className="text-xl" />,
      submenus: [
        { title: 'Solicitação de Saída', icon: <TbWaveSawTool className="text-xl" />, url: '/stockSale/newSolicitation' },
        { title: 'Controle de Saídas', icon: <TbWaveSawTool className="text-xl" />, url: '/stockSale/separationList' },
        { title: 'Pendências Faturamento', icon: <TbWaveSawTool className="text-xl" />, url: '/stockSale/invoicesPending' },
        { title: 'Minhas Solicitações', icon: <TbWaveSawTool className="text-xl" />, url: '/stockSale/mySolicitations' },
      ],
    },
    {
      title: 'TI',
      icon: <HiOutlineDesktopComputer className="text-xl text-red-500" />,
      submenus: [
        { title: 'Items x Caracterísitcas', icon: <HiOutlineClipboardList className="text-xl" />, url: '/Ti/itemFeature' },
        {
          title: 'Manutenção',
          icon: <TbWaveSawTool className="text-xl" />,
        },
        {
          title: 'Estoque',
          icon: <TbPackageExport className="text-xl" />,
        },
        {
          title: 'Cadastros',
          icon: <TbPlaylistAdd className="text-xl" />,
          submenus: [
            { title: 'Tipo de Item', icon: <TbPlus className="text-xl" />, url: '/Ti/register/itemType' },
            { title: 'Característica', icon: <TbPlus className="text-xl" />, url: '/Ti/register/PreITemFeature' },
            { title: 'Setor', icon: <TbPlus className="text-xl" />, url: '/Ti/register/sector' },
            { title: 'Usuário', icon: <TbPlus className="text-xl" />, url: '/Ti/register/UserTi' },
            { title: 'Item', icon: <TbPlus className="text-xl" />, url: '/Ti/register/item' },
            { title: 'Característica x Item', icon: <TbPlus className="text-xl" />, url: '/Ti/list/itemFeature' },
          ],
        },
      ],
    },
    {
      title: 'Relatórios',
      icon: <TbFileAnalytics className="text-xl" />,
      submenus: [
        { title: 'Análise de cor', icon: <TbChartHistogram className="text-xl" />, url: '/production/dashboard/ProductionAnalysis' },
      ],
    },
    {
      title: 'Configurações',
      icon: <TbSettings className="text-xl" />,
      submenus: [
        { title: 'Cadastro de Usuários', icon: <TbUserPlus className="text-xl" />, url: '/User/RegisterUser' },
        { title: 'Permissões de Usuários', icon: <TbUserShield className="text-xl" />, url: '/User/UserRoles' },
        {
          title: 'Logs',
          icon: <TbSettings className="text-xl text-red-500" />,
          submenus: [
            { title: 'Produção', icon: <TbClockShield className="text-xl" />, url: '/' },
            { title: 'Expedição', icon: <TbClockShield className="text-xl" />, url: '/' },
          ],
        },
      ],
    },
  ];

  return (
    <div
      ref={sidebarRef}
      className={` fixed py-4 px-2 h-screen w-auto  flex flex-col z-40 transition-all duration-400 ${
        isOpen ? 'bg-white w-auto rounded-r-3xl shadow-lg dark:bg-dark-gray-2' : 'w-16 rounded '
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
              <TreeMenu data={menuData} openModules={openModules} toggleModule={toggleModule} isOpen={isOpen} searchQuery={searchQuery} setOpenModules={setOpenModules} />
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
              <p className="mb-1">{user?.full_name}</p>
              <p className="mb-2">{user?.email}</p>
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
