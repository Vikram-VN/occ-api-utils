"use client";
import React, { useState } from "react";
import Link from "next/link";

const NavBar = () => {

   const [showNav, setNav] = useState(false);

   const hamburgerMenu = () => {
      setNav(!showNav);
   }
   return (
      <div className="flex">
         <div className="border-r dark:border-r-slate-600 h-screen">
            <button type="button" onClick={hamburgerMenu} className="h-10 mr-4 inline-flex items-center p-2 mt-2 ml-3 text-sm text-slate-500 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-900 dark:focus:ring-slate-600">
               <span className="sr-only">Open sidebar</span>
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
               </svg>
            </button>
            <Link href="/files" className="h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
               <svg className="w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" fill="currentColor" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
               </svg>
            </Link>
         </div>

         <aside id="sidebar-multi-level-sidebar" className={`w-64 h-screen transition-transform sm:translate-x-0 ${showNav ? '' : 'hidden'}`}>
            <div className="h-full max-h-screen px-3 py-4 overflow-y-auto bg-slate-50 dark:bg-slate-800">
               <ul className="space-y-2 font-medium">
                  <li>
                     <span className="h-8 mr-4 flex items-center p-2 ml-3"></span>
                  </li>
                  <li>
                     <button type="button" className="flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
                        <Link href="/files" className="flex items-center w-full text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
                           <span className="flex-1 ml-3 text-left whitespace-nowrap">Files</span>
                        </Link>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                     </button>
                     <ul id="dropdown-example" className="hidden py-2 space-y-2">
                        <li>
                           <Link href="#" className="flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg pl-11 group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">Products</Link>
                        </li>
                        <li>
                           <Link href="#" className="flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg pl-11 group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">Billing</Link>
                        </li>
                        <li>
                           <Link href="#" className="flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg pl-11 group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">Invoice</Link>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <Link href="#" className="flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
                        <svg className="flex-shrink-0 w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                        <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-slate-800 bg-slate-200 rounded-full dark:bg-slate-700 dark:text-slate-300">Pro</span>
                     </Link>
                  </li>
                  <li>
                     <Link href="#" className="flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
                        <svg className="flex-shrink-0 w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                     </Link>
                  </li>
                  <li>
                     <Link href="#" className="flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
                        <svg className="flex-shrink-0 w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                     </Link>
                  </li>
                  <li>
                     <Link href="#" className="flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
                        <svg className="flex-shrink-0 w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                     </Link>
                  </li>
                  <li>
                     <Link href="#" className="flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
                        <svg className="flex-shrink-0 w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                     </Link>
                  </li>
                  <li>
                     <Link href="#" className="flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
                        <svg className="flex-shrink-0 w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                     </Link>
                  </li>
               </ul>
            </div>
         </aside>

      </div>
   )
}

export default NavBar;
