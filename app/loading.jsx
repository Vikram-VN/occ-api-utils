'use client';
import { Spinner } from 'flowbite-react';
import React from 'react';

const Loading = () => {
  return (
    <div className='text-center grid w-full h-full content-center'>
      <Spinner
        aria-label='Page Loader'
        size='xl'
        className='block'
      />
      <p>Please wait...</p>
    </div>
  )
}

export default Loading;