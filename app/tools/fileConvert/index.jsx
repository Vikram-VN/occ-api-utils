import React, { useState, useRef, useEffect } from "react";
import * as XLSX from 'xlsx';
import { useDragging } from "../../store/hooks";
import { arrayBufferToJson, arrayBufferToString, sortData } from "../../utils";
import { Button } from "flowbite-react";

const FileConvert = props => {
    const {
        label,
        onDrop,
        fileType,
        disabled,
        multiple,
        required,
        onDraggingStateChange
    } = props;

    const labelRef = useRef(null);
    const inputRef = useRef(null);
    const [currFiles, setFile] = useState(null);
    const [fileData, setFileData] = useState(null);

    const contentTypes = {
        xlsx2Json: { extension: "json", contentType: "application/json" },
        json2Xlsx: { extension: "xlsx", contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
        xlsx2Csv: { extension: "csv", contentType: "text/csv;charset=utf-8" },
        csv2Xlsx: { extension: "xlsx", contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
    }

    const parseCSV = (content) => {
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        const jsonData = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].split(',');
            const data = {};

            for (let j = 0; j < headers.length; j++) {
                data[headers[j]] = line[j];
            }

            jsonData.push(data);
        }

        return jsonData;
    };

    const handleChanges = (uploadType, file) => {
        if (file) {
            setFile(file);
            const reader = new FileReader();

            reader.onload = (ev) => {
                let content, workbook, worksheet, excelBuffer, headers, jsonData = null;
                switch (fileType) {
                    case "xlsx2Json":
                        content = new Uint8Array(ev.target.result);
                        workbook = XLSX.read(data, { type: 'array' });
                        worksheet = workbook.Sheets[workbook.SheetNames[0]];
                        jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                        setFileData(jsonData);
                        break;
                    case "json2Xlsx":
                        content = ev.target.result;
                        jsonData = arrayBufferToJson(content);
                        // Extract and sort headers
                        headers = Object.keys(jsonData[0]);
                        headers.sort((a, b) => a.localeCompare(b));
                        worksheet = XLSX.utils.json_to_sheet(jsonData, { header: headers });
                        workbook = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                        excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                        setFileData(excelBuffer)
                        break;
                    case "xlsx2Csv":
                        content = ev.target.result;
                        workbook = XLSX.read(content, { type: 'array' });
                        const worksheetName = workbook.SheetNames[0];
                        worksheet = workbook.Sheets[worksheetName];
                        const csvData = XLSX.utils.sheet_to_csv(worksheet);
                        setFileData(csvData);
                        break;
                    case "csv2Xlsx":
                        content = ev.target.result;
                        jsonData = parseCSV(arrayBufferToString(content));
                        workbook = XLSX.utils.book_new();
                        worksheet = XLSX.utils.json_to_sheet(jsonData);
                        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                        excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                        setFileData(excelBuffer);
                        break;

                    default:
                        break;
                }
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
            let content, workbook, worksheet, excelBuffer, headers, jsonData = null;
            switch (fileType) {
                case "xlsx2Json":
                    content = new Uint8Array(ev.target.result);
                    workbook = XLSX.read(data, { type: 'array' });
                    worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    setFileData(jsonData);
                    break;
                case "json2Xlsx":
                    content = ev.target.result;
                    jsonData = arrayBufferToJson(content);
                    // Extract and sort headers
                    headers = Object.keys(jsonData[0]);
                    headers.sort((a, b) => a.localeCompare(b));
                    worksheet = XLSX.utils.json_to_sheet(jsonData, { header: headers });
                    workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                    excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                    setFileData(excelBuffer);
                    break;
                case "xlsx2Csv":
                    content = ev.target.result;
                    workbook = XLSX.read(content, { type: 'array' });
                    const worksheetName = workbook.SheetNames[0];
                    worksheet = workbook.Sheets[worksheetName];
                    const csvData = XLSX.utils.sheet_to_csv(worksheet);
                    setFileData(csvData);
                    break;
                case "csv2Xlsx":
                    content = ev.target.result;
                    jsonData = parseCSV(arrayBufferToString(content));
                    workbook = XLSX.utils.book_new();
                    worksheet = XLSX.utils.json_to_sheet(jsonData);
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                    excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                    setFileData(excelBuffer);
                    break;

                default:
                    break;
            }

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
        const fileName = `${currFiles.name.split(".")[0]}.${contentTypes[fileType].extension}`;
        let finalData, headers, allData, modifiedData = null;

        switch (fileType) {
            case "xlsx2Json":
                headers = fileData[0];
                allData = fileData.slice(1);
                modifiedData = [];
                allData.map(values => {
                    const childData = {}
                    headers.map((key, index) => {
                        childData[key] = values[index] || ""
                    })

                    modifiedData.push(childData);
                })
                finalData = JSON.stringify(modifiedData, null, 3);
                break;
            case "json2Xlsx":
                // No data filtration is required
                finalData = fileData;
                break;
            case "xlsx2Csv":
                finalData = fileData;
                break;
            case "csv2Xlsx":
                finalData = fileData;
                break;

            default:
                break;
        }

        if (finalData) {
            const blob = new Blob([finalData], { type: contentTypes[fileType].contentType });

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="flex items-center phone:flex-row flex-col gap-4 phone:gap-0 justify-center w-full">
            <label ref={labelRef} htmlFor="occ-file" className="flex flex-col items-center justify-center w-4/6 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400"> OCC will support only limited file types</p>
                </div>
                <input
                    id="file-converter"
                    onClick={handleClick}
                    onChange={handleInputChange}
                    ref={inputRef}
                    type="file"
                    name="fileConverter"
                    className="hidden"
                    disabled={disabled}
                    multiple={multiple}
                    required={required}
                />
            </label>
            <div className="w-2/6 flex justify-center">
                <Button onClick={handleDownload} disabled={!fileData}>{label}</Button>
            </div>
        </div>
    )
}
export default FileConvert;
