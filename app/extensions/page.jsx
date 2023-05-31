"use client";
import React, { useEffect, useState } from "react";
import { useToasts } from "../store/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import DatePicker from "../components/date";
import { Card, Table, Checkbox, Pagination, Modal, Button, Dropdown, Select, TextInput } from "flowbite-react";
import { debounce, formatDate } from "../utils";
import FileUpload from "./file";
import { ArrowDownTrayIcon, TrashIcon, ExclamationCircleIcon, PauseCircleIcon, PlayCircleIcon, StopCircleIcon, ServerIcon, ArrowUpRightIcon, CloudArrowDownIcon } from "@heroicons/react/24/solid";
import adminApi, { adminApiCall, adminXApi, fileDownload } from "../utils/api";
import { useCallback } from "react";

export default function Extensions() {

  const router = useRouter();
  const [extensions, setExtensions] = useState({});
  const [selectedExtensions, setSelectedExtensions] = useState([]);
  const currentPageNo = Number(useSearchParams().get("page")) || 1;
  const [allExtensionsSelected, setAllExtensionsSelected] = useState(false);
  const [showFileUploadModal, setFileUploadModal] = useState(false);
  const [showLogsModal, setLogsModalView] = useState(false);
  const [logType, setLogType] = useState('info');
  const [showModal, setModalView] = useState(false);
  const [date, handleDateChange] = useState({
    startDate: new Date(),
    endDate: new Date()
  });
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

  const onAction = useCallback((res) => {
    toast.show({
      status: "success",
      message: "Action performed successfully.."
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
      setPagination({ ...pagination, totalPages: Math.ceil(apiResponse.items.length / apiResponse.limit) })
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

  const extensionsDelete = useCallback(() => {
    extensions.items.map(item => {
      adminApi({
        method: "post",
        url: `extensions/${item.id}`,
        showNotification: true,
        onSuccess,
        onError,
      });
    });
    setModalView(false);
    fetchExtensions();
  }, [extensions.items, fetchExtensions, onError, onSuccess]);

  const extensionsDownload = () => {
    selectedExtensions.map(file => fileDownload(`/${file}`));
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
    checked && extensions.items ? setSelectedExtensions([...extensions.items.map(file => file.zipPath)]) :
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
      data: formData,
      showNotification: true,
      onSuccess: onUploadSuccess,
      onError,
    });
    fetchExtensions();
    setFileUploadModal(false);
  }, [fetchExtensions, onError, onUploadSuccess]);

  const manageExtensions = useCallback((id, type) => {
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
  }, [fetchExtensions, onDisable, onEnable, onError]);

  const manageServer = useCallback(action => {
    adminXApi({
      method: "post",
      url: `servers/${action}`,
      data: {
        "environmentType": "live"
      },
      showNotification: true,
      onSuccess: onAction,
      onError,
    });
  }, [onAction, onError]);

  const downloadServerLogs = useCallback(async () => {
    try {
      const modifiedDate = date.startDate.replace(/-/gi, "");
      const logs = await adminApiCall({
        method: "get",
        url: `ccadminx/custom/v1/logs/?date=${modifiedDate}&environmentType=live&format=zip&loggingLevel=${logType}`,
        data: {
          "environmentType": "live"
        },
        onError,
      });
      const contentType = logs.headers["content-type"];
      const buffer = logs.data;
      const bytes = new Uint8Array(buffer.data);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([bytes], { type: contentType }));
      link.download = `serverLogs_${date.startDate}.zip`;
      link.click();
      link.remove();

    } catch (error) {
      console.error('While downloading server logs, error occurred. The error message is: ' + error);
    }

  }, [date.startDate, logType, onError]);


  const tableData = data => {
    return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={data.id}>
        <Table.Cell className="!p-4">
          <Checkbox name={data.name}
            checked={selectedExtensions.includes(data.zipPath)}
            onChange={(e) => selectFile(e, data.zipPath)}
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
        show={showLogsModal}
        size="md"
        popup={true}
        onClose={() => setLogsModalView(false)}
      >
        <Modal.Header>
          <h3 className="pl-4 mb-5 text-lg font-normal text-gray-500 dark:text-gray-200">
            Download the server logs
          </h3>
        </Modal.Header>
        <Modal.Body className="overflow-visible">
          <div className="flex justify-center md:justify-end gap-4 mb-10">
            <div className="flex flex-col gap-4 md:flex-row">
              <DatePicker handleValueChange={handleDateChange} value={date} />
              <Select
                defaultValue="none"
                onChange={(e) => setLogType(e.target.value)}
                className="w-min:w-10 w-full"
              >
                <option value="none" disabled>Log Level</option>
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </Select>
            </div>
          </div>
          <div className="text-center">
            <div className="flex justify-center gap-4">
              <Button onClick={downloadServerLogs}>
                Download
              </Button>
              <Button className="bg-gray-400 border-gray-900 hover:bg-gray-600 dark:bg-gray-700 border dark:border-gray-500 dark:hover:bg-gray-500" onClick={() => setLogsModalView(false)} >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

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
        <div className="flex gap-4 justify-between">
          <h1 className="text-4xl">Extensions</h1>
          <Dropdown
            label="Server Options">
            <Dropdown.Item icon={ServerIcon} onClick={() => manageServer('restart')}>
              Server Restart
            </Dropdown.Item>
            <Dropdown.Item icon={ArrowUpRightIcon} onClick={() => manageServer('push')}>
              Server Push
            </Dropdown.Item>
            <Dropdown.Item icon={CloudArrowDownIcon} onClick={() => setLogsModalView(true)}>
              Server Logs
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex gap-4">
          <Button type="button" onClick={() => setFileUploadModal(true)}>Upload Extensions</Button>
          <Button type="button" disabled={!(selectedExtensions.length > 1) && !allExtensionsSelected} onClick={extensionsDownload}>Download Extensions</Button>
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
            {(extensions.items && extensions.items.length) > 0 ? extensions.items.slice(newOffset, (newOffset + pagination.limit)).map(item => tableData(item)) :
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
