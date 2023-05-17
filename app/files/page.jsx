'use client';
import React, { useContext } from 'react';
import { StoreContext } from '../store/context';
import { Card, Table, Checkbox } from 'flowbite-react';

export default function Files() {

  const { action } = useContext(StoreContext);

  return (
    <React.Fragment>
      <Card className='mb-4'>
        <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Noteworthy technology acquisitions 2021
        </h5>
        <p className='font-normal text-gray-700 dark:text-gray-400'>
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </Card>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell className='!p-4'>
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>
            File name
          </Table.HeadCell>
          <Table.HeadCell>
            Extension
          </Table.HeadCell>
          <Table.HeadCell>
            Size
          </Table.HeadCell>
          <Table.HeadCell>
            Last Modified
          </Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>
              Delete
            </span>
            <span className='sr-only'>
              Download
            </span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='!p-4'>
              <Checkbox />
            </Table.Cell>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              Apple MacBook Pro 17
            </Table.Cell>
            <Table.Cell>
              Sliver
            </Table.Cell>
            <Table.Cell>
              Laptop
            </Table.Cell>
            <Table.Cell>
              $2999
            </Table.Cell>
            <Table.Cell>
              <a
                href='/tables'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500 pl-4'
              >
                Delete
              </a>
              <a
                href='/tables'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                Download
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='!p-4'>
              <Checkbox />
            </Table.Cell>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>
              White
            </Table.Cell>
            <Table.Cell>
              Laptop PC
            </Table.Cell>
            <Table.Cell>
              $1999
            </Table.Cell>
            <Table.Cell>
              <a
                href='/tables'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500 pl-4'
              >
                Delete
              </a>
              <a
                href='/tables'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                Download
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='!p-4'>
              <Checkbox />
            </Table.Cell>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              Magic Mouse 2
            </Table.Cell>
            <Table.Cell>
              Black
            </Table.Cell>
            <Table.Cell>
              Accessories
            </Table.Cell>
            <Table.Cell>
              $99
            </Table.Cell>
            <Table.Cell>
              <a
                href='/tables'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500 pl-4'
              >
                Delete
              </a>
              <a
                href='/tables'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                Download
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </React.Fragment>
  )
}
