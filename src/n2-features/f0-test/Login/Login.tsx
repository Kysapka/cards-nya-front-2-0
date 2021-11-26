import React, { ReactElement } from 'react';

import { Field, Form, Formik } from 'formik';
import { FormCheck } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import { Navigate, NavLink } from 'react-router-dom';

import rocketImg from '../../../n1-main/m1-ui/common/assets/Rocket.jpg';
import { PROFILE_ROUTE, RECOVERY_PASS_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { ModalError } from '../modalWindow/ModalError';
import { TextField } from '../Registration/TextField';

import { SignupSchemaLoginType } from './LoginContainer';

type LoginPropsType = {
  Error: boolean;
  isAuth: boolean;
  textError: string;
  SignupSchema: SignupSchemaLoginType;
  callback: (values: { email: string; password: string; rememberMe: boolean }) => void;
};

export const Login = (props: LoginPropsType): ReactElement => {
  if (props.isAuth) {
    return <Navigate to={PROFILE_ROUTE} />;
  }
  return (
    <div className="container mt-3">
      {props.Error && <ModalError error={props.textError} />}
      <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={{
              email: '',
              password: '',
              rememberMe: false,
            }}
            validationSchema={props.SignupSchema}
            onSubmit={values => {
              props.callback(values);
            }}
          >
            {() => (
              <div>
                <h1 className="my-4 font-weght-bold display-4">LOGIN</h1>
                <Form>
                  <TextField label="E-mail" name="email" type="text" />
                  <TextField label="Password" name="password" type="password" />
                  <div>
                    {/* <FormCheck label="remember me" type="checkbox" name="rememberMe" /> */}

                    <div
                      className="custom-control custom-checkbox"
                      style={{ margin: '20px 0px' }}
                    >
                      <FormCheckInput name="rememberMe" type="checkbox" />
                      <label
                        className="custom-control-label"
                        style={{ marginLeft: '5px' }}
                        htmlFor="rememberMe"
                      >
                        remember me
                      </label>
                    </div>
                  </div>
                  <NavLink
                    style={{ display: 'block', margin: '10px 0px' }}
                    to={RECOVERY_PASS_ROUTE}
                  >
                    Forgot Password
                  </NavLink>
                  <button className="btn btn-primary mt-3" type="submit">
                    Login
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
