"use client";
import React from "react";
import { Inter } from 'next/font/google';
import { usePathname } from "next/navigation";
import { ToastProvider } from './components/toast';
import { useLoginStatus } from './store/hooks';
import Login from './login/page';
import Header from './components/header';
import SideBar from './components/navbar';
import Footer from './components/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const OccUtilsApp = ({ children }) => {

  // Rendering children's conditionally
  const isLoggedIn = useLoginStatus();
  const pagePath = usePathname();
  const isHomePage = pagePath === '/';

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}
        suppressHydrationWarning={true}
      >
        <main className="grid grid-flow-row min-h-full custom-grid-flow">
          <Header />
          <section className="grid grid-flow-col bg-white text-black dark:bg-slate-900 dark:text-white">
            <SideBar />
            <section className="px-6 pt-2 relative pb-6 custom-col-span">
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