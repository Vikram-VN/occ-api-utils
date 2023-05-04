"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./styles.css";

const Header = () => {

  return (
    <header className="sticky top-0 z-40 flex-none mx-auto w-full bg-white dark:bg-slate-900 ">
      <nav className="bg-white border-slate-200 px-4 lg:px-6 py-2.5 dark:bg-slate-900 relative w-full">
        <div className="flex flex-wrap justify-between items-center">
          <div className="CAU__FlexBox">
            <Link href="https://apexit.com" className="flex items-center">
              <Image src="/apexLogo.png" className="mr-3 h-20 sm:h-10 md:h-20 CAU__HeaderLogo" width={100} height={100} alt="ApexIT" />
            </Link>
            <p className="text-3xl font-semibold whitespace-nowrap text-slate-900 dark:text-white CAU__HeaderText">Commerce API Utils</p>
          </div>

          <div className="flex items-center lg:order-2">
            <Link href="#" className="text-slate-800 dark:text-white hover:bg-slate-50 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800">Log in</Link>
            <Link href="https://github.com/Vikram-VN/occ-api-utils" target="blank" className="text-slate-800 dark:text-white hover:bg-slate-50 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800">GitHub</Link>

            <button
              id="theme-toggle"
              type="button"
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <svg
                id="theme-toggle-dark-icon"
                className={`w-5 h-5 dark-icon`}
                fill="currentColor"
                onClick={() => {
                  window.__setPreferredTheme('light');
                }}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                ></path>
              </svg>
              <svg
                id="theme-toggle-light-icon"
                className={`w-5 h-5 light-icon`}
                fill="currentColor"
                onClick={() => {
                  window.__setPreferredTheme('dark');
                }}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

          </div>

        </div>
      </nav>
    </header>
  )
}

export default Header;