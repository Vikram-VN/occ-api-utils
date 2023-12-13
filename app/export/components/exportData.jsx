"use client";
import {
  Button,
  Card,
  Checkbox,
  Label,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import React from "react";
import { adminFileDownload } from "@/utils/api";
import {
  CloudArrowDownIcon,
  StopCircleIcon,
  FlagIcon,
} from "@heroicons/react/24/solid";
import AdvancedSettings from "@/export/components/advancedSettings";
import { noop } from "@/utils";

export default function ExportData(props) {
  const {
    bundleExport,
    stopProcess = noop,
    exportItems,
    bulkExportHandler = noop,
    exportItemsHandler = noop,
    exportHandler = noop,
    exportList,
    multiExportList,
    setMultiExportList,
  } = props;

  return (
    <React.Fragment>
      <Card className="mb-4">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 items-center">
          <div className="block">
            <h1 className="mb-2 text-2xl text-justify bold ">Export Process</h1>
            <p>Export items from the server.</p>
          </div>
          <div className="block w-full">
            <div className="flex gap-4 items-center justify-end">
              {bundleExport?.processId && (
                <StopCircleIcon
                  title="Stop export"
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => stopProcess(bundleExport?.processId)}
                />
              )}
              {bundleExport?.processId && (
                <Spinner title="Bulk export is started" />
              )}
              {bundleExport?.downloadLink && (
                <CloudArrowDownIcon
                  title="Download exported file"
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => adminFileDownload(bundleExport?.downloadLink)}
                />
              )}
              {bundleExport?.reportLink && (
                <FlagIcon
                  title="Download exported file"
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => adminFileDownload(bundleExport?.reportLink)}
                />
              )}
            </div>
            <Button
              type="button"
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
        {exportList.items &&
          exportList.items.map((item) => {
            return (
              item.formats.length > 0 && (
                <Card className="mb-4 gap-2" key={item.typeName}>
                  <div className="flex gap-2 items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <Checkbox
                        name={item.typeName}
                        className="inline"
                        disabled={
                          item.formats.length > 0 &&
                          !multiExportList[item.id]?.format
                        }
                        onClick={(ev) =>
                          exportItemsHandler(ev.target.checked, item.id)
                        }
                      />
                      <h1 className="text-bold text-2xl">{item.typeName}</h1>
                    </div>
                    <div className="flex gap-4 items-center">
                      {multiExportList[item.id]?.processId && (
                        <StopCircleIcon
                          title="Stop export"
                          className="w-8 h-8 cursor-pointer"
                          onClick={() =>
                            stopProcess(
                              multiExportList[item.id]?.processId,
                              item.id,
                            )
                          }
                        />
                      )}
                      {multiExportList[item.id]?.processId && (
                        <Spinner title="Export is started" />
                      )}
                      {multiExportList[item.id]?.downloadLink && (
                        <CloudArrowDownIcon
                          title="Download exported file"
                          className="w-8 h-8 cursor-pointer"
                          onClick={() =>
                            adminFileDownload(
                              multiExportList[item.id]?.downloadLink,
                            )
                          }
                        />
                      )}
                      {multiExportList[item.id]?.reportLink && (
                        <FlagIcon
                          title="Download report file"
                          className="w-8 h-8 cursor-pointer"
                          onClick={() =>
                            adminFileDownload(
                              multiExportList[item.id]?.reportLink,
                            )
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-flow-col gap-4">
                    {item.formats.length > 0 && (
                      <Select
                        disabled={multiExportList[item.id]?.processId}
                        defaultValue={"none"}
                        onChange={(e) =>
                          setMultiExportList({
                            ...multiExportList,
                            [item.id]: {
                              ...multiExportList[item.id],
                              id: item.id,
                              format: e.target.value,
                            },
                          })
                        }
                      >
                        <option value="none" disabled>
                          Select Format
                        </option>
                        {item.formats.map((format) => (
                          <option value={format} key={format}>
                            {format.toUpperCase()}
                          </option>
                        ))}
                      </Select>
                    )}
                    <Button
                      type="button"
                      onClick={() => exportHandler(item.id)}
                      disabled={
                        (item.formats.length > 0 &&
                          !multiExportList[item.id]?.format) ||
                        multiExportList[item.id]?.processId
                      }
                    >
                      Export
                    </Button>
                  </div>
                  <div className="w-full m-auto">
                    <div className="mb-2 block">
                      <Label value="Query Filter (Optional)" />
                    </div>
                    <TextInput
                      type="text"
                      placeholder="Ex: email ne null and active eq true"
                      name="query"
                      onInput={(e) =>
                        setMultiExportList({
                          ...multiExportList,
                          [item.id]: {
                            ...multiExportList[item.id],
                            query: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="w-full m-auto">
                    <div className="mb-2 block">
                      <Label value="Headers List (Optional)" />
                    </div>
                    <TextInput
                      type="text"
                      name="headersList"
                      placeholder="Ex: id,name,email,active,members,shippingAddress,BillingAddress"
                      onInput={(e) =>
                        setMultiExportList({
                          ...multiExportList,
                          [item.id]: {
                            ...multiExportList[item.id],
                            headersList: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <AdvancedSettings
                    setMultiExportList={setMultiExportList}
                    item={item}
                  />
                </Card>
              )
            );
          })}
      </div>
    </React.Fragment>
  );
}
