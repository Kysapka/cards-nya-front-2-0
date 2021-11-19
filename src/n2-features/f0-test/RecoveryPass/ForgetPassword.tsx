import React, { useState } from 'react';

import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';

import rocketImg from '../../../n1-main/m1-ui/common/assets/Rocket.jpg';
import { PROFILE_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { ModalInfo } from '../modalWindow/ModaInfo';
import { ModalError } from '../modalWindow/ModalError';
import { TextField } from '../Registration/TextField';

import { initRecoveryStateType, RecoveryPassThunk } from './ForgetPassReducer';

export const ForgetPassword = (): React.ReactElement => {
  console.log('RecoveryPass Render');
  const SignupSchema = yup
    .object({
      email: yup.string().email('email is invalid').required('email is required'),
    })
    .required();
  const recovereState = useSelector<AppRootStateType, initRecoveryStateType>(
    state => state.forgetPassword,
  );
  const dispatch = useDispatch();
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);
  if (isAuth) {
    return <Navigate to={PROFILE_ROUTE} />;
  }
  const [show, setShow] = useState(false);
  return (
    <div className="container mt-3" id="213213123123">
      {recovereState.error && (
        <ModalError
          error={recovereState.error}
          show={show}
          setShow={setShow}
          email={recovereState.email}
        />
      )}
      {recovereState.info && (
        <ModalInfo
          text={recovereState.info}
          show={show}
          setShow={setShow}
          email={recovereState.email}
        />
      )}
      <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              const { email } = values;
              dispatch(RecoveryPassThunk(email));
              setShow(true);
            }}
          >
            {() => (
              <div>
                <h1 className="my-4 font-weght-bold display-4">
                  Enter your email please
                </h1>
                <Form>
                  <TextField label="E-mail" name="email" type="text" />
                  <button className="btn btn-dark mt-3" type="submit">
                    Enter
                  </button>
                  <button
                    style={{ marginLeft: '20px' }}
                    className="btn btn-danger mt-3"
                    type="reset"
                  >
                    Reset
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        </div>
        <div className="col-md-7 my-auto">
          <img className="img-fluid w-75" src={rocketImg} alt="rocket" />
        </div>
      </div>
    </div>
  );
};
