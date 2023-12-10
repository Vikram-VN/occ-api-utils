import React from "react";
import { Datepicker as FlowBiteDatePicker } from 'flowbite-react';
import { noop } from "@/utils";

const DatePicker = ({ handleValueChange = noop, ...props }) => {
  return (
    <FlowBiteDatePicker
      showClearButton={true}
      minDate={new Date("2010-01-01")}
      maxDate={new Date()}
      onSelectedDateChanged={handleValueChange}
      {...props}
    />
  );
};

export default DatePicker;
