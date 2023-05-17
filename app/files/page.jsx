'use client';
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../store/context';
import { Card, Table, Checkbox } from 'flowbite-react';
import { formatBytes, formatDate } from '../utils';
import { ArrowDownTrayIcon, TrashIcon } from '@heroicons/react/24/solid';
import httpCall from '../utils/httpCall';

export default function Files() {

  const { action } = useContext(StoreContext);

  const [files, setFiles] = useState({});

  const stateHandler = (payload, apiResponse) => {
    setFiles(apiResponse);
  }

  useEffect(() => {
    httpCall({ url: 'files/?folder=thirdparty' });
  }, [])


  const fileDownload = (path) => {
    const fileLink = files.items.map(item => item.path === path && item.url)[0].replace('admin', 'store');
    return fileLink;
  };

  const fileDelete = (event) => {
    const file = event.target.id;
  }
  const filesDelete = (files) => { }

  const tableData = data => {
    return (
      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={data.checksum}>
        <Table.Cell className='!p-4'>
          <Checkbox />
        </Table.Cell>
        <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
          {data.name}
        </Table.Cell>
        <Table.Cell>
          {data.extension}
        </Table.Cell>
        <Table.Cell>
          {formatBytes(data.size)}
        </Table.Cell>
        <Table.Cell>
          {formatDate(data.lastModified)}
        </Table.Cell>
        <Table.Cell className='flex justify-around'>
          <a href={fileDownload(data.path)} target="_blank" download="file">
            <ArrowDownTrayIcon className="h-6 w-6 cursor-pointer" id={`${data.path}||${data.name}`} />
          </a>
          <TrashIcon className="h-6 w-6 cursor-pointer" id={`${data.path}||${data.name}`} onClick={fileDelete} />
        </Table.Cell>
      </Table.Row>

    )
  }

  return (
    <React.Fragment>
      <Card className='mb-4'>
        Welcome
      </Card>
      {
        files.items && <Table hoverable={true}>
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
                Delete & Download
              </span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {files.items.map(item => tableData(item))}
          </Table.Body>
        </Table>
      }
    </React.Fragment>
  )
}
