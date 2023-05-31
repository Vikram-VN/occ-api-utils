"use client";
import React, { useEffect, useState } from "react";
import { useToasts } from "../store/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, Table, Checkbox, Pagination, Modal, TextInput, Button, Select } from "flowbite-react";
import { debounce, formatBytes, formatDate } from "../utils";
import FileUpload from "../components/file";
import { ArrowDownTrayIcon, TrashIcon, MagnifyingGlassIcon, ExclamationCircleIcon, FunnelIcon } from "@heroicons/react/24/solid";
import adminApi, { fileDownload } from "../utils/api";
import { useCallback } from "react";

export default function Files() {

  const router = useRouter();
  const [files, setFiles] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const currentPageNo = Number(useSearchParams().get("page")) || 1;
  const [allFilesSelected, setAllFilesSelected] = useState(false);
  const [showFileUploadModal, setFileUploadModal] = useState(false);
  const [showModal, setModalView] = useState(false);
  const [fileFilters, updateFilters] = useState({ assetType: "file", filter: "", folder: "general", sortBy: "name:asc" });
  const [pagination, setPagination] = useState({ limit: 10, totalPages: 1 });
  const toast = useToasts();

  const newOffset = (currentPageNo - 1) * pagination.limit;

  const onSuccess = useCallback((res) => {
    toast.show({
      status: "success",
      message: "Files deleted successfully.."
    });
  }, [toast]);

  const onUploadSuccess = useCallback((res) => {
    toast.show({
      status: "success",
      message: "File uploaded successfully.."
    });
  }, [toast])


  // Used to show notifications
  const onError = useCallback((error) => {
    toast.show({
      status: "failure",
      message: error.message
    });

  }, [toast]);

  const paginationHandler = (pageNo) => {
    router.push(`files?page=${pageNo}`);
  }

  // Refreshing table data based on filters
  const fetchFiles = debounce(async () => {
    const apiResponse = await adminApi({
      url: `files/?assetType=${fileFilters.assetType}&filter=${fileFilters.filter}&folder=${fileFilters.folder}&limit=${pagination.limit}&offset=${newOffset}&sort=${fileFilters.sortBy}`
    });
    if (apiResponse.items) {
      setFiles(apiResponse);
      setPagination({ ...pagination, totalPages: Math.ceil(apiResponse.totalResults / apiResponse.limit) })
    } else {
      toast.show({
        status: "failure",
        message: apiResponse.message || "Something went wrong while fetching results"
      });
      setFiles({});
    }
  }, 2000);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchFiles(), []);

  const fileDelete = useCallback(async (filePath) => {
    adminApi({
      method: "post",
      url: "files/deleteFile",
      data: {
        filename: filePath
      },
      showNotification: true,
      onSuccess,
      onError,
    });
    fetchFiles();
  }, [fetchFiles, onError, onSuccess]);

  const filesDelete = useCallback(() => {
    adminApi({
      method: "post",
      url: "files/deleteFiles",
      data: {
        deletePaths: selectedFiles
      },
      showNotification: true,
      onSuccess,
      onError,
    });
    setModalView(false);
    fetchFiles();
  }, [fetchFiles, onError, onSuccess, selectedFiles]);

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
    checked && files.items ? setSelectedFiles([...files.items.map(file => file.path)]) :
      setSelectedFiles([]);
    setAllFilesSelected(!allFilesSelected);
  }

  // Triggering the search after 3 seconds # e|ev = event
  const searchFiles = debounce((e) => {
    const searchText = e.target.value;
    updateFilters({ ...fileFilters, filter: searchText });
    router.push(`/files`);
  }, 2000);


  const filterResults = (filterType, filterText) => {
    updateFilters({ ...fileFilters, [filterType]: filterText });
  }

  // File upload function
  const fileUploadHandler = useCallback((uploadType, file) => {
    const formData = new FormData();
    formData.append("filename", file.name);
    formData.append("uploadType", uploadType);
    formData.append("fileUpload", file);

    adminApi({
      method: "post",
      url: "files",
      data: formData,
      showNotification: true,
      onSuccess: onUploadSuccess,
      onError,
    });
    fetchFiles();
    setFileUploadModal(false);
  }, [fetchFiles, onError, onUploadSuccess])

  const tableData = data => {
    return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={data.path}>
        <Table.Cell className="!p-4">
          <Checkbox name={data.name}
            checked={selectedFiles.includes(data.path)}
            onChange={(e) => selectFile(e, data.path)}
          />
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {data.name}
        </Table.Cell>
        <Table.Cell>
          {formatBytes(data.size)}
        </Table.Cell>
        <Table.Cell>
          {formatDate(data.lastModified)}
        </Table.Cell>
        <Table.Cell>
          {data.type.toUpperCase()}
        </Table.Cell>
        <Table.Cell className="flex justify-around gap-4">
          <ArrowDownTrayIcon className="h-6 w-6 cursor-pointer" title="Download this file" onClick={() => fileDownload(data.path)} />
          <TrashIcon className="h-6 w-6 cursor-pointer" title="Delete this file" onClick={() => fileDelete(data.path)} />
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

      <Modal
        show={showFileUploadModal}
        size="md"
        popup={true}
        onClose={() => setFileUploadModal(false)}
      >
        <Modal.Header>Files Upload</Modal.Header>
        <Modal.Body>
          <FileUpload handleChange={fileUploadHandler} />
        </Modal.Body>
      </Modal>

      <Card className="mb-4">
        <div className="flex justify-end gap-4">
          <div className="flex gap-4">
            <TextInput id="large" type="text"
              sizing="md" placeholder="Search by name..."
              onInput={searchFiles} icon={MagnifyingGlassIcon}
              onKeyUp={fetchFiles}
            />
            <Select
              defaultValue="none"
              onClick={fetchFiles}
              onChange={(e) => filterResults("assetType", e.target.value)}
              className="w-min:w-10"
            >
              <option value="none" disabled>Select Asset Type</option>
              <option value="all">All</option>
              <option value="file">File</option>
              <option value="folder">Folder</option>
            </Select>
            <Select
              defaultValue="none"
              onClick={fetchFiles}
              onChange={(e) => filterResults("folder", e.target.value)} >
              <option value="none" disabled>Select Folder</option>
              <option value="thirdparty">Third-Party</option>
              <option value="general">General</option>
              <option value="import">Import</option>
              <option value="export">Export</option>
              <option value="collections">Collections</option>
              <option value="crashreports">Crash Reports</option>
              <option value="static">Static</option>
              <option value="products">Products</option>
            </Select>
          </div>
        </div>
        <div className="flex gap-4">
          <Button type="button" onClick={() => setFileUploadModal(true)}>Upload Files</Button>
          <Button type="button" disabled={!(selectedFiles.length > 1) && !allFilesSelected} onClick={filesDownload}>Download Files</Button>
          <Button type="button" disabled={!(selectedFiles.length > 1) && !allFilesSelected} onClick={() => setModalView(true)}>Delete Files</Button>
        </div>
      </Card>
      {
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell className="!p-4">
              <Checkbox name="selectAll" onChange={selectFiles} />
            </Table.HeadCell>
            <Table.HeadCell>
              File name <FunnelIcon className="w-8 h-8 inline pl-4 cursor-pointer" onClick={() => filterResults("sortBy", "name:desc")} />
            </Table.HeadCell>
            <Table.HeadCell>
              Size <FunnelIcon className="w-8 h-8 inline pl-4 cursor-pointer" onClick={() => filterResults("sortBy", "size:desc")} />
            </Table.HeadCell>
            <Table.HeadCell>
              Last Modified <FunnelIcon className="w-8 h-8 inline pl-4 cursor-pointer" onClick={() => filterResults("sortBy", "lastModified:desc")} />
            </Table.HeadCell>
            <Table.HeadCell>
              Type
            </Table.HeadCell>
            <Table.HeadCell>
              Actions
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {(files.items && files.items.length) > 0 ? files.items.map(item => tableData(item)) :
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={"no-results"}>
                <Table.Cell colSpan={6} className="text-center">No Results Found.</Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>
      }
      <div className="flex items-center justify-center text-center mt-4 h-20">
        {pagination.totalPages > 1 && <Pagination
          currentPage={currentPageNo}
          layout="pagination"
          onPageChange={paginationHandler}
          showIcons={true}
          totalPages={pagination.totalPages}
          previousLabel="Back"
          nextLabel="Next"
        />}
      </div>
    </React.Fragment >
  )
}
