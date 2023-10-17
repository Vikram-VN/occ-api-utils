"use client";
import { useContext, useState, useEffect, useCallback, useLayoutEffect } from "react";
import { isAuthenticated, getAccessToken } from "../selector";
import { StoreContext, ToastContext } from "../context";
import { debounce } from "../../utils"
import { useSelector } from "react-redux";

export const useToasts = () => useContext(ToastContext);

export const useLoginStatus = () => {
    const isLoggedIn = useSelector(isAuthenticated);
    return isLoggedIn;
}

export const useAccessToken = () => {
    const accessToken = useSelector(getAccessToken);
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

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
        const updateSize = () => {
            setIsMobile(window.innerWidth < 768);
        }

        window.addEventListener("resize", debounce(updateSize, 250));
        // updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, [])

    return isMobile
}

export const getMobileDetect = userAgent => {
    const isAndroid = () => Boolean(userAgent.match(/Android/i))
    const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
    const isOpera = () => Boolean(userAgent.match(/Opera Mini/i))
    const isWindows = () => Boolean(userAgent.match(/IEMobile/i))
    const isSSR = () => Boolean(userAgent.match(/SSR/i))

    const isMobile = () =>
        Boolean(isAndroid() || isIos() || isOpera() || isWindows())
    const isDesktop = () => Boolean(!isMobile() && !isSSR())
    return {
        isMobile,
        isDesktop,
        isAndroid,
        isIos,
        isSSR
    }
}
export const useMobileDetect = () => {
    const userAgent =
        typeof navigator === "undefined" ? "SSR" : navigator.userAgent
    return getMobileDetect(userAgent)
}