import React from 'react'
import { useModal, useModalDispatch} from './modalContext'
import {
    Modal as ModalComponent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap'

export default function ModalService({callback}) {
    const dispatch = useModalDispatch();
    const modal = useModal();
    const toggle = () => dispatch.close();
    window.modal = modal;
    window.mdispatch = dispatch;
    const handleCallBack = () => {
        callback();
        toggle();
    }
  return (
    <ModalComponent isOpen={modal.open} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modal.data?.title}</ModalHeader>
        <ModalBody>
            {modal.data?.body}
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={handleCallBack}>
            {modal.data.btnLeft? modal.data.btnLeft : 'Remove'}
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
            {modal.data.btnRight? modal.data.btnRight : 'Cancel'}
            </Button>
        </ModalFooter>
    </ModalComponent>
  )
}

