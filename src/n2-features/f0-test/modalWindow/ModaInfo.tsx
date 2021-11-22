import React from 'react';

import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { resetInfo } from '../../../n1-main/m2-bll/ErrorReducer';

type PropsCheckEmailType = {
  text: string;
  email?: string;
};

export const ModalInfo = (props: PropsCheckEmailType): React.ReactElement => {
  const dispatch = useDispatch();
  const email = props.email ? props.email : '';
  const handleClose = (): void => {
    dispatch(resetInfo());
  };
  return (
    <Modal show>
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
