import React, { useState } from "react";
import Toast from "@/components/toast/toast";
import { ToastContext } from "@/store/context";

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeAll = () => {
    setToasts([]);
  };

  const remove = () => {
    const newToasts = toasts.slice(1, toasts.length);
    setToasts(newToasts);
  };

  const removeById = (id) => {
    setToasts([...toasts.filter((toast) => toast.id !== id)]);
  };

  const removeByStatus = (status) => {
    setToasts(toasts.filter((toast) => toast.status !== status));
  };

  const show = ({ status, message, clearAll = true }) => {
    const id = toasts.length + 1;
    if (clearAll) {
      setToasts([{ id, status, message }]);
    } else {
      setToasts([...toasts, { id, status, message }]);
    }
  };

  return (
    <ToastContext.Provider
      value={{ show, removeAll, remove, removeByStatus, removeByStatus }}
    >
      {toasts.map(({ message, id, status, delay = 3 }) => (
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
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
