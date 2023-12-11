import React, { useEffect, useState, useCallback } from "react";
import ToastProvider from "@/components/toast";
import { Modal as FlowBiteModal } from "flowbite-react";

const Modal = (props) => {
  const {show, loginModalRef, title, description, children} = props;

  const [showModal, setShowModal] = useState(show || false);

  const onModalClose = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  useEffect(
    () => (loginModalRef.current = onModalClose),
    [onModalClose, loginModalRef],
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
          {title}
        </FlowBiteModal.Header>
        <FlowBiteModal.Body>
          <ToastProvider>{children}</ToastProvider>
        </FlowBiteModal.Body>
        {description && (
          <FlowBiteModal.Footer>{description}</FlowBiteModal.Footer>
        )}
      </FlowBiteModal>
    </React.Fragment>
  );
};

export default Modal;
