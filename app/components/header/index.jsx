/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useRef, useContext } from 'react';
import Link from 'next/link';
import { StoreContext } from '../../store/context';
import { useLoginStatus } from '../../store/hooks';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import AppLogo from '../logo';
import './styles.css';
import Modal from '../modal';
import Login from '../../login/page';

const Header = ({ children }) => {

  const loginModalRef = useRef();

  const { action } = useContext(StoreContext);
  const router = useRouter();


  const loginPath = usePathname().includes('login');
  const isLoggedIn = useLoginStatus();

  const clearReduxState = () => {
    router.push('/');
    action('stateUpdate', { stateAction: 'clearState' })
  }

  // Changing header text for user
  const userText = isLoggedIn ? 'Log out' : 'Log in';
  const userAction = isLoggedIn ? 'user-logout' : 'user-login'

  return (
    <header className='sticky top-0 flex-none h-24 mx-auto  border-b dark:border-b-slate-600 bg-slate-200 dark:bg-slate-900 z-50'>
      <nav className='bg-slate-200 border-slate-200 px-4 lg:px-6 py-2.5 dark:bg-slate-900 relative '>
        <div className='flex flex-wrap justify-between items-center'>
          <div className='CAU__FlexBox'>
            <Link href='/' className='flex items-center dark:text-white'>
              <AppLogo />
            </Link>
            <h1 className='text-3xl font-semibold whitespace-nowrap text-slate-900 dark:text-white CAU__HeaderText'>Commerce API Utils</h1>
          </div>
          <div className='flex items-center lg:order-2'>
            {children}
            <label htmlFor={userAction} className='text-slate-800 cursor-pointer dark:text-white hover:bg-slate-50 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800'>{userText}</label>
            <Link href='https://github.com/Vikram-VN/occ-api-utils' target='_blank' className='hidden text-slate-800 dark:text-white hover:bg-slate-50 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800'>GitHub</Link>
          </div>
        </div>
      </nav>
      <input name='logout-modal' type='text' id='user-logout' className='hidden' onClick={clearReduxState} />
      {!loginPath && <Modal title={'OCC Login'} loginModalRef={loginModalRef}>
          <Login loginModalRef={loginModalRef} />
      </Modal>}
    </header>
  )
}

export default Header;