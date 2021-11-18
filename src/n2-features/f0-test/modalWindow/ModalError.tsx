import React from 'react';

import { Button, Modal } from 'react-bootstrap';

type PropsCheckEmailType = {
  error: string;
  email?: string;
  show: boolean;
  setShow: (show: boolean) => void;
};

export const ModalError = (props: PropsCheckEmailType): React.ReactElement => {
  const email = props.email ? props.email : '';
  const handleClose = (): void => {
    props.setShow(false);
  };

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: 'red' }}>{`${props.error} ${email}`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
