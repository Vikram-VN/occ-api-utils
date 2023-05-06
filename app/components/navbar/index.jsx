"use client";
import React, { useState } from "react";
import Link from "next/link";

const NavBar = () => {

   const [showNav, setNav] = useState(false);
   const [subNav, setSubNav] = useState({});

   const hamburgerMenu = () => {
      setNav(!showNav);
   }

   const showSubNav = (name) => {
      setSubNav({ ...subNav, [name]: !subNav[name] });
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
               <svg className="w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" fill="currentColor" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
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
                        <svg className="w-6 h-6" onClick={() => showSubNav("files")} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                     </button>
                     <ul id="dropdown-example" className={`${subNav?.files ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                           <Link href="/files/media
                           " className="flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg pl-11 group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">Media</Link>
                        </li>
                       
                     </ul>
                  </li>
               </ul>
            </div>
         </aside>

      </div>
   )
}

export default NavBar;
