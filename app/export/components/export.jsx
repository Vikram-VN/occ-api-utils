"use client";
import React, { useCallback, useEffect, useState } from "react";
import adminApi from "@/utils/api";
import { useToasts } from "@/store/hooks";
import ExportData from "@/export/components/exportData";

export default function Export() {
  const toast = useToasts();
  const [exportList, setExportList] = useState({});
  const [multiExportList, setMultiExportList] = useState({});
  const [exportItems, setExportItems] = useState([]);
  const [bundleExport, setBundleExport] = useState({});

  useEffect(() => {
    (async () => {
      const response = await adminApi({
        url: `exportOperations`,
      });
      if (response.items) {
        toast.show({
          status: "success",
          message: "Export results fetched successfully",
        });
        setExportList(response);
      } else {
        toast.show({
          status: "failure",
          message:
            response.message ||
            "Something went wrong while fetching export results",
        });
        setExportList({});
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportItemsHandler = useCallback(
    (isSelected, id) => {
      if (isSelected) {
        setExportItems([...exportItems, id]);
      } else {
        const itemIdex = exportItems.indexOf(id);
        itemIdex >= 0 && exportItems.splice(itemIdex, 1);
        setExportItems([...exportItems]);
      }
    },
    [exportItems],
  );

  // Running process check for export items
  useEffect(() => {
    const exportStatusCheck = async (id, processId) => {
      const response = await adminApi({
        url: `exportProcess/${processId}`,
        method: "get",
      });
      if (response.completed) {
        response.links[1].rel === "file" &&
          setMultiExportList({
            ...multiExportList,
            [id]: {
              ...multiExportList[id],
              reportLink: response.links[0].href,
              downloadLink: response.links[1].href,
              processId: "",
            },
          });
      }
    };

    const exportStatus =
      Object.keys(multiExportList).map((key) => multiExportList[key].processId)
        .length > 0 &&
      setInterval(() => {
        Object.keys(multiExportList).forEach(async (key) => {
          const token = multiExportList[key].processId;
          if (token) {
            exportStatusCheck(key, token);
          }
        });
      }, 1000 * 10);
    return () => clearInterval(exportStatus);
  }, [multiExportList]);

  // Bundle export
  useEffect(() => {
    const exportStatusCheck = async (processId) => {
      const response = await adminApi({
        url: `exportProcess/${processId}`,
        method: "get",
      });
      if (response.completed) {
        response.links[1].rel === "file" &&
          setBundleExport({
            ...bundleExport,
            reportLink: response.links[0].href,
            downloadLink: response.links[1].href,
            processId: "",
          });
      }
    };

    const exportStatus =
      bundleExport.processId &&
      setInterval(() => {
        const token = bundleExport.processId;
        exportStatusCheck(token);
      }, 1000 * 10);
    return () => clearInterval(exportStatus);
  }, [bundleExport]);

  // Stopping export process
  const stopProcess = useCallback(
    async (processId, id = "") => {
      const response = await adminApi({
        url: `exportProcess/${processId}/abort`,
        method: "post",
      });
      if (response.success === true) {
        toast.show({
          status: "success",
          message: "Export process stopped successfully",
        });

        id
          ? setMultiExportList({
              ...multiExportList,
              [id]: { ...multiExportList[id], processId: "" },
            })
          : setBundleExport({ ...bundleExport, processId: "" });
      } else {
        toast.show({
          status: "failure",
          message:
            response.message ||
            "Something went wrong while trying to stop export",
        });
      }
    },
    [bundleExport, multiExportList, toast],
  );

  const exportHandler = useCallback(
    async (id) => {
      setMultiExportList({
        ...multiExportList,
        [id]: { ...multiExportList[id], downloadLink: "", reportLink: "" },
      });
      const additionalParams = {};
      multiExportList[id]?.additionalParams?.map((item) => {
        additionalParams[item["key"]?.trim()] = item["value"]?.trim();
      });

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
            headersList: multiExportList[id]?.headersList || "All",
            ...additionalParams,
          },
        },
      });
      if (response.processId) {
        toast.show({
          status: "success",
          message: "Export process started",
        });
        setMultiExportList({
          ...multiExportList,
          [id]: { ...multiExportList[id], processId: response.processId },
        });
      } else {
        toast.show({
          status: "failure",
          message:
            response.message ||
            "Something went wrong while fetching export process status",
        });
      }
    },
    [multiExportList, toast],
  );

  const bulkExportHandler = useCallback(async () => {
    setBundleExport({ ...bundleExport, downloadLink: "", reportLink: "" });
    const currentUTCDateTime = new Date().toISOString();
    const response = await adminApi({
      url: `exportProcess`,
      method: "post",
      data: {
        mode: "bundle",
        fileName: `exportItems_${currentUTCDateTime}.zip`,
        items: exportItems.map((item) => {
          const additionalParams = {};
          item["additionalParams"]?.map((item) => {
            additionalParams[item["key"]?.trim()] = item["value"]?.trim();
          });
          return {
            id: item,
            format: multiExportList[item].format,
            params: {
              q: multiExportList[item]?.query,
              headersList: multiExportList[item]?.headersList || "All",
              ...additionalParams,
            },
          };
        }),
      },
    });
    if (response.processId) {
      toast.show({
        status: "success",
        message: "Export process started",
      });
      setBundleExport({ ...bundleExport, processId: response.processId });
    } else {
      toast.show({
        status: "failure",
        message:
          response.message ||
          "Something went wrong while fetching export process status",
      });
    }
  }, [bundleExport, exportItems, multiExportList, toast]);

  return (
    <ExportData
      bulkExportHandler={bulkExportHandler}
      stopProcess={stopProcess}
      exportList={exportList}
      exportHandler={exportHandler}
      exportItemsHandler={exportItemsHandler}
      setMultiExportList={setMultiExportList}
      multiExportList={multiExportList}
      bundleExport={bundleExport}
      exportItems={exportItems}
    />
  );
}
