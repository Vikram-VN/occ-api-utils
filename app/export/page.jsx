"use client";
import { Button, Card, Checkbox, Label, Select, Spinner, TextInput } from "flowbite-react";
import React, { useCallback, useEffect, useState } from "react";
import adminApi, { adminFileDownload } from "../utils/api";
import { CloudArrowDownIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import { useToasts } from "../store/hooks";

export default function Export() {

  const toast = useToasts();
  const [exportList, setExportList] = useState({});
  const [multiExportList, setMultiExportList] = useState({});
  const [exportItems, setExportItems] = useState([]);
  const [bundleExport, setBundleExport] = useState({});

  useEffect(() => {
    (async () => {

      const response = await adminApi({
        url: `exportOperations`
      });
      if (response.items) {
        toast.show({
          status: "success",
          message: "Export results fetched successfully"
        });
        setExportList(response);
      } else {
        toast.show({
          status: "failure",
          message: response.message || "Something went wrong while fetching export results"
        });
        setExportList({});
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportItemsHandler = useCallback((isSelected, id) => {
    if (isSelected) {
      setExportItems([...exportItems, id]);
    } else {
      const itemIdex = exportItems.indexOf(id);
      itemIdex >= 0 && exportItems.splice(itemIdex, 1);
      setExportItems([...exportItems]);
    }
  }, [exportItems]);

  // Running process check for export items
  useEffect(() => {
    const exportStatusCheck = async (id, processId) => {
      const response = await adminApi({
        url: `exportProcess/${processId}`,
        method: "get"
      });
      if (response.completed) {
        response.links[1].rel === "file" &&
          setMultiExportList({ ...multiExportList, [id]: { ...multiExportList[id], downloadLink: response.links[1].href, processId: "" } });
      }
    }

    const exportStatus = Object.keys(multiExportList)
      .map(key => multiExportList[key].processId).length > 0
      && setInterval(() => {
        Object.keys(multiExportList)
          .forEach(async key => {
            const token = multiExportList[key].processId;
            if (token) {
              exportStatusCheck(key, token);
            }
          })
      }, (1000 * 10));
    return () => clearInterval(exportStatus);
  }, [multiExportList]);


  // Bundle export 
  useEffect(() => {
    const exportStatusCheck = async (processId) => {
      const response = await adminApi({
        url: `exportProcess/${processId}`,
        method: "get"
      });
      if (response.completed) {
        response.links[1].rel === "file" &&
          setBundleExport({ ...bundleExport, downloadLink: response.links[1].href, processId: "" });
      }
    }

    const exportStatus = bundleExport.processId
      && setInterval(() => {
        const token = bundleExport.processId;
        exportStatusCheck(token);
      }
        , (1000 * 10));
    return () => clearInterval(exportStatus);
  }, [bundleExport]);


  // Stopping export process
  const stopProcess = useCallback(async (processId, id = "") => {
    const response = await adminApi({
      url: `exportProcess/${processId}/abort`,
      method: "post"
    });
    if (response.success === true) {
      toast.show({
        status: "success",
        message: "Export process stopped successfully"
      });

      id ? setMultiExportList({ ...multiExportList, [id]: { ...multiExportList[id], processId: "" } }) :
        setBundleExport({ ...bundleExport, processId: "" });

    } else {
      toast.show({
        status: "failure",
        message: response.message || "Something went wrong while trying to stop export"
      });
    }
  }, [bundleExport, multiExportList, toast]);

  const exportHandler = useCallback(async id => {
    setMultiExportList({ ...multiExportList, [id]: { ...multiExportList[id], downloadLink: "" } });
    const response = await adminApi({
      url: `exportProcess`,
      method: "post",
      data: {
        id,
        mode: "standalone",
        fileName: `export${id}.${multiExportList[id]?.format.toLowerCase()}`,
        format: multiExportList[id]?.format,
        params: {
          q: multiExportList[id]?.query,
          headersList: multiExportList[id]?.headersList || "All"
        }
      }
    });
    if (response.processId) {
      toast.show({
        status: "success",
        message: "Export process started"
      });
      setMultiExportList({ ...multiExportList, [id]: { ...multiExportList[id], processId: response.processId } });
    } else {
      toast.show({
        status: "failure",
        message: response.message || "Something went wrong while fetching export process status"
      });
    }
  }, [multiExportList, toast]);

  const bulkExportHandler = useCallback(async () => {
    setBundleExport({ ...bundleExport, downloadLink: "" });
    const currentUTCDateTime = new Date().toISOString();
    const response = await adminApi({
      url: `exportProcess`,
      method: "post",
      data: {
        mode: "bundle",
        fileName: `exportItems_${currentUTCDateTime}.zip`,
        items: exportItems.map(item => {
          return {
            id: item,
            format: multiExportList[item].format,
            params: {
              q: multiExportList[item]?.query,
              headersList: multiExportList[item]?.headersList || "All"
            }
          }
        })
      }
    });
    if (response.processId) {
      toast.show({
        status: "success",
        message: "Export process started"
      });
      setBundleExport({ ...bundleExport, processId: response.processId });
    } else {
      toast.show({
        status: "failure",
        message: response.message || "Something went wrong while fetching export process status"
      });
    }
  }, [bundleExport, exportItems, multiExportList, toast]);

  return (
    <React.Fragment>
      <Card className="mb-4">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 items-center">
          <div className="block">
            <h1 className="mb-2 text-4xl text-justify bold ">Export</h1>
            <p>Export items from the server.</p>
          </div>
          <div className="block w-full">
            <div className="flex gap-4 items-center justify-end">
              {bundleExport?.processId && <StopCircleIcon title="Stop export" className="w-8 h-8 cursor-pointer" onClick={() => stopProcess(bundleExport?.processId)} />}
              {bundleExport?.processId && <Spinner title="Bulk export is started" />}
              {bundleExport?.downloadLink && <CloudArrowDownIcon title="Download exported file" className="w-8 h-8 cursor-pointer" onClick={() => adminFileDownload(bundleExport?.downloadLink)} />}
            </div>
            <Button type="button"
              className="w-full mt-4"
              disabled={!(exportItems.length > 1)}
              onClick={bulkExportHandler}
            >
              Export Items
            </Button>
          </div>
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {
          exportList.items && exportList.items.map(item => {
            return (
              item.formats.length > 0 && <Card className="mb-4 gap-2" key={item.typeName}>
                <div className="flex gap-2 items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <Checkbox name={item.typeName} className="inline"
                      disabled={(item.formats.length > 0 && !multiExportList[item.id]?.format)}
                      onClick={(ev) => exportItemsHandler(ev.target.checked, item.id)}
                    />
                    <h1 className="text-bold text-2xl">{item.typeName}</h1>
                  </div>
                  <div className="flex gap-4 items-center">
                    {multiExportList[item.id]?.processId && <StopCircleIcon title="Stop export" className="w-8 h-8 cursor-pointer" onClick={() => stopProcess(multiExportList[item.id]?.processId, item.id)} />}
                    {multiExportList[item.id]?.processId && <Spinner title="Export is started" />}
                    {multiExportList[item.id]?.downloadLink && <CloudArrowDownIcon title="Download exported file" className="w-8 h-8 cursor-pointer" onClick={() => adminFileDownload(multiExportList[item.id]?.downloadLink)} />}
                  </div>
                </div>
                <div className="grid md:grid-flow-col gap-4">
                  {
                    item.formats.length > 0 && <Select className="mb-4"
                      disabled={multiExportList[item.id]?.processId}
                      defaultValue={"none"}
                      onChange={(e) => setMultiExportList({ ...multiExportList, [item.id]: { id: item.id, format: e.target.value } })}
                    >
                      <option value="none" disabled>Select Format</option>
                      {item.formats.map(format => <option value={format} key={format}>{format.toUpperCase()}</option>)}
                    </Select>
                  }
                  <Button type="button" onClick={() => exportHandler(item.id)} disabled={(item.formats.length > 0 && !multiExportList[item.id]?.format) || multiExportList[item.id]?.processId}>{`Export ${item.id}`}</Button>
                </div>
                <div className="w-full m-auto">
                  <div className="mb-2 block">
                    <Label
                      value="Query Filter (Optional)"
                    />
                  </div>
                  <TextInput type="text"
                    placeholder="Ex: email ne null and active eq true"
                    name="query"
                    onInput={(e) => setMultiExportList({ ...multiExportList, [item.id]: { ...multiExportList[item.id], query: e.target.value } })}
                  />
                </div>
                <div className="w-full m-auto">
                  <div className="mb-2 block">
                    <Label
                      value="Headers List (Optional)"
                    />
                  </div>
                  <TextInput type="text"
                    name="headersList"
                    placeholder="Ex: id,name,email,active,members,shippingAddress,BillingAddress"
                    onInput={(e) => setMultiExportList({ ...multiExportList, [item.id]: { ...multiExportList[item.id], headersList: e.target.value } })}
                  />
                </div>
              </Card>
            )
          })
        }
      </div>
    </React.Fragment>
  )
}
