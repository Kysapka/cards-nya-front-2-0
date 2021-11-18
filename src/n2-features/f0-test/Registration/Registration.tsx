import React, { useEffect } from 'react';

import { Form, Formik } from 'formik';
import rocketImg from 'n1-main/m1-ui/common/assets/Rocket.jpg';
import { AppRootStateType } from 'n1-main/m2-bll';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { PROFILE_ROUTE } from '../../../n1-main/m1-ui/routes/consts';

import { initRegistrationStateType, RegistrationThunk } from './RegistrationReducer';
import { TextField } from './TextField';

export const Registration = (): React.ReactElement => {
  const regState = useSelector<AppRootStateType, initRegistrationStateType>(
    state => state.registration,
  );
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SignupSchema = yup
    .object({
      email: yup.string().email('email is invalid').required('email is required'),
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
  useEffect(() => {
    if (isAuth) {
      navigate(PROFILE_ROUTE, { replace: true });
    }
  }, [isAuth]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              const { email, password } = values;
              dispatch(RegistrationThunk(email, password));
            }}
          >
            {() => (
              <div>
                <h1 className="my-4 font-weght-bold display-4">Sign Up</h1>
                <Form>
                  <TextField label="E-mail" name="email" type="text" />
                  <TextField label="Password" name="password" type="password" />
                  <TextField
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                  />
                  <button className="btn btn-primary mt-3" type="submit">
                    Register
                  </button>
                  <button className="btn btn-danger mt-3 mx-lg-3" type="reset">
                    Reset
                  </button>
                </Form>
                {regState.email.length > 0 ? (
                  <h1 style={{ color: 'green' }}>
                    Register successful with e-mail: {regState.email}
                  </h1>
                ) : null}
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