'use client';
import { useEffect } from 'react';
import Alert from '../alert';

const Toast = ({ id, clearAll, removeAll, remove, status, description, removeById, delay, ...props }) => {

    useEffect(() => {
        clearAll && removeAll();
        const timeout = setTimeout(() => {
            delay && remove();
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [clearAll, delay, remove, removeAll]);

    return (
        !delay ? <Alert
            color={status}
            message={description}
            id={id}
            onDismiss={() => removeById(id)}
            {...props}
        /> : <Alert
            color={status}
            message={description}
            id={id}
            {...props}
        />
    );
}

export default Toast;
