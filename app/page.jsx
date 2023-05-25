'use client';
import React from 'react';
import Image from 'next/image';
import { Carousel } from 'flowbite-react';
import { ArrowDownIcon } from '@heroicons/react/24/solid';

export default function Home() {
  return (
    <React.Fragment>
      <div className='h-96 m-auto rounded-md'>
        <Carousel >
          <Image
            src='/media/occBanner.png'
            alt='occbanner'
            width={1000}
            height={500}
          />
          <Image
            src='/media/apexian.jpg'
            alt='apexian'
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
      <div className='inline-flex ml-1'>
        <div className=' w-1/2'>
          <h1 className='mt-10 mb-4 text-4xl text-justify bold '>Oracle Commerce</h1>
          <div className='apex-primary pr-5'><p>Oracle Commerce is an ecommerce platform that helps B2C and B2B businesses connect customer and sales data from their CRM to their financial and operational data so they can offer personalized experiences to buyers across sales channels.</p><br />
            <a href="https://www.oracle.com/in/cx/product-tours/#commerce" target='blank'><button className="rounded-full hover:scale-105 ease-in duration-300  bg-red-800 p-2 mt-4 pl-4 pr-4">Take a product tour</button></a>
          </div>
        </div>
        <div className=' w-1/2'>
          <h1 className='mt-10 mb-4 text-4xl text-justify bold  pr-5'>About the REST APIs</h1>
          <div className='apex-primary'><p>The Oracle Commerce Service REST APIs provide an extensive set of endpoints for configuring and managing your store. You can also use these APIs to extend the capabilities of your store by integrating with other Oracle Cloud offerings and external systems, including order management systems and payment providers.</p><br />
            <span>You can view a list of all &nbsp; </span><a href="https://docs.oracle.com/en/cloud/saas/cx-commerce/cxocc/rest-endpoints.html" target='blank'><button className="rounded-full  bg-red-800 p-2 pl-4 pr-4 hover:scale-105 ease-in duration-300">REST Endpoints</button></a>
          </div>
        </div>
      </div>

      <div className=' '>
        <h1 className='mt-10 mb-4 text-4xl text-justify bold '>About ApexIT</h1>
        <div className='aprimary '><p>Since 1997, Apex IT has expanded, but our commitment to assisting business, government, and higher education clients in being more effective, efficient, and lucrative has not changed. Apex IT has successfully completed thousands of engagements in countries all over the world, including the US, India, Asia Pacific, and Europe, assisting clients with everything from long-term planning through implementation.</p><br />
          <a href="https://apexit.com/expertise/" target='blank'><button className="rounded-full pl-4 pr-4  bg-red-800 p-2 hover:scale-105 ease-in duration-300">More about ApexIT </button></a>
        </div>
      </div>

      <div className=' inline-flex gap-x-20 '>
        <div className='aprimary w-1/2 pr-1'>
          <h1 className='mt-10 mb-4 text-4xl text-justify bold '>About Commerce API Utils</h1>
          <p>Commerce API Utils Tool is an invaluable asset for developers, providing a comprehensive suite of functionalities to enhance and streamline e-commerce API integrations effortlessly.</p><br />
          <p>This powerful tool simplifies complex API interactions, offering a wide range of utility functions, including file management, Deployment info, request authentication, and response parsing. By leveraging Commerce API Utils Tool, developers can focus on building exceptional user experiences while minimizing the time and effort required for API integration.</p><br />
          <p>By utilizing this versatile tool, developers can expedite the development process, accelerate time-to-market, and ensure the stability and reliability of their e-commerce solutions, empowering businesses to thrive in the competitive online marketplace.</p><br />
          <p>Commerce API Utils Tool is a game-changer for developers, offering an intuitive interface and robust support, making it the go-to choice for simplifying and enhancing e-commerce API integrations.</p><br />
        </div>
        <div className='w-max shadow-2xl hover:scale-105 ease-in duration-300 bg-white mt-10 mb-4 text-justify  bold rounded pt-16 pl-5 pr-5 text-slate-950  dark:bg-gray-800 dark:text-white'>
          <div className='flex justify-evenly text-white text-4xl font-bold mb-8 hover:scale-105 ease-in duration-300  '>Quick Guide</div>
          <div className='flex flex-col items-center '>
            <p className='text-lg	hover:scale-105 ease-in duration-300'>In the top right corner of the screen, select Log in.</p>
            <ArrowDownIcon className='h-10 w-7 ' />
            <p className='text-lg	hover:scale-105 ease-in duration-300'>Login with the instance ID and AppKey.</p>
            <ArrowDownIcon className='h-10 w-7 ' />
            <p className='text-lg	hover:scale-105 ease-in duration-300'>Use the sidebar to navigate to the menu of your choice.</p>
            <ArrowDownIcon className='h-10 w-7 ' />
            <p className='text-lg	hover:scale-105 ease-in duration-300'>Start using it</p>
          </div>

        </div>
      </div>
    </React.Fragment>
  )
}
