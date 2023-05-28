import React from 'react';
import { StoreProvider } from './store';
import { Inter } from 'next/font/google';
import Header from './components/header';
import SideBar from './components/navbar'
import Footer from './components/footer';
import ThemeToggle from './components/theme/toggle';
import OccUtilsApp from './app';
import { cookies } from 'next/headers';
import './styles/globals.css';

export const metadata = {
  title: 'OCC API Utils',
  description: 'Some useful tools for OCC',
}

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout(props) {

  const theme = cookies().get('occTheme')?.value;

  return (
    <StoreProvider>
      <html lang='en' className={theme}>
        <head>
          <meta charSet='UTF-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='icon' href='/svg/apexit/favicon.svg' sizes='32x32' />
          <link rel='icon' href='/svg/apexit/favicon.svg' sizes='192x192' />
          <link rel='apple-touch-icon' href='/svg/apexit/favicon.svg' />
          <meta name='apexIT-logo' content='/svg/apexit/favicon.svg' />
        </head>
        <body className={inter.className}
          suppressHydrationWarning={true} >
          <main className='grid grid-flow-row min-h-full custom-grid-flow'>
            <Header>
              <ThemeToggle />
            </Header>
            <section className='grid grid-flow-col bg-white text-black dark:bg-slate-900 dark:text-white'>
              <SideBar />
              <section className='px-6 pt-2 relative pb-6 custom-col-span'>
                <OccUtilsApp {...props} />
              </section>
            </section>
            <Footer />
          </main>
        </body>
      </html>
    </StoreProvider>
  )
}


