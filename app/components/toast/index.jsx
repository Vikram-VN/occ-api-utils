'use client';
import React, { useState } from 'react';
import Toast from './toast';
import {ToastContext} from '../../store/context';

const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeAll = () => {
        setToasts([])
    }

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
        <ToastContext.Provider value={{ show, removeAll, remove, removeByStatus, removeByStatus }}>
            <div id="toast-placeholder" className='block'>
                {toasts.map(({ message, id, status, delay, clearAll }) => (
                    <Toast
                        key={id}
                        id={id}
                        status={status}
                        description={message}
                        removeAll={removeAll}
                        remove={remove}
                        removeById={removeById}
                        delay={delay}
                        clearAll={clearAll}
                    />
                ))}
            </div>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastProvider
