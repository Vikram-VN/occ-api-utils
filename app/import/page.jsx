"use client";
import { Button, Card, Checkbox, Modal, Select, Spinner } from "flowbite-react";
import React, { useCallback, useEffect, useState } from "react";
import adminApi, { adminFileDownload } from "../utils/api";
import { CloudArrowDownIcon, CloudArrowUpIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import { useToasts } from "../store/hooks";
import FileUpload from "./file";

export default function Import() {

  const toast = useToasts();
  const [importList, setImportList] = useState({});
  const [multiImportList, setMultiImportList] = useState({});
  const [importItems, setImportItems] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const [showFileUploadModal, setFileUploadModal] = useState(false);
  const [bundleImport, setBundleImport] = useState({});

  useEffect(() => {
    (async () => {

      const response = await adminApi({
        url: `importOperations`
      });
      if (response.items) {
        toast.show({
          status: "success",
          message: "Import results fetched successfully"
        });
        setImportList(response);
      } else {
        toast.show({
          status: "failure",
          message: response.message || "Something went wrong while fetching import results"
        });
        setImportList({});
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const importItemsHandler = useCallback((isSelected, id) => {
    if (isSelected) {
      setImportItems([...importItems, id]);
    } else {
      const itemIdex = importItems.indexOf(id);
      itemIdex >= 0 && importItems.splice(itemIdex, 1);
      setImportItems([...importItems]);
    }
  }, [importItems]);

  // Running process check for import items
  useEffect(() => {
    const importStatusCheck = async (id, processId) => {
      const response = await adminApi({
        url: `importProcess/${processId}`,
        method: "get"
      });
      if (response.completed) {
        response.links[1].rel === "failedRecordsFile" &&
          setMultiImportList({ ...multiImportList, [id]: { ...multiImportList[id], downloadLink: response.links[1].href, processId: "" } });
      }
    }

    const importStatus = Object.keys(multiImportList)
      .map(key => multiImportList[key].processId).length > 0
      && setInterval(() => {
        Object.keys(multiImportList)
          .forEach(async key => {
            const token = multiImportList[key].processId;
            if (token) {
              importStatusCheck(key, token);
            }
          })
      }, (1000 * 10));
    return () => clearInterval(importStatus);
  }, [multiImportList]);


  // Bundle import 
  useEffect(() => {
    const importStatusCheck = async (processId) => {
      const response = await adminApi({
        url: `importProcess/${processId}`,
        method: "get"
      });
      if (response.completed) {
        response.links[1].rel === "failedRecordsFile" &&
          setBundleImport({ ...bundleImport, downloadLink: response.links[1].href, processId: "" });
      }
    }

    const importStatus = bundleImport.processId
      && setInterval(() => {
        const token = bundleImport.processId;
        importStatusCheck(token);
      }
        , (1000 * 10));
    return () => clearInterval(importStatus);
  }, [bundleImport]);


  // Stopping import process
  const stopProcess = useCallback(async (processId, id = "") => {
    const response = await adminApi({
      url: `importProcess/${processId}/abort`,
      method: "post"
    });
    if (response.success === true) {
      toast.show({
        status: "success",
        message: "Import process stopped successfully"
      });

      id ? setMultiImportList({ ...multiImportList, [id]: { ...multiImportList[id], processId: "" } }) :
        setBundleImport({ ...bundleImport, processId: "" });

    } else {
      toast.show({
        status: "failure",
        message: response.message || "Something went wrong while trying to stop import"
      });
    }
  }, [bundleImport, multiImportList, toast]);

  // Single import 
  const importHandler = useCallback(async (fileData) => {
    setMultiImportList({ ...multiImportList, [currentItem]: { ...multiImportList[currentItem], downloadLink: "" } });
    const response = await adminApi({
      url: `importProcess`,
      method: "post",
      data: {
        id: currentItem,
        mode: "standalone",
        fileName: fileData.source,
        format: multiImportList[currentItem]?.format,
      }
    });
    if (response.processId) {
      toast.show({
        status: "success",
        message: "Import process started"
      });
      setMultiImportList({ ...multiImportList, [currentItem]: { ...multiImportList[currentItem], processId: response.processId } });
    } else {
      toast.show({
        status: "failure",
        message: response.message || "Something went wrong while fetching import process status"
      });
    }
  }, [currentItem, multiImportList, toast]);

  // Function to handle multi import
  const bulkImportHandler = useCallback(async (fileData) => {
    setBundleImport({ ...bundleImport, downloadLink: "" });
    const response = await adminApi({
      url: `importProcess`,
      method: "post",
      data: {
        mode: "bundle",
        fileName: fileData.source,
        items: importItems.map(item => {
          return {
            id: item,
            format: multiImportList[item].format,
          }
        })
      }
    });
    if (response.processId) {
      toast.show({
        status: "success",
        message: "Import process started"
      });
      setBundleImport({ ...bundleImport, processId: response.processId });
    } else {
      toast.show({
        status: "failure",
        message: response.message || "Something went wrong while fetching import process status"
      });
    }
  }, [bundleImport, importItems, multiImportList, toast]);


  const onUploadSuccess = useCallback((res) => {
    // Calling callback function to handle the process
    const fileData = res.data.result.fileResults[0];
    importItems.length > 1 ? bulkImportHandler(fileData) : importHandler(fileData);

    toast.show({
      status: "success",
      message: "File uploaded successfully.."
    });
  }, [bulkImportHandler, importHandler, importItems, toast]);

  // Used to show notifications
  const onError = useCallback((error) => {
    toast.show({
      status: "failure",
      message: error.message
    });

  }, [toast]);

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
    setFileUploadModal(false);
  }, [onError, onUploadSuccess]);


  return (
    <React.Fragment>
      <Modal
        show={showFileUploadModal}
        size="md"
        popup={true}
        onClose={() => setFileUploadModal(false)}
      >
        <Modal.Header>File Upload</Modal.Header>
        <Modal.Body>
          <FileUpload handleChange={fileUploadHandler} />
        </Modal.Body>
      </Modal>
      <Card className="mb-4">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 items-center">
          <div className="block">
            <h1 className="mb-2 text-4xl text-justify bold ">Import Process</h1>
            <p>Import to server.</p>
          </div>
          <div className="block w-full">
            <div className="flex gap-4 items-center justify-end">
              {bundleImport?.processId && <StopCircleIcon title="Stop import" className="w-8 h-8 cursor-pointer" onClick={() => stopProcess(bundleImport?.processId)} />}
              {bundleImport?.processId && <Spinner title="Bulk import is started" />}
              {bundleImport?.downloadLink && <CloudArrowDownIcon title="Download import status file" className="w-8 h-8 cursor-pointer" onClick={() => adminFileDownload(bundleImport?.downloadLink)} />}
            </div>
            <Button type="button"
              className="w-full mt-4"
              disabled={!(importItems.length > 1)}
              onClick={() => {
                setFileUploadModal(true);
              }}
            >
              Import Items
            </Button>
          </div>
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {
          importList.items && importList.items.map(item => {
            return (
              item.formats.length > 0 && <Card className="mb-4 gap-2" key={item.typeName}>
                <div className="flex gap-2 items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <Checkbox name={item.typeName} className="inline"
                      disabled={(item.formats.length > 0 && !multiImportList[item.id]?.format)}
                      onClick={(ev) => importItemsHandler(ev.target.checked, item.id)}
                    />
                    <h1 className="text-bold text-2xl">{item.typeName}</h1>
                  </div>
                  <div className="flex gap-4 items-center">
                    {multiImportList[item.id]?.processId && <StopCircleIcon title="Stop import" className="w-8 h-8 cursor-pointer" onClick={() => stopProcess(multiImportList[item.id]?.processId, item.id)} />}
                    {multiImportList[item.id]?.processId && <Spinner title="Import is started" />}
                    {multiImportList[item.id]?.downloadLink && <CloudArrowDownIcon title="Download import status file" className="w-8 h-8 cursor-pointer" onClick={() => adminFileDownload(multiImportList[item.id]?.downloadLink)} />}
                  </div>
                </div>
                <div className="grid md:grid-flow-col gap-4">
                  {
                    item.formats.length > 0 && <Select className="mb-4"
                      disabled={multiImportList[item.id]?.processId}
                      defaultValue={"none"}
                      onChange={(e) => setMultiImportList({ ...multiImportList, [item.id]: { id: item.id, format: e.target.value } })}
                    >
                      <option value="none" disabled>Select Format</option>
                      {item.formats.map(format => <option value={format} key={format}>{format.toUpperCase()}</option>)}
                    </Select>
                  }
                  <Button type="button" onClick={() => {
                    setFileUploadModal(true);
                    setCurrentItem(item.id);
                  }}
                    disabled={(item.formats.length > 0 && !multiImportList[item.id]?.format) || multiImportList[item.id]?.processId}>
                    <CloudArrowUpIcon className="w-6 h-6 mr-2 cursor-pointer" />Import
                  </Button>
                </div>
              </Card>
            )
          })
        }
      </div>
    </React.Fragment>
  )
}
