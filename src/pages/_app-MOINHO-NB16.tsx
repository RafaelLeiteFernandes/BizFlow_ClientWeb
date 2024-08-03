// src/pages/_app.tsx

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import Sidebar from '../components/navigation/sidebar/sidebar';
import TopBar from '../components/navigation/topBar';
import Head from 'next/head';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import withAuth from '../components/withAuth';

function MyApp({ Component, pageProps, router }: AppProps) {
  const hideNavAndFooter = router.pathname === '/login';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const AuthComponent = withAuth(Component); // Protege todas as rotas

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-gray text-gray-900 dark:text-dark-text">
      <Head>
        <title>Prod Sync</title>
        <link rel="icon" href="https://img.icons8.com/?size=100&id=HLdJb2yeBLBj&format=png&color=000000" />
      </Head>
      {!hideNavAndFooter && (
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex flex-col flex-grow">
            <TopBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="flex-grow pt-10 p-2 md:pt-10 md:p-4">
              <AuthComponent {...pageProps} />
            </main>
          </div>
        </div>
      )}
      {hideNavAndFooter && <Component {...pageProps} />}
    </div>
  );
}

export default MyApp;
