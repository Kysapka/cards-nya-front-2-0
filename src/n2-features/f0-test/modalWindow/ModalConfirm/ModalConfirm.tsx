import React, { useState } from 'react';

import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../../../../n1-main/m2-bll';

import { ChangeModalShowStatusAC } from './ModuleConfirmReducer';

type ModalConfirmType = {
  callBack: () => void;
};
export const ModalConfirm = (props: ModalConfirmType): React.ReactElement => {
  const dispatch = useDispatch();
  const stateShow = useSelector<AppRootStateType>(state => state.modalConfirm.stateShow);
  const yes = (): void => {
    props.callBack();
    dispatch(ChangeModalShowStatusAC(false));
  };
  const no = (): void => {
    dispatch(ChangeModalShowStatusAC(false));
  };
  return (
    <Modal show={stateShow}>
      <Modal.Header>
        <Modal.Title>Do you want to delete Pack</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="primary" onClick={yes}>
          Yes
        </Button>
        <Button variant="danger" onClick={no}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
