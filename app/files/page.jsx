'use client';
import React, { useEffect, useState } from 'react';
import { useToasts } from '../components/toast';
import { useSearchParams } from 'next/navigation';
import { Card, Table, Checkbox, Dropdown, Pagination, Modal, TextInput, Button } from 'flowbite-react';
import { debounce, formatBytes, formatDate } from '../utils';
import { ArrowDownTrayIcon, TrashIcon, MagnifyingGlassIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import httpCall, { fileDownload } from '../utils/httpCall';
import { useRouter } from 'next/navigation';

export default function Files() {

  const router = useRouter();
  const [files, setFiles] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const currentPageNo = Number(useSearchParams().get('page')) || 1;
  const [allFilesSelected, setAllFilesSelected] = useState(false);
  const [showModal, setModalView] = useState(false);
  const [fileFilters, updateFilters] = useState({ assetType: 'file', filter: '', folder: 'general', sortBy: 'name:asc' });
  const [pagination, setPagination] = useState({ limit: 10, totalPages: 1 });
  const toast = useToasts();
  const [counter, setCounter] = useState(0);

  const newOffset = (currentPageNo - 1) * pagination.limit;

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

  const paginationHandler = (pageNo) => {
    router.push(`/files?page=${pageNo}`);
  }

  // Refreshing table data based on filters
  useEffect(() => {
    (async () => {
      const apiResponse = await httpCall({
        url: `files/?assetType=${fileFilters.assetType}&filter=${fileFilters.filter}&folder=${fileFilters.folder}&limit=${pagination.limit}&offset=${newOffset}&sort=${fileFilters.sortBy}`
      });
      if (apiResponse.items) {
        setFiles(apiResponse);
        setPagination({ ...pagination, totalPages: Math.floor(apiResponse.totalResults / apiResponse.limit) })
      }
    })();

  }, [counter, fileFilters, currentPageNo]);

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
      url: '/files/deleteFiles',
      data: {
        deletePaths: selectedFiles
      },
      showNotification: true,
      onSuccess,
      onError,
    });
  };

  const filesDownload = () => {
    selectedFiles.map(file => fileDownload(file))
  };

  const selectFile = (event, path) => {
    const isAlreadyAdded = selectedFiles.includes(path);
    !isAlreadyAdded && setSelectedFiles([...selectedFiles, path]);

    if (isAlreadyAdded) {
      selectedFiles.splice(selectedFiles.indexOf(path), 1);
      // I spent almost 2 hours to know about my basic mistake with the array concept.
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
    router.push(`/files`);
  }, 3000);


  const filterResults = (filterType, filterText) => {
    updateFilters({ ...fileFilters, [filterType]: filterText });
  }

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
          <ArrowDownTrayIcon className="h-6 w-6 cursor-pointer" onClick={() => fileDownload(data.path)} />
          <TrashIcon className="h-6 w-6 cursor-pointer" onClick={() => fileDelete(data.path)} />
        </Table.Cell>
      </Table.Row>

    )
  }

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        size="md"
        popup={true}
        onClose={() => setModalView(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete files?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={filesDelete}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setModalView(false)} >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Card className='mb-4'>
        <div className='flex justify-between gap-4'>
          <div className='flex gap-4'>
            <Button type='button' disabled={!allFilesSelected} onClick={filesDownload}>Download Files</Button>
            <Button type='button' disabled={!allFilesSelected} onClick={() => setModalView(true)}>Delete Files</Button>
          </div>
          <div className='flex gap-4'>
            <TextInput id="large" type="text" sizing="md" placeholder="Search by name..." onInput={searchFiles} icon={MagnifyingGlassIcon} />
            <Dropdown label="Sort by">
              <Dropdown.Item onClick={() => filterResults('sortBy', 'name:asc')}>
                Name
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filterResults('sortBy', 'size:asc')}>
                Size
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filterResults('sortBy', 'lastModified:asc')}>
                Date
              </Dropdown.Item>
            </Dropdown>
            <Button type='button'>Search Now</Button>
          </div>
        </div>
        <div className="flex gap-4">
          <Dropdown label="Asset Type">
            <Dropdown.Item onClick={() => filterResults('assetType', 'all')}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterResults('assetType', 'file')}>
              File
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterResults('assetType', 'folder')}>
              Folder
            </Dropdown.Item>
          </Dropdown>
          <Dropdown label="Folder">
            <Dropdown.Item onClick={() => filterResults('folder', 'thirdparty')}>
              Third-party
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterResults('folder', 'general')}>
              General
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterResults('folder', 'import')}>
              Import
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterResults('folder', 'export')}>
              Export
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterResults('folder', 'collections')}>
              Collections
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterResults('folder', 'crashreports')}>
              Crash Reports
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterResults('folder', 'static')}>
              Static
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filterResults('folder', 'products')}>
              Products
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
          currentPage={currentPageNo}
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
