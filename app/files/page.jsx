'use client';
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../store/context';
import { useToasts } from '../components/toast';
import { useParams } from 'next/navigation';
import { Card, Table, Checkbox, Dropdown, Pagination, Label, TextInput, Button } from 'flowbite-react';
import { debounce, formatBytes, formatDate } from '../utils';
import { ArrowDownTrayIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import httpCall, { fileDownload } from '../utils/httpCall';

export default function Files() {

  const { action } = useContext(StoreContext);
  const [files, setFiles] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const currentPageNo = useParams();
  const [allFilesSelected, setAllFilesSelected] = useState(false);
  const [fileFilters, updateFilters] = useState({ assetType: 'file', filter: '', folder: 'general', sort: 'name:asc' });
  const [pagination, setPagination] = useState({ limit: 2, offset: 1, currentPage: 1, totalPages: 1 });
  const toast = useToasts();
  const [counter, setCounter] = useState(0);

  const onSuccess = (res) => {
    toast.show({
      status: 'success',
      message: 'Files deleted successfully..',
      delay: 3,
    });
    setCounter(counter + 1);
  }

  // Used to show notifications
  const onError = (error) => {
    toast.show({
      status: 'failure',
      message: error.message,
      delay: 3,
    });
    setCounter(counter + 1);

  }

  const paginationHandler = () => {

  }

  // Refreshing table data based on filters
  useEffect(() => {
    (async () => {
      const apiResponse = await httpCall({
        url: `files/?assetType=${fileFilters.assetType}&filter=${fileFilters.filter}&folder=${fileFilters.folder}&limit=${pagination.limit}&offset=${pagination.offset}&sort=${fileFilters.sort}`
      });
      if (apiResponse.items) {
        setFiles(apiResponse);
        setPagination({ ...pagination, limit: apiResponse.limit, offset: apiResponse.offset, totalPages: Math.floor(apiResponse.totalResult / apiResponse.limit) })
      }
    })();

  }, [counter, fileFilters, pagination]);

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

  const filesDelete = () => {
    httpCall({
      method: 'post',
      url: '/files/deleteFile',
      data: {
        deletePaths: selectedFiles
      },
      showNotification: true,
      onSuccess,
      onError,
    });
  };

  const selectFile = (event, path) => {
    const isAlreadyAdded = selectedFiles.includes(path);
    !isAlreadyAdded && setSelectedFiles([...selectedFiles, path]);

    if (isAlreadyAdded) {
      selectedFiles.splice(selectedFiles.indexOf(path), 1);
      // I spent almost 2 hours learning about my basic mistake with the array concept.
      setSelectedFiles([...selectedFiles]);
    }

  }

  const selectFiles = (e) => {
    const checked = e.target.checked;
    checked ? setSelectedFiles([...files.items.map(file => file.path)]) :
      setSelectedFiles([]);
    setAllFilesSelected(!allFilesSelected);
  }

  const searchFiles = debounce((e) => {
    const searchText = e.target.value;
    updateFilters({ ...fileFilters, filter: searchText });
  }, 3000);

  const tableData = data => {
    return (
      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={data.path}>
        <Table.Cell className='!p-4'>
          <Checkbox name={data.name}
            checked={selectedFiles.includes(data.path)}
            onChange={(e) => selectFile(e, data.path)}
          />
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
        <div className='flex justify-between gap-4'>
          <div className='flex gap-4'>
            <Button type='button' disabled={!allFilesSelected}>Download Files</Button>
            <Button type='button' disabled={!allFilesSelected} onClick={filesDelete}>Delete Files</Button>
          </div>
          <div className='flex gap-4'>
            <TextInput id="large" type="text" sizing="md" placeholder="Search by name..." onInput={searchFiles} icon={MagnifyingGlassIcon} />
            <Dropdown label="Sort by">
              <Dropdown.Item>
                Name
              </Dropdown.Item>
              <Dropdown.Item>
                Size
              </Dropdown.Item>
              <Dropdown.Item>
                Date
              </Dropdown.Item>
            </Dropdown>
            <Button type='button'>Search Now</Button>
          </div>
        </div>
        <div className="flex gap-4">
          <Dropdown label="Asset Type">
            <Dropdown.Item>
              All
            </Dropdown.Item>
            <Dropdown.Item>
              File
            </Dropdown.Item>
            <Dropdown.Item>
              Folder
            </Dropdown.Item>
          </Dropdown>

          <Dropdown label="Folder">
            <Dropdown.Item>
              thirdPartyFile
            </Dropdown.Item>
            <Dropdown.Item>
              bulkImport
            </Dropdown.Item>
            <Dropdown.Item>
              collectionImage
            </Dropdown.Item>
            <Dropdown.Item>
              crashReport
            </Dropdown.Item>
            <Dropdown.Item>
              general
            </Dropdown.Item>
            <Dropdown.Item>
              manualCollectionImage
            </Dropdown.Item>
            <Dropdown.Item>
              manualProductImage
            </Dropdown.Item>
            <Dropdown.Item>
              productImage
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Card>
      {
        files.items && <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell className='!p-4'>
              <Checkbox name="selectAll" onChange={selectFiles} />
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
              Actions
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {files.items.map(item => tableData(item))}
          </Table.Body>
        </Table>
      }
      <div className="flex items-center justify-center text-center mt-4 h-20">
        <Pagination
          currentPage={pagination.currentPage}
          layout="pagination"
          onPageChange={paginationHandler}
          showIcons={true}
          totalPages={pagination.totalPages}
          previousLabel="Previous"
          nextLabel="Next"
        />
      </div>
    </React.Fragment >
  )
}
