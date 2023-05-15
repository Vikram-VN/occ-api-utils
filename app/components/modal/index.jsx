"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { StoreContext } from "../../store/context";
import { ToastProvider } from "../toast";
import { Modal as FlowBiteModal } from "flowbite-react";

const Modal = (props) => {

    const [showModal, setShowModal] = useState(props.show || false);
    const { action } = useContext(StoreContext);
    const router = useRouter();

    const onModalClose = useCallback(() => {
        setShowModal(!showModal);
    }, [showModal]);

    const clearReduxState = () => {
        router.push('/');
        action('stateCall', { stateAction: 'clearState' })
    }

    useEffect(() => props.loginModalRef.current = onModalClose, [onModalClose, props.loginModalRef])

    return (
        <React.Fragment>
            <input name="login-modal" type="text" id="user-login" className="hidden" onClick={onModalClose} />
            <input name="logout-modal" type="text" id="user-logout" className="hidden" onClick={clearReduxState} />
            <FlowBiteModal show={showModal} size={"7xl"} onClose={onModalClose}>
                <FlowBiteModal.Header>
                    {props.title}
                </FlowBiteModal.Header>
                <FlowBiteModal.Body>
                    <ToastProvider>
                        {props.children}
                    </ToastProvider>
                </FlowBiteModal.Body>
                {props.description && <FlowBiteModal.Footer>
                    {props.description}
                </FlowBiteModal.Footer>
                }
            </FlowBiteModal>
        </React.Fragment>
    );
}

export default Modal;