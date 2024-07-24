import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import Head from 'next/head';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps, router }: AppProps) {

  return (
        <div></div>
  );
}

export default MyApp;



//----------------------------- EXEMPLO ----------------------------------------------------------------
// return (
//     <AuthProvider>
//       <div className="min-h-screen bg-gray-100 dark:bg-dark-gray text-gray-900 dark:text-dark-text">
//         <Head>
//           <title>Prod Sync</title>
//           <link rel="icon" href="https://img.icons8.com/?size=100&id=HLdJb2yeBLBj&format=png&color=000000" />
//         </Head>
//         {!hideNavAndFooter && (
//           <div className="flex">
//             <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//             <div className="flex flex-col flex-grow">
//               <TopBar toggleSidebar={toggleSidebar} />
//               <div className="flex justify-end p-2">
//                 <ThemeSwitcher />
//               </div>
//               <main className="flex-grow pt-10 p-2">
//                 <Component {...pageProps} />
//               </main>
//               <Footer />
//             </div>
//           </div>
//         )}
//         {hideNavAndFooter && <Component {...pageProps} />}
//       </div>
//     </AuthProvider>
//   );
// }