import { useContext, useState, useEffect, useCallback } from 'react';
import { isAuthenticated, getAccessToken } from '../selector';
import { StoreContext } from '../context';
import { useSelector } from 'react-redux';

export const useLoginStatus = () => {
    const { getState } = useContext(StoreContext);
    const isLoggedIn = isAuthenticated(useSelector(getState));
    return isLoggedIn;
}

export const useAccessToken = () => {
    const { getState } = useContext(StoreContext);
    const accessToken = getAccessToken(useSelector(getState));
    return accessToken;
}

let draggingCount = 0;

export const useDragging = ({
    labelRef,
    inputRef,
    multiple,
    uploadType,
    handleChanges,
    onDrop
}) => {
    const [dragging, setDragging] = useState(false);

    const handleClick = useCallback(() => {
        inputRef.current.click()
    }, [inputRef])

    const handleDragIn = useCallback(ev => {
        ev.preventDefault()
        ev.stopPropagation()
        draggingCount++
        if (ev.dataTransfer.items && ev.dataTransfer.items.length !== 0) {
            setDragging(true)
        }
    }, []);

    const handleDragOut = useCallback(ev => {
        ev.preventDefault()
        ev.stopPropagation()
        draggingCount--
        if (draggingCount > 0) return
        setDragging(false)
    }, []);

    const handleDrag = useCallback(ev => {
        ev.preventDefault()
        ev.stopPropagation()
    }, []);

    const handleDrop = useCallback(
        ev => {
            ev.preventDefault()
            ev.stopPropagation()
            setDragging(false)
            draggingCount = 0

            const eventFiles = ev.dataTransfer.files
            if (eventFiles && eventFiles.length > 0) {
                const files = multiple ? eventFiles : eventFiles[0]
                const success = handleChanges(uploadType, files)
                if (onDrop && success) onDrop(uploadType, files)
            }
        },
        [handleChanges, multiple, onDrop, uploadType]
    );

    useEffect(() => {
        const ele = labelRef.current;
        ele.addEventListener("click", handleClick)
        ele.addEventListener("dragenter", handleDragIn)
        ele.addEventListener("dragleave", handleDragOut)
        ele.addEventListener("dragover", handleDrag)
        ele.addEventListener("drop", handleDrop)
        return () => {
            ele.removeEventListener("click", handleClick)
            ele.removeEventListener("dragenter", handleDragIn)
            ele.removeEventListener("dragleave", handleDragOut)
            ele.removeEventListener("dragover", handleDrag)
            ele.removeEventListener("drop", handleDrop)
        }
    }, [
        handleClick,
        handleDragIn,
        handleDragOut,
        handleDrag,
        handleDrop,
        labelRef
    ]);

    return dragging;
}
