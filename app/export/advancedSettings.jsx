import React, { useState } from "react";
import { Accordion, Button, Label, TextInput } from "flowbite-react";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function AdvancedSettings(props) {
  const { setMultiExportList, item } = props;
  const MAXIMUM_PARAMS = 5;

  const [params, setParams] = useState([]);

  const removeParam = (index) => {
    const newParams = [...params];
    newParams.splice(index, 1);
    setParams(newParams);
  };

  const handleParamInput = (index, key, value) => {
    const newParams = [...params];
    newParams[index] = { key, value };
    setParams(newParams);

    setMultiExportList((prevMultiExportList) => ({
      ...prevMultiExportList,
      [item.id]: {
        ...prevMultiExportList[item.id],
        additionalParams: newParams,
      },
    }));
  };

  const param = (index) => {
    const paramKey = params[index] ? params[index].key : "";
    const paramValue = params[index] ? params[index].value : "";

    return (
      <React.Fragment key={index}>
        <TrashIcon
          className="h-6 w-6 cursor-pointer float-right"
          title="Delete this param"
          onClick={() => removeParam(index)}
        />
        <div className="flex gap-4">
          <div className="w-full m-auto mb-4">
            <div className="mb-2 flex justify-between">
              <Label htmlFor={`paramKey${index}`} value="Param Key" />
            </div>
            <TextInput
              type="text"
              name={`paramKey${index}`}
              id={`paramKey${index}`}
              placeholder="Ex: prettyPrintJSON"
              value={paramKey}
              onInput={(e) => handleParamInput(index, e.target.value, paramValue)}
            />
          </div>
          <div className="w-full m-auto mb-4">
            <div className="mb-2 block">
              <Label htmlFor={`paramValue${index}`} value="Param Value" />
            </div>
            <TextInput
              type="text"
              name={`paramValue${index}`}
              id={`paramValue${index}`}
              placeholder="Ex: true"
              value={paramValue}
              onInput={(e) => handleParamInput(index, paramKey, e.target.value)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  };

  const addParam = () => {
    const newParams = [...params, { key: "", value: "" }];
    setParams(newParams);
  };

  return (
    <Accordion collapseAll>
      <Accordion.Panel>
        <Accordion.Title>Advanced Settings</Accordion.Title>
        <Accordion.Content>
          {params.map((_, index) => param(index))}
          {params.length < MAXIMUM_PARAMS && (
            <Button className="w-full" onClick={addParam}>
              Add Params Upto {MAXIMUM_PARAMS - params.length}
            </Button>
          )}
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}
