"use client";
import React, { useState } from "react";
import Toast from "./toast";
import ToastContext from "./toastContext";

const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const remove = () => {
        const newToasts = toasts.slice(1, toasts.length)
        setToasts(newToasts)
    }

    const removeById = id => {
        setToasts([...toasts.filter(toast => toast.id !== id)])
    }

    const removeByStatus = status => {
        setToasts(toasts.filter(toast => toast.status !== status))
    }

    const show = newToast => {
        const id = toasts.length + 1
        setToasts([...toasts, { id, ...newToast }])
    }

    return (
        <ToastContext.Provider value={{ show, remove, removeByStatus, removeByStatus }}>
            <div className="block">
                {toasts.map(({ message, id, status, delay }) => (
                    <Toast
                        key={id}
                        id={id}
                        status={status}
                        description={message}
                        remove={remove}
                        removeById={removeById}
                        delay={delay}
                    />
                ))}
            </div>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastProvider
