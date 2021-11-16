import React from 'react';

import { Button, Modal } from 'react-bootstrap';

type PropsCheckEmailType = {
  error: boolean;
  text: string;
  title: string;
  email?: string;
  show: boolean;
  onClick: (show: boolean) => void;
};

export const CheckMail = (props: PropsCheckEmailType): React.ReactElement => {
  const email = props.email ? props.email : '';
  const handleClose = (): void => {
    props.onClick(false);
  };

  return (
    <Modal show={props.show} onHide={handleClose}>
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
