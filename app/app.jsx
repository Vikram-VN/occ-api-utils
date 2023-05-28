'use client';
import React, { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { StoreContext } from './store/context';
import { useLoginStatus } from './store/hooks';
import ToastProvider from './components/toast';
import Login from './login/page';

const OccUtilsApp = ({ children }) => {

  const router = useRouter();
  const { action } = useContext(StoreContext);

  // Rendering children's conditionally
  const isLoggedIn = useLoginStatus();
  const pagePath = usePathname();
  // Allowing routes without login
  const isHomePage = pagePath === '/';
  const isTools = pagePath === '/tools';


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
      }

    }

    if (isLoggedIn) {
      const refresh = setInterval(() => {
        action('adminApiCall', {
          method: 'post',
          url: 'refresh',
          data: {},
          stateAction: 'updateKeyValue',
          stateHandler
        })
      }, (1 * 60 * 1000));
      return () => clearInterval(refresh);
    }
  }, [action, isLoggedIn, router]);

  return (
    <ToastProvider>
      {(isHomePage || isTools || isLoggedIn) ? children : children}
    </ToastProvider>
  )
}

export default OccUtilsApp;
