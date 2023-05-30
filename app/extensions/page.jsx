"use client";
import React, { useEffect, useState } from "react";
import { useToasts } from "../store/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, Table, Checkbox, Pagination, Modal, Button } from "flowbite-react";
import { debounce, formatDate } from "../utils";
import FileUpload from "./file";
import { ArrowDownTrayIcon, TrashIcon, ExclamationCircleIcon, PauseCircleIcon, PlayCircleIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import adminApi, { fileDownload } from "../utils/api";
import { useCallback } from "react";

export default function Extensions() {

  const router = useRouter();
  const [extensions, setExtensions] = useState({});
  const [selectedExtensions, setSelectedExtensions] = useState([]);
  const currentPageNo = Number(useSearchParams().get("page")) || 1;
  const [allExtensionsSelected, setAllExtensionsSelected] = useState(false);
  const [showFileUploadModal, setFileUploadModal] = useState(false);
  const [showModal, setModalView] = useState(false);
  const [pagination, setPagination] = useState({ limit: 10, totalPages: 1 });
  const toast = useToasts();

  const newOffset = (currentPageNo - 1) * pagination.limit;

  const onSuccess = useCallback((res) => {
    toast.show({
      status: "success",
      message: "Extension deleted successfully.."
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

  const onDisable = useCallback((res) => {
    toast.show({
      status: "success",
      message: "Extension disable successfully.."
    });
  }, [toast]);


  const onEnable = useCallback((res) => {
    toast.show({
      status: "success",
      message: "Extension enabled successfully.."
    });
  }, [toast]);


  const paginationHandler = (pageNo) => {
    router.push(`/extensions?page=${pageNo}`);
  }

  // Refreshing table data based on filters
  const fetchExtensions = debounce(async () => {
    const apiResponse = await adminApi({
      url: `extensions`
    });
    if (apiResponse.items) {
      setExtensions(apiResponse);
      setPagination({ ...pagination, totalPages: Math.floor(apiResponse.items.length / apiResponse.limit) })
    } else {
      toast.show({
        status: "failure",
        message: apiResponse.message || "Something went wrong while fetching results"
      });
      setExtensions({});
    }
  }, 2000);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchExtensions(), []);

  const fileDelete = useCallback(async (id) => {
    adminApi({
      method: "delete",
      url: `extensions/${id}`,
      showNotification: true,
      onSuccess,
      onError,
    });
    fetchExtensions();
  }, [fetchExtensions, onError, onSuccess]);

  const extensionsDelete = useCallback((idsList = []) => {
    idsList.map(id => {
      adminApi({
        method: "post",
        url: `extensions/${id}`,
        showNotification: true,
        onSuccess,
        onError,
      });
    });
    setModalView(false);
    fetchExtensions();
  }, [fetchExtensions, onError, onSuccess]);

  const ExtensionsDownload = () => {
    selectedExtensions.map(file => fileDownload(file))
  };

  const selectFile = (event, path) => {
    const isAlreadyAdded = selectedExtensions.includes(path);
    !isAlreadyAdded && setSelectedExtensions([...selectedExtensions, path]);

    if (isAlreadyAdded) {
      selectedExtensions.splice(selectedExtensions.indexOf(path), 1);
      // I spent almost 2 hours to know about my basic mistake with the array concept.
      setSelectedExtensions([...selectedExtensions]);
    }

  }

  const selectExtensions = (e) => {
    const checked = e.target.checked;
    checked && extensions.items ? setSelectedExtensions([...extensions.items.map(file => file.path)]) :
      setSelectedExtensions([]);
    setAllExtensionsSelected(!allExtensionsSelected);
  }

  // File upload function
  const fileUploadHandler = useCallback((uploadType, file) => {
    const formData = new FormData();
    formData.append("filename", file.name);
    formData.append("uploadType", uploadType);
    formData.append("fileUpload", file);

    adminApi({
      method: "post",
      url: `serverExtensions`,
      showNotification: true,
      onSuccess: onUploadSuccess,
      onError,
    });
    fetchExtensions();
    setFileUploadModal(false);
  }, [fetchExtensions, onError, onUploadSuccess]);

  const manageExtensions = (id, type) => {
    adminApi({
      method: "post",
      url: `extensions/${id}`,
      data: {
        "op": type ? "deactivate" : "activate"
      },
      showNotification: true,
      onSuccess: type ? onDisable : onEnable,
      onError,
    });
    fetchExtensions();
  }

  const tableData = data => {
    return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={data.id}>
        <Table.Cell className="!p-4">
          <Checkbox name={data.name}
            checked={selectedExtensions.includes(data.id)}
            onChange={(e) => selectFile(e, data.id)}
          />
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {data.name}
        </Table.Cell>
        <Table.Cell>
          {data.creator}
        </Table.Cell>
        <Table.Cell>
          {formatDate(data.creationTime)}
        </Table.Cell>
        <Table.Cell>
          {formatDate(data.modificationTime)}
        </Table.Cell>
        <Table.Cell className="flex justify-around gap-4">
          {data.enabled ?
            <StopCircleIcon className="h-6 w-6 cursor-pointer" title="Disable this extension" onClick={() => manageExtensions(data.id, true)} /> :
            <PlayCircleIcon className="h-6 w-6 cursor-pointer" title="Enable this extension" onClick={() => manageExtensions(data.id)} />
          }
          <ArrowDownTrayIcon className="h-6 w-6 cursor-pointer" title="Download this extension" onClick={() => fileDownload(`/${data.zipPath}`)} />
          <TrashIcon className="h-6 w-6 cursor-pointer" title="Delete this extension" onClick={() => fileDelete(data.id)} />
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
              Are you sure you want to delete extensions?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={extensionsDelete}>
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
        <Modal.Header>Extension Upload</Modal.Header>
        <Modal.Body>
          <FileUpload handleChange={fileUploadHandler} />
        </Modal.Body>
      </Modal>

      <Card className="mb-4">
        <h1 className="text-4xl">Extensions</h1>
        <div className="flex gap-4">
          <Button type="button" onClick={() => setFileUploadModal(true)}>Upload Extensions</Button>
          <Button type="button" disabled={!(selectedExtensions.length > 1) && !allExtensionsSelected} onClick={ExtensionsDownload}>Download Extensions</Button>
          <Button type="button" disabled={!(selectedExtensions.length > 1) && !allExtensionsSelected} onClick={() => setModalView(true)}>Delete Extensions</Button>
        </div>
      </Card>
      {
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell className="!p-4">
              <Checkbox name="selectAll" onChange={selectExtensions} />
            </Table.HeadCell>
            <Table.HeadCell>
              Name
            </Table.HeadCell>
            <Table.HeadCell>
              Creator
            </Table.HeadCell>
            <Table.HeadCell>
              Created Date
            </Table.HeadCell>
            <Table.HeadCell>
              Last Modified
            </Table.HeadCell>
            <Table.HeadCell>
              Actions
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {(extensions.items && extensions.items.length) > 0 ? extensions.items.map(item => tableData(item)) :
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
