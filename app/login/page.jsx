'use client';
import React, { useContext } from 'react';
import { useLoginStatus } from '../store/hooks';
import { useRouter, usePathname } from 'next/navigation';
import { useToasts } from '../components/toast/';
import { StoreContext } from '../store/context';
import { formToJson } from '../utils';
import { TextInput, Button, Label } from 'flowbite-react';
import { KeyIcon, WindowIcon } from '@heroicons/react/24/solid';

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
      message: 'You are successfully logged in..',
      delay: 3,
    });
    setTimeout(() => {
      router.push('/files?page=1');
      props.loginModalRef?.current();
    }, 2000);
  }

  // Used to show notifications
  const onError = (error) => {
    toast.show({
      status: 'failure',
      message: error.message,
      delay: 3,
    });

  }

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


  const updateStore = (payload) => {
    if (payload.instanceId) {
      return {
        key: 'occRepository',
        value: {
          instanceId: payload.instanceId,
          appKey: payload.accessToken
        }
      }
    }
  }

  const submitForm = (event) => {
    event.preventDefault();
    const formData = event.target;
    const payload = formToJson(formData);

    // Adding instance and token fields to redux store
    action('stateUpdate', { stateHandler: updateStore, data: payload });

    // Doing login
    action('apiCall', {
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
    <form onSubmit={submitForm} className='block'>
      <section className='m-auto w-5/6 my-6 lg:flex bg-slate-200 dark:bg-slate-800 p-10 rounded-md gap-4 lg'>
        <div className='w-3/1 flex m-auto mb-4 lg:mb-0'>
          <img src='/media/apexian.jpg' className='rounded' alt='apexit banner' />
        </div>
        <div className='w-full m-auto'>
          <div className='mb-2 block'>
            <Label
              htmlFor='instanceId'
              value='Instance Id'
            />
          </div>
          <TextInput id='instanceId' className='mb-2' name='instanceId' required placeholder='Ex: p1234567890dev' icon={WindowIcon} />
          <div className='mb-2 block mt-4'>
            <Label
              htmlFor='token'
              value='App Key'
            />
          </div>
          <TextInput id='token' className='block' name='accessToken' required autoComplete='off' placeholder='Ex: eyJ2ZXJzaW9uIjowLCJ1cmkiOiJjbGllbnRBcHBsaWNhdGlvbnMvbXRtLXN0b3JlZnJvbnQvcGFnZS9sb2dpbi8iLCJoYXNoIjoiOEdnY2tBPT0ifQ==' icon={KeyIcon} />
          <Button className='mt-10 m-auto w-2/6' value='signin' type='submit'>Sign in </Button>
        </div>
      </section>
    </form>
  )
}
