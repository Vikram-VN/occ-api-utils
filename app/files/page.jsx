'use client';
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../store/context';
import { useToasts } from '../components/toast';
import { Card, Table, Checkbox } from 'flowbite-react';
import { formatBytes, formatDate } from '../utils';
import { ArrowDownTrayIcon, TrashIcon } from '@heroicons/react/24/solid';
import httpCall, { fileDownload } from '../utils/httpCall';
import Link from 'next/link';

export default function Files() {

  const { action } = useContext(StoreContext);
  const [files, setFiles] = useState({});
  const toast = useToasts();
  const [counter, setCounter] = useState(0);

  const onSuccess = (res) => {
    toast.show({
      status: 'success',
      message: 'File deleted succesfully..',
      delay: 3,
    });
    setCounter(counter + 1)
  }

  // Used to show notifications
  const onError = (error) => {
    toast.show({
      status: 'failure',
      message: error.message,
      delay: 3,
    });
    setCounter(counter + 1)

  }

  useEffect(() => {
    (async () => {
      const apiResponse = await httpCall({ url: 'files/?folder=general' });
      setFiles(apiResponse);
    })();

  }, [counter]);

  const fileDelete = async (filePath) => {
    httpCall({
      method: 'post',
      url: '/files/deleteFile',
      data: {
        filename: filePath
      },
      showNotification: true,
      onSuccess,
      onError,
    });
  }

  const filesDelete = (files) => { }

  const tableData = data => {
    return (
      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={data.lastModified}>
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
          <ArrowDownTrayIcon className="h-6 w-6 cursor-pointer" onClick={() => fileDownload(data.path, data.name)} />
          <TrashIcon className="h-6 w-6 cursor-pointer" onClick={() => fileDelete(data.path)} />
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
