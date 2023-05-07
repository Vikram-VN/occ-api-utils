import { useEffect } from "react";
import Alert from "../alert";

const Toast = ({ id, remove, status, description, removeById, delay, ...props }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            delay && remove();
        }, delay * 1000)
        return () => clearTimeout(timeout)
    }, [delay, remove]);

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
