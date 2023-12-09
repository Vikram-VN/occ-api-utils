"use client";
import React, { useEffect, useState, useCallback, useContext } from "react";
import ToastProvider from "@/components/toast";
import { Modal as FlowBiteModal } from "flowbite-react";

const Modal = (props) => {
  const [showModal, setShowModal] = useState(props.show || false);

  const onModalClose = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  useEffect(
    () => (props.loginModalRef.current = onModalClose),
    [onModalClose, props.loginModalRef],
  );

  return (
    <React.Fragment>
      <input
        name="login-modal"
        type="text"
        id="user-login"
        className="hidden"
        onClick={onModalClose}
      />
      <FlowBiteModal show={showModal} size={"7xl"} onClose={onModalClose}>
        <FlowBiteModal.Header className="[&>h3]:text-2xl">
          {props.title}
        </FlowBiteModal.Header>
        <FlowBiteModal.Body>
          <ToastProvider>{props.children}</ToastProvider>
        </FlowBiteModal.Body>
        {props.description && (
          <FlowBiteModal.Footer>{props.description}</FlowBiteModal.Footer>
        )}
      </FlowBiteModal>
    </React.Fragment>
  );
};

export default Modal;
