/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import "./styles.css";

const Header = () => {

  return (
    <header className="sticky top-0 z-10 flex-none h-24 mx-auto w-full border-b dark:border-b-slate-600 bg-white dark:bg-slate-900 ">
      <nav className="bg-white border-slate-200 px-4 lg:px-6 py-2.5 dark:bg-slate-900 relative w-full">
        <div className="flex flex-wrap justify-between items-center">
          <div className="CAU__FlexBox">
            <Link href="https://apexit.com" className="flex items-center dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="prefix__Layer_1" x="0" y="0" viewBox="0 0 360 144" width={150} height={50}
                fill="currentColor">
                <path
                  d="M149.7 66.1c-6.4-.4-27.5 0-32 0h-8.2v2.2l1.2 3.4v63.5h18.5v-25.9c2.4.1 5.8.2 10.3.2 15-.1 32.1-4.6 32.9-23.1.8-18.5-16.3-19.9-22.7-20.3zm-1.8 32.3c-3.6 1-12.5.6-18.8.6V76.7c6.1-.7 22.9-1.5 25.1 5.8 2.7 8.5-2.2 14.8-6.3 15.9zM302.2 94.7c-1.2 0-2.4.1-3.6.2.2-2.8.6-6.7.6-14.6 0-9.7-.3-11.5-.6-14.2 1.2.1 2.4.2 3.6.2 1.2 0 2.4-.1 3.6-.2-.2 2.7-.5 4.6-.5 14.2 0 7.8.3 11.8.5 14.6-1.2-.1-2.4-.2-3.6-.2zM327.5 94.7c-1.2 0-2.4.1-3.6.2.2-2.8.5-6.7.5-14.6 0-6.5-.1-9.5-.3-11.5H314c-1.6 0-2.8.5-3.8 1.9l-.5-.1.8-4.6h.5c1 0 1.8.1 3.1.1h26.7c1.3 0 2.6 0 3.2-.1h.5l.8 4.6-.4.1c-1-1.4-2.2-1.9-3.8-1.9h-10.2c-.2 2.1-.2 5-.2 11.5 0 7.8.3 11.8.5 14.6-1.3-.1-2.6-.2-3.7-.2zM107.7 134.5l-2-2.6-27.5-64.3c-.9-1.8-.8-1.5-2.8-1.5H52.9v2.2l.5 1.4-38.6 65.5h16.4l13.3-24.5h32.7l9.1 21.9.6 1.5c.3.7.9 1.1 1.6 1.1h19.2v-.7zm-57.7-34l12.9-23.7 9.9 23.7H50z"
                  fill="currentColor" />
                <path
                  d="M313 132.7s-2.5-.3-6.9-.8c-7.5-.9-24.6-20.6-36.4-34.1 12-14.7 23.3-28.2 23.3-28.2s3.1-3.2-1-3.8c-1.9-.3-5.6 0-10.7.3-7.9 9.6-13.7 16.5-19.2 23.1-4.8-5.4-9.1-10.8-13.3-15.4-2.6-2.8-4.4-5.1-7.9-6.6-3.1-1.3-7-1.1-11.2-1.1h-55.6v2.2l1.2 3.4v63.5h63.9s3-3.4 6.1-7.4c1.5-1.9 7.3-9.1 14.5-17.9 10.5 12.2 20.6 24.6 25.8 25.1 6 .6 27.6.2 27.6.2l-.2-2.5zm-80.7-8.5h-39.2v-19.3H231v-11h-37.9v-17h37.4l21.7 24.2c-.1.1-17 20.3-19.9 23.1z"
                  fill="currentColor" />
                <path
                  d="M294 54.5c-.2-.2-64.3-43.5-64.3-43.5l-3.3-2.2c-.3-.2-.7-.2-1 0l-3.2 1.8-72 41.5s-.8 1.2 0 1c.7-.1 52.3-23.7 67.4-30.7 1.8-.8 3.1-1.4 3.7-1.7.2-.1.5-.1.8 0 .5.3 3 1.7 3 1.7l56.1 35.3s8.2.5 11.1.4c.3 0 .5 0 .7-.1 4.1-.4 1.2-3.3 1-3.5z"
                  fill="#eb2032" />
                <path
                  d="M269.1 33.2l-6.4-4.4c-.6-.4-.7-1.3-.1-1.9l14.8-13.2 18.2 15 6.8-6.1 41.5 34h-.1c-.8.3-1.8.2-2.5-.3L305 34c-.9-.5-2-.5-2.8.2l-5.4 4.4c-1 .8-2.4.8-3.4 0l-14-11.5c-.7-.6-1.8-.6-2.5 0l-7.8 6.1z"
                  fill="#c0c2c4" />
              </svg>
            </Link>
            <p className="text-3xl font-semibold whitespace-nowrap text-slate-900 dark:text-white CAU__HeaderText">Commerce API Utils</p>
          </div>
          <div className="flex items-center lg:order-2">
            <Link href="#" className="text-slate-800 dark:text-white hover:bg-slate-50 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800">Log in</Link>
            <Link href="https://github.com/Vikram-VN/occ-api-utils" target="blank" className="text-slate-800 dark:text-white hover:bg-slate-50 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800">GitHub</Link>

            {/* <button
              id="theme-toggle"
              type="button"
              onClick={window.__setPreferredTheme}
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <svg
                id="theme-toggle-dark-icon"
                className={`w-5 h-5 ${window.__theme === 'dark' ? 'hidden' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                ></path>
              </svg>
              <svg
                id="theme-toggle-light-icon"
                className={`w-5 h-5 ${window.__theme === 'dark' ? '' : 'hidden'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button> */}

          </div>

        </div>
      </nav>
    </header>
  )
}

export default Header;