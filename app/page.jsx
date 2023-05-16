'use client';
import React from 'react';
import Image from 'next/image';
import { Carousel } from 'flowbite-react';

export default function Home() {
  return (
    <React.Fragment>
      <div className='h-96 m-auto rounded-md'>
        <Carousel >
          <Image
            src='/media/apexian.jpg'
            alt='apexian'
            width={1000}
            height={500}
          />
          <Image
            src='/media/bouldering.png'
            alt='bouldering'
            width={1000}
            height={500}
          />
          <Image
            src='/media/camping.jpg'
            alt='camping'
            width={1000}
            height={500}
          />
          <Image
            src='/media/cycling.jpg'
            alt='cycling'
            width={1000}
            height={500}
          />
          <Image
            src='/media/help.jpg'
            alt='helping'
            width={1000}
            height={500}
          />
          <Image
            src='/media/surfing.jpg'
            alt='surfing'
            width={1000}
            height={500}
          />
          <Image
            src='/media/trucking.jpg'
            alt='trcuking'
            width={1000}
            height={500}
          />
        </Carousel>
      </div>
      <h1 className='mt-10 mb-4 text-4xl text-justify bold'>Who We Are</h1>
      <div className='aprimary'><p>Apex IT provides award-winning, global consulting services that transform your customer, employee, citizen, and student experiences.</p>
      </div>
      <h1 className='mt-10 mb-4 text-4xl text-justify bold'>Why We Are Different</h1>
      <div className='wys-wrap primary'>
        We’ve grown since 1997, but our mission has stayed the same: to guide corporate, public sector and higher education clients on their journey to be more efficient, productive and profitable. Apex IT has completed thousands of engagements around the globe, including the United States, India, Asia Pacific, and Europe, helping clients with everything from strategic guidance to implementation to long-term direction.
      </div>
    </React.Fragment>
  )
}
