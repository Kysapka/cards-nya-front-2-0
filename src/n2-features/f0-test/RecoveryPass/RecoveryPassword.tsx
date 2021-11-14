import React, { useEffect } from 'react';

import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import rocketImg from '../../../n1-main/m1-ui/common/assets/Rocket.jpg';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { TextField } from '../Registration/TextField';

import {
  initRecoveryPasswordStateType,
  recoveryPasswordThunk,
  setTokenAction,
} from './recoveryPassword-reducer';

export const RecoveryPassword = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { token } = useParams();
  useEffect(() => {
    if (token) dispatch(setTokenAction(token));
  }, []);
  const SignupSchema = yup
    .object({
      password: yup
        .string()
        .min(7, 'password must be at least 7 character')
        .required('password is required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'password must match')
        .required('confirm password is required'),
    })
    .required();
  const { info, error } = useSelector<AppRootStateType, initRecoveryPasswordStateType>(
    state => state.recoveryPasswordReducer,
  );
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={{
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              const { password } = values;
              if (token) {
                dispatch(recoveryPasswordThunk(password, token));
              }
            }}
          >
            {() => (
              <div>
                <h1 className="my-4 font-weght-bold display-4">Create new password</h1>
                <Form>
                  <TextField label="Password" name="password" type="password" />
                  <TextField
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                  />
                  {error ? <div className="error">{error}</div> : <br />}
                  {info ? <div>{info}</div> : <br />}
                  <button className="btn btn-dark mt-3" type="submit">
                    Set
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
