"use client";
import { Inter } from 'next/font/google';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import SideBar from './components/navbar/sideBar';
import { useEffect, useState } from "react";
import 'flowbite';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OCC API Utils',
  description: 'Some useful tools for OCC',
}

export default function RootLayout({ children }) {

  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.theme : "dark"
  );
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [colorTheme, theme]);

  const changeTheme = () => {
    const colorTheme = theme === "dark" ? "light" : "dark";
    setTheme(colorTheme);
  }

  return (

    <html lang="en" className={theme}>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <section className="flex flex-col h-screen">
          <Header theme={theme} changeTheme={changeTheme} />
          <section className="flex bg-white text-black dark:bg-slate-900 dark:text-white">
            <SideBar />
            <section className="p-10 w-full">{children}</section>
          </section>
          <Footer />
        </section>
      </body>
    </html>
  )
}
