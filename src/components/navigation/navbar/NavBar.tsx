import React, { useState } from 'react';
import Link from 'next/link';

const NavBar: React.FC = () => {
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [isProductionOpen, setIsProductionOpen] = useState(false);
  const [isExpeditionOpen, setIsExpeditionOpen] = useState(false);

  return (
    <nav className="bg-white text-black p-4">
      <div className="container mx-0.5 flex justify-between items-center">
        <div className="flex space-x-4 relative">
          {/* Cadastros */}
          <div className="group cursor-pointer">
            <h1 className="hover:text-gray-300 font-bold group-hover:text-gray-300">Cadastros</h1>
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link href="/machines/create">
                <h1 className="block px-4 py-2 hover:bg-gray-100">Máquina</h1>
              </Link>
              <Link href="/products/create">
                <h1 className="block px-4 py-2 hover:bg-gray-100">Produto</h1>
              </Link>
              <Link href="/Link/MachineProduct">
                <h1 className="block px-4 py-2 hover:bg-gray-100">Ligação</h1>
              </Link>
            </div>
          </div>
          
          {/* Módulos */}
          <div 
            className="relative group cursor-pointer" 
            onMouseOver={() => setIsModulesOpen(true)} 
            onMouseOut={() => setIsModulesOpen(false)}
          >
            <h1 className="hover:text-gray-300 font-bold">Módulos</h1>
            <div 
              className={`absolute left-0 mt-2 w-40 bg-white shadow-lg rounded border border-gray-200 opacity-0 ${isModulesOpen ? 'opacity-100' : ''} transition-opacity duration-300`}
              onMouseOut={() => setIsModulesOpen(false)} 
            >
              {/* Produção */}
              <div 
                className="group"
                onMouseOver={() => setIsProductionOpen(true)}
                onMouseOut={() => setIsProductionOpen(false)}
              >
                <h1 className="block px-4 py-2 hover:bg-gray-100">Produção</h1>
                <div 
                  className={`absolute left-40 mt-0 w-40 bg-white shadow-lg rounded border border-gray-200 opacity-0 ${isProductionOpen ? 'opacity-100' : ''} transition-opacity duration-300`}
                  onMouseOut={() => setIsProductionOpen(false)} 
                >
                  <Link href="/production/apt-production">
                    <h1 className="block px-4 py-2 hover:bg-gray-100">Apontar Produção/Cor</h1>
                  </Link>
                  <Link href="/production/list-production">
                    <h1 className="block px-4 py-2 hover:bg-gray-100">Listar Produção/Cor</h1>
                  </Link>
                </div>
              </div>
              
              {/* Expedição */}
              <div 
                className="group" 
                onMouseOver={() => setIsExpeditionOpen(true)}
                onMouseOut={() => setIsExpeditionOpen(false)}
              >
                <h1 className="block px-4 py-2 hover:bg-gray-100">Expedição</h1>
                <div 
                  className={`absolute left-40 mt-0 w-40 bg-white shadow-lg rounded border border-gray-200 opacity-0 ${isExpeditionOpen ? 'opacity-100' : ''} transition-opacity duration-300`}
                  onMouseOut={() => setIsExpeditionOpen(false)} 
                >
                  <Link href="/expedition/apt-expedition">
                    <h1 className="block px-4 py-2 hover:bg-gray-100">Expedição</h1>
                  </Link> 
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Prod-Sync */}
        <div>
          <Link href="/">
            <h1 className="text-xl font-bold cursor-pointer">Prod-Sync</h1>
          </Link>
        </div>
        
        {/* Sair */}
        <div>
          <Link href="/contact">
            <button className="bg-cyan-800 hover:bg-cyan-900 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline cursor-pointer">Sair</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
