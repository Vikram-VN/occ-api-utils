import React, { useState, useRef, useEffect } from 'react';
import { Label, Select } from 'flowbite-react';
import { useDragging } from '../../store/hooks';

const FileUploader = props => {
    const {
        handleChange,
        fileOrFiles,
        onSelect,
        onDrop,
        disabled,
        multiple,
        required,
        onDraggingStateChange
    } = props;

    const uploadTypes = {
        "collectionImage": "Collection Image",
        "crashReport": "Crash Report",
        "general": "General",
        "manualCollectionImage": "Manual Collection Image",
        "manualProductImage": "ManualProductImage",
        "productImage": "Product Image",
        "thirdPartyFile": "Third-Party",
        "bulkImport": "Bulk Import",
    };

    const labelRef = useRef(null);
    const inputRef = useRef(null);
    const [uploaded, setUploaded] = useState(false);
    const [uploadType, setUploadType] = useState('thirdPartyFile');
    const [currFiles, setFile] = useState(null);
    const [error, setError] = useState(false);

    const handleChanges = (uploadType, files) => {
        let checkError = false
        if (files) {
            if (checkError) return false
            if (handleChange) handleChange(uploadType, files)
            setFile(files)

            setUploaded(true)
            setError(false)
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
        const allFiles = ev.target.files
        const files = multiple ? allFiles : allFiles[0]
        const success = handleChanges(uploadType, files)
        if (onSelect && success) onSelect(uploadType, files)
    }

    const dragging = useDragging({
        labelRef,
        inputRef,
        multiple,
        uploadType,
        handleChanges,
        onDrop
    });

    useEffect(() => {
        onDraggingStateChange?.(dragging)
    }, [dragging, onDraggingStateChange])

    useEffect(() => {
        if (fileOrFiles) {
            setUploaded(true)
            setFile(fileOrFiles)
        } else {
            if (inputRef.current) inputRef.current.value = ""
            setUploaded(false)
            setFile(null)
        }
    }, [fileOrFiles]);

    return (
        <div className="flex items-center justify-center w-full flex-col">
            <div id="select" className='mb-4 w-full'>
                <div className="mb-2 block">
                    <Label
                        htmlFor="uploadType"
                        value="Select Upload Type"
                    />
                </div>
                <Select id="uploadType"
                    defaultValue="thirdPartyFile"
                    required={true}
                    onChange={(e) => setUploadType(e.target.value)}
                >
                    {Object.entries(uploadTypes).map((keyValue) => {
                        const [key, value] = keyValue;
                        return <option key={key} value={key}>{value}</option>;
                    })}
                </Select>
            </div>
            <label ref={labelRef} htmlFor="apex-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Zip, Json, Csv, Txt, Pdf, Jpg, Png</p>
                </div>
                <input
                    id="apex-file"
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
        </div>
    )
}
export default FileUploader;
