'use client';
import React, { useCallback, useContext } from 'react';
import { useLoginStatus } from '../store/hooks';
import { useRouter, usePathname } from 'next/navigation';
import { useToasts } from '../store/hooks';
import { StoreContext } from '../store/context';
import { formToJson } from '../utils';
import { TextInput, Button, Label } from 'flowbite-react';
import { KeyIcon, WindowIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function Login(props) {

  const { action } = useContext(StoreContext);

  const toast = useToasts();
  const router = useRouter();

  const isLoggedIn = useLoginStatus();
  const pagePath = usePathname();

  // Avoiding the unnecessary redirect for other routes
  isLoggedIn && pagePath.includes('login') && router.push('/');

  // Used to show notifications
  const onSuccess = (res) => {
    toast.show({
      status: 'success',
      message: 'You are successfully logged in..'
    });
    const redirect = setTimeout(() => {
      pagePath.includes('login') && router.push('/');
      props.loginModalRef?.current();
    }, 2000);
    return () => clearTimeout(redirect);
  }

  // Used to show notifications
  const onError = (error) => {
    toast.show({
      status: 'failure',
      message: error.message || 'Login Failed'
    });

  }

  // Updating the state based on need.
  const stateHandler = useCallback((payload, apiResponse) => {
    const result = apiResponse;
    if (result.access_token) {
      return {
        key: 'occRepository',
        value: {
          accessToken: result.access_token
        }
      }
    }

  }, []);


  const updateStore = useCallback((payload) => {
    if (payload.instanceId) {
      return {
        key: 'occRepository',
        value: {
          instanceId: payload.instanceId,
          appKey: payload.accessToken
        }
      }
    }
  }, []);

  const submitForm = (event) => {
    event.preventDefault();
    const formData = event.target;
    const payload = formToJson(formData);

    // Adding instance and token fields to redux store
    action('stateUpdate', { stateHandler: updateStore, data: payload });

    // Doing login
    action('adminApiCall', {
      method: 'post',
      url: 'login',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: 'grant_type=client_credentials',
      showNotification: true,
      onError, onSuccess,
      stateHandler,
      stateAction: 'updateKeyValue'
    });
  }

  return (
    <div id='login-form'>
      <form onSubmit={submitForm} className='block'>
        <section className='m-auto w-5/6 my-6 lg:flex bg-slate-200 dark:bg-slate-800 p-10 rounded-md gap-4 lg'>
          <div className='w-3/1 flex m-auto mb-4 lg:mb-0'>
            <Image src='/media/appBanner.jpg' className='rounded w-full' alt='occ banner' width={100} height={100} />
          </div>
          <div className='w-full m-auto'>
            <div className='mb-2 block'>
              <Label
                htmlFor='instanceId'
                value='Instance Id'
              />
            </div>
            <TextInput type='text' id='instanceId' className='mb-2' name='instanceId' required placeholder='Ex: p1234567890dev' icon={WindowIcon} />
            <div className='mb-2 block mt-4'>
              <Label
                htmlFor='token'
                value='App Key'
              />
            </div>
            <TextInput type='text' id='token' className='block' name='accessToken' required autoComplete='off' placeholder='Ex: eyJ2ZXJzaW9uIjowLCJ1cmkiOiJjbGllbnRBcHBsaWNhdGlvbnMvbXRtLXN0b3JlZnJvbnQvcGFnZS9sb2dpbi8iLCJoYXNoIjoiOEdnY2tBPT0ifQ==' icon={KeyIcon} />
            <Button className='mt-10 m-auto w-2/6' value='sign-in' type='submit'>Sign in </Button>
          </div>
        </section>
      </form>
    </div>
  )
}
