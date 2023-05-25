'use client';
import React, { useState } from 'react';
import {
   Bars3BottomLeftIcon,
   DocumentIcon,
   ChevronDownIcon,
   ChevronUpIcon,
   ArrowDownTrayIcon,
   ArrowUpTrayIcon,
   InboxArrowDownIcon,
   EnvelopeIcon,
   PuzzlePieceIcon,
   UserGroupIcon,
   UsersIcon,
   MagnifyingGlassIcon,
   WrenchScrewdriverIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Tooltip } from 'flowbite-react';

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
      <div className='flex bg-slate-200 dark:bg-slate-900'>
         <div className='border-r dark:border-r-slate-600 h-full'>
            <button type='button' onClick={hamburgerMenu} className='hidden h-10 mr-4 inline-flex items-center p-2 mt-2 ml-3 text-sm text-slate-500 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-900 dark:focus:ring-slate-600'>
               <span className='sr-only'>Open sidebar</span>
               <Bars3BottomLeftIcon className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' />
            </button>

            
            <Tooltip content='General Tools' placement='auto'>
               <Link href='/tools' className='h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                  <WrenchScrewdriverIcon className='w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' stroke='currentColor' />
                  <span className='sr-only'>General Tools</span>
               </Link>
            </Tooltip>

            <Tooltip content='Deployment' placement='auto'>
               <Link href='/deployment' className='h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                  <InboxArrowDownIcon className='w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' stroke='currentColor' />
                  <span className='sr-only'>Deployment</span>
               </Link>
            </Tooltip>

            <Tooltip content='Export' placement='auto'>
               <Link href='/export' className='h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                  <ArrowUpTrayIcon className='w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' stroke='currentColor' />
                  <span className='sr-only'>Export</span>
               </Link>
            </Tooltip>

            <Tooltip content='Extensions' placement='auto'>
               <Link href='/extensions' className='h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                  <PuzzlePieceIcon className='w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' stroke='currentColor' />
                  <span className='sr-only'>Extensions</span>
               </Link>
            </Tooltip>

            <Tooltip content='Files' placement='auto'>
               <Link href='/files' className='h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                  <DocumentIcon className='w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' stroke='currentColor' />
                  <span className='sr-only'>Files</span>
               </Link>
            </Tooltip>

            <Tooltip content='Import' placement='auto'>
               <Link href='/import' className='h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                  <ArrowDownTrayIcon className='w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' stroke='currentColor' />
                  <span className='sr-only'>Import</span>
               </Link>
            </Tooltip>

            <Tooltip content='Organizations' placement='auto'>
               <Link href='/organizations' className='h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                  <UserGroupIcon className='w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' stroke='currentColor' />
                  <span className='sr-only'>Organizations</span>
               </Link>
            </Tooltip>

            <Tooltip content='Profiles' placement='auto'>
               <Link href='/profiles' className='h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                  <UsersIcon className='w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' stroke='currentColor' />
                  <span className='sr-only'>Profiles</span>
               </Link>
            </Tooltip>

            <Tooltip content='Search' placement='auto'>
               <Link href='/search' className='h-10 mr-4 flex items-center p-2 mt-2 ml-3 text-sm text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                  <MagnifyingGlassIcon className='w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' stroke='currentColor' />
                  <span className='sr-only'>Search</span>
               </Link>
            </Tooltip>

         </div>
         {/* Here onwards expandable content starts */}
         <aside id='sidebar-multi-level-sidebar' className={`w-64 h-screen transition-transform border-r dark:border-r-slate-600 sm:translate-x-0 ${showNav ? '' : 'hidden'}`}>
            <div className='h-full max-h-screen px-3 py-4 overflow-y-auto bg-slate-50 dark:bg-slate-800'>
               <ul className='space-y-2 font-medium'>
                  <li>
                     <span className='h-8 mr-4 flex items-center p-2 ml-3'>Navigation Menu</span>
                  </li>
                  <li>
                     <button type='button' className='flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                        <Link href='/deployment' className='flex items-center w-full text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                           <span className='flex-1 ml-3 text-left whitespace-nowrap'>Deployment</span>
                        </Link>
                        <ChevronDownIcon className={`${subNav?.deployment ? 'hidden' : ''} w-6 h-6`} onClick={() => showSubNav('deployment')} fill='currentColor' viewBox='0 0 20 20' />
                        <ChevronUpIcon className={`${subNav?.deployment ? '' : 'hidden'} w-6 h-6`} onClick={() => showSubNav('deployment')} fill='currentColor' viewBox='0 0 20 20' />
                     </button>
                     <ul id='dropdown-example' className={`${subNav?.deployment ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                           <Link href='/deployment/status' className='flex items-center w-full p-2 text-slate-900 transform duration-75 rounded-lg pl-11 group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>Deploy Status</Link>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <button type='button' className='flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                        <Link href='/export' className='flex items-center w-full text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                           <span className='flex-1 ml-3 text-left whitespace-nowrap'>Export</span>
                        </Link>
                        <ChevronDownIcon className={`${subNav?.export ? 'hidden' : ''} w-6 h-6`} onClick={() => showSubNav('export')} fill='currentColor' viewBox='0 0 20 20' />
                        <ChevronUpIcon className={`${subNav?.export ? '' : 'hidden'} w-6 h-6`} onClick={() => showSubNav('export')} fill='currentColor' viewBox='0 0 20 20' />
                     </button>
                     <ul id='dropdown-example' className={`${subNav?.export ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                           <Link href='/export/track
                           ' className='flex items-center w-full p-2 text-slate-900 transform duration-75 rounded-lg pl-11 group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>Track Exports</Link>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <button type='button' className='flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                        <Link href='/extensions' className='flex items-center w-full text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                           <span className='flex-1 ml-3 text-left whitespace-nowrap'>Extensions</span>
                        </Link>
                        <ChevronDownIcon className={`${subNav?.extensions ? 'hidden' : ''} w-6 h-6`} onClick={() => showSubNav('extensions')} fill='currentColor' viewBox='0 0 20 20' />
                        <ChevronUpIcon className={`${subNav?.extensions ? '' : 'hidden'} w-6 h-6`} onClick={() => showSubNav('extensions')} fill='currentColor' viewBox='0 0 20 20' />
                     </button>
                     <ul id='dropdown-example' className={`${subNav?.extensions ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                           <Link href='/extensions/manage' className='flex items-center w-full p-2 text-slate-900 transform duration-75 rounded-lg pl-11 group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>Manage Extensions</Link>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <button type='button' className='flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                        <Link href='/files' className='flex items-center w-full text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                           <span className='flex-1 ml-3 text-left whitespace-nowrap'>Files</span>
                        </Link>
                        <ChevronDownIcon className={`${subNav?.files ? 'hidden' : ''} w-6 h-6`} onClick={() => showSubNav('files')} fill='currentColor' viewBox='0 0 20 20' />
                        <ChevronUpIcon className={`${subNav?.files ? '' : 'hidden'} w-6 h-6`} onClick={() => showSubNav('files')} fill='currentColor' viewBox='0 0 20 20' />
                     </button>
                     <ul id='dropdown-example' className={`${subNav?.files ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                           <Link href='/files/media
                           ' className='flex items-center w-full p-2 text-slate-900 transform duration-75 rounded-lg pl-11 group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>Media</Link>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <button type='button' className='flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                        <Link href='/import' className='flex items-center w-full text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                           <span className='flex-1 ml-3 text-left whitespace-nowrap'>Import</span>
                        </Link>
                        <ChevronDownIcon className={`${subNav?.import ? 'hidden' : ''} w-6 h-6`} onClick={() => showSubNav('import')} fill='currentColor' viewBox='0 0 20 20' />
                        <ChevronUpIcon className={`${subNav?.import ? '' : 'hidden'} w-6 h-6`} onClick={() => showSubNav('import')} fill='currentColor' viewBox='0 0 20 20' />
                     </button>
                     <ul id='dropdown-example' className={`${subNav?.import ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                           <Link href='/import/track
                           ' className='flex items-center w-full p-2 text-slate-900 transform duration-75 rounded-lg pl-11 group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>Track Imports</Link>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <button type='button' className='flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                        <Link href='/organizations' className='flex items-center w-full text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                           <span className='flex-1 ml-3 text-left whitespace-nowrap'>Organizations</span>
                        </Link>
                        <ChevronDownIcon className={`${subNav?.organizations ? 'hidden' : ''} w-6 h-6`} onClick={() => showSubNav('organizations')} fill='currentColor' viewBox='0 0 20 20' />
                        <ChevronUpIcon className={`${subNav?.organizations ? '' : 'hidden'} w-6 h-6`} onClick={() => showSubNav('organizations')} fill='currentColor' viewBox='0 0 20 20' />
                     </button>
                     <ul id='dropdown-example' className={`${subNav?.organizations ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                           <Link href='/organizations/manage' className='flex items-center w-full p-2 text-slate-900 transform duration-75 rounded-lg pl-11 group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>Manage Organizations</Link>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <button type='button' className='flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                        <Link href='/profiles' className='flex items-center w-full text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                           <span className='flex-1 ml-3 text-left whitespace-nowrap'>Profiles</span>
                        </Link>
                        <ChevronDownIcon className={`${subNav?.profiles ? 'hidden' : ''} w-6 h-6`} onClick={() => showSubNav('profiles')} fill='currentColor' viewBox='0 0 20 20' />
                        <ChevronUpIcon className={`${subNav?.profiles ? '' : 'hidden'} w-6 h-6`} onClick={() => showSubNav('profiles')} fill='currentColor' viewBox='0 0 20 20' />
                     </button>
                     <ul id='dropdown-example' className={`${subNav?.profiles ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                           <Link href='/profiles/manage
                           ' className='flex items-center w-full p-2 text-slate-900 transform duration-75 rounded-lg pl-11 group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>Manage Profiles</Link>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <button type='button' className='flex items-center w-full p-2 text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                        <Link href='/search' className='flex items-center w-full text-slate-900 transition duration-75 rounded-lg group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>
                           <span className='flex-1 ml-3 text-left whitespace-nowrap'>Search</span>
                        </Link>
                        <ChevronDownIcon className={`${subNav?.search ? 'hidden' : ''} w-6 h-6`} onClick={() => showSubNav('search')} fill='currentColor' viewBox='0 0 20 20' />
                        <ChevronUpIcon className={`${subNav?.search ? '' : 'hidden'} w-6 h-6`} onClick={() => showSubNav('search')} fill='currentColor' viewBox='0 0 20 20' />
                     </button>
                     <ul id='dropdown-example' className={`${subNav?.search ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                           <Link href='/search/configuration
                           ' className='flex items-center w-full p-2 text-slate-900 transform duration-75 rounded-lg pl-11 group hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'>Search Configuration</Link>
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
