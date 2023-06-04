import React, { useState, useRef, useEffect } from "react";
import * as XLSX from 'xlsx';
import { useDragging } from "../../store/hooks";
import { Button } from "flowbite-react";

const Excel2Json = props => {
    const {
        fileOrFiles,
        onDrop,
        disabled,
        multiple,
        required,
        onDraggingStateChange
    } = props;

    const labelRef = useRef(null);
    const inputRef = useRef(null);
    const [currFiles, setFile] = useState(null);
    const [fileData, setFileData] = useState([]);

    const handleChanges = (uploadType, file) => {
        if (file) {
            setFile(file);
            const reader = new FileReader();

            reader.onload = (ev) => {
                const data = new Uint8Array(ev.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                setFileData(jsonData);
            };

            reader.readAsArrayBuffer(file);
            return true
        }
        return false
    }

    const handleClick = ev => {
        ev.stopPropagation()
        // eslint-disable-next-line no-param-reassign
        if (inputRef && inputRef.current) {
            inputRef.current.value = ""
            inputRef.current.click()
        }
    }

    const handleInputChange = ev => {
        const file = ev.target.files[0];
        const reader = new FileReader();

        setFile(ev.target.files[0]);

        reader.onload = (ev) => {
            const data = new Uint8Array(ev.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setFileData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    const dragging = useDragging({
        labelRef,
        inputRef,
        multiple,
        handleChanges,
        onDrop
    });

    useEffect(() => {
        onDraggingStateChange?.(dragging)
    }, [dragging, onDraggingStateChange])

    const handleDownload = () => {
        const fileName = `${currFiles.name.split(".")[0]}.json`;
        const headers = fileData[0];
        const allData = fileData.slice(1);
        const modifiedData = [];
        allData.map(values => {
            const childData = {}
            headers.map((key, index) => {
                childData[key] = values[index] || ""
            })

            modifiedData.push(childData);
        })
        const jsonDataStr = JSON.stringify(modifiedData, null, 3);
        const blob = new Blob([jsonDataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
    };

    console.log(currFiles);

    return (
        <div className="flex items-center phone:flex-row flex-col gap-4 phone:gap-0 justify-center w-full">
            <label ref={labelRef} htmlFor="occ-file" className="flex flex-col items-center justify-center w-4/6 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400"> OCC will support only limited file types</p>
                </div>
                <input
                    id="occ-file"
                    onClick={handleClick}
                    onChange={handleInputChange}
                    ref={inputRef}
                    type="file"
                    name="fileUpload"
                    className="hidden"
                    disabled={disabled}
                    multiple={multiple}
                    required={required}
                />
            </label>
            <div className="w-2/6 flex justify-center">
                <Button onClick={handleDownload} disabled={!fileData}>Download JSON</Button>
            </div>
        </div>
    )
}
export default Excel2Json;
