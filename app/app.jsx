'use client';
import React, { useContext, useEffect } from 'react';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { ToastProvider } from './components/toast';
import { useLoginStatus } from './store/hooks';
import Login from './login/page';
import Header from './components/header';
import SideBar from './components/navbar';
import Footer from './components/footer';
import './globals.css';
import { StoreContext } from './store/context';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export const OccUtilsApp = ({ children }) => {

  const router = useRouter();

  const { action } = useContext(StoreContext);
  // Rendering children's conditionally
  const isLoggedIn = useLoginStatus();
  const pagePath = usePathname();
  const isHomePage = pagePath === '/';

  // Calling refresh API to get the new access token
  useEffect(() => {
    // Updating the state based on need.
    const stateHandler = (payload, apiResponse) => {
      const result = apiResponse;
      if (result.access_token) {
        return {
          key: 'occRepository',
          value: {
            accessToken: result.access_token
          }
        }
      } else {
        router.push('/login');
      }

    }

    if (isLoggedIn) {
      const refresh = setInterval(() => {
        action('apiCall', {
          method: 'post',
          url: 'refresh',
          data: {},
          stateAction: 'updateKeyValue',
          stateHandler
        })
      }, (2 * 60 * 1000));
      return () => clearInterval(refresh);
    }
  }, [action, isLoggedIn, router]);

  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='apex-favicon.svg' sizes='32x32' />
        <link rel='icon' href='apex-favicon.svg' sizes='192x192' />
        <link rel='apple-touch-icon' href='apex-favicon.svg' />
        <meta name='apexIT-logo' content='apex-favicon.svg' />
      </head>
      <body className={inter.className}
        suppressHydrationWarning={true}
      >
        <main className='grid grid-flow-row min-h-full custom-grid-flow'>
          <Header />
          <section className='grid grid-flow-col bg-white text-black dark:bg-slate-900 dark:text-white'>
            <SideBar />
            <section className='px-6 pt-2 relative pb-6 custom-col-span'>
              <ToastProvider>{(isHomePage || isLoggedIn) ? children : <Login />}</ToastProvider>
            </section>
          </section>
          <Footer />
        </main>
      </body>
    </html>
  )
}


export default OccUtilsApp;
