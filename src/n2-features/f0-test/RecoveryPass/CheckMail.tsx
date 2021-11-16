import React, { useState } from 'react';

import { Button, Modal } from 'react-bootstrap';

type PropsCheckEmailType = {
  error: boolean;
  text: string;
  title: string;
  email?: string;
};

export const CheckMail = (props: PropsCheckEmailType): React.ReactElement => {
  const [show, setShow] = useState(true);
  const email = props.email ? props.email : '';
  const handleClose = (): void => {
    setShow(false);
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      {props.error ? (
        <Modal.Body style={{ color: 'red' }}>{`${props.text} ${email}`}</Modal.Body>
      ) : (
        <Modal.Body>{`${props.text} ${email}`}</Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
