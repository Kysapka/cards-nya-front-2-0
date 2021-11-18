import React from 'react';

import { Button, Modal } from 'react-bootstrap';

type PropsCheckEmailType = {
  text: string;
  email?: string;
  show: boolean;
  setShow: (show: boolean) => void;
};

export const ModalInfo = (props: PropsCheckEmailType): React.ReactElement => {
  const email = props.email ? props.email : '';
  const handleClose = (): void => {
    props.setShow(false);
  };
  return (
    <Modal show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`${props.text} ${email}`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
