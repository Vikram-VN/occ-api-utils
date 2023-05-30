import React, { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { default as DateSelector } from "tailwind-datepicker-react";

const DatePicker = (props) => {

    const [show, setShow] = useState(false)
    const handleChange = (selectedDate) => {
        console.log(selectedDate)
    }
    const handleClose = (state) => {
        setShow(state)
    }


    const options = {
        title: "Date",
        autoHide: true,
        todayBtn: true,
        clearBtn: true,
        maxDate: new Date(),
        minDate: new Date("2000-01-01"),
        theme: {
            background: "bg-gray-700 dark:bg-gray-800",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "",
            disabledText: "bg-gray-500",
            input: "",
            inputIcon: "",
            selected: "",
        },
        icons: {
            prev: () => <ChevronLeftIcon className="w-6 h-6"/>,
            next: () => <ChevronRightIcon className="w-8 h-8"/>,
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date(),
        language: "en",
        ...props.options
    }

    return (
        <DateSelector options={options} onChange={handleChange} show={show} setShow={handleClose} />
    )
}

export default DatePicker;