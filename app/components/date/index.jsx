import React from "react";
import { default as DateSelector } from "react-tailwindcss-datepicker";
import { noop } from "../../utils";

const DatePicker = ({ handleValueChange = noop, ...props }) => {
  return (
    <DateSelector
      asSingle={true}
      useRange={false}
      placeholder="Select date"
      minDate={new Date("2010-01-01")}
      maxDate={new Date()}
      onChange={handleValueChange}
      configs={{
        today: "Today",
        yesterday: "Yesterday",
      }}
      {...props}
    />
  );
};

export default DatePicker;
