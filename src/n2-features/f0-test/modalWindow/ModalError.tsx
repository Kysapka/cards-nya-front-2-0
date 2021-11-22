import React from 'react';

import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { resetError } from '../../../n1-main/m2-bll/ErrorReducer';

type PropsCheckEmailType = {
  error: string;
  email?: string;
};

export const ModalError = React.memo((props: PropsCheckEmailType): React.ReactElement => {
  const email = props.email ? props.email : '';
  const dispatch = useDispatch();
  const handleClose = (): void => {
    dispatch(resetError());
  };

  return (
    <Modal show onHide={handleClose}>
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
});
