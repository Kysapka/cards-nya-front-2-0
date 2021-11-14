import React, { useState } from 'react';

import { Button, Modal } from 'react-bootstrap';

type PropsCheckEmailType = {
  error: boolean;
};

export const CheckMail = (props: PropsCheckEmailType): React.ReactElement => {
  const [show, setShow] = useState(true);

  const handleClose = (): void => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Check Email</Modal.Title>
      </Modal.Header>

      {props.error ? (
        <Modal.Body style={{ color: 'red' }}>Email address not found</Modal.Body>
      ) : (
        <Modal.Body>We’ve sent an Email with instructions</Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
