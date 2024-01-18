import React from "react";
import { Button, Tooltip } from "flowbite-react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { noop } from "@/utils";

const ImportItemTypes = (props) => {
  const { itemTypeAttributesCreationHandler = noop } = props;

  return (
    <Button
      className="w-2/6 max-lg:w-full"
      value="import attributes"
      onClick={itemTypeAttributesCreationHandler}
      type="button"
    >
      Import Attributes
      <Tooltip content="Supported file types are JSON and CSV" className="z-50">
        <InformationCircleIcon className="w-6 h-6 pl-2" />
      </Tooltip>
    </Button>
  );
};

export default ImportItemTypes;
