import React, { ReactElement } from 'react';

import { Form, Formik } from 'formik';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import { useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import rocketImg from '../../../n1-main/m1-ui/common/assets/Rocket.jpg';
import { Loader } from '../../../n1-main/m1-ui/common/Loader';
import { PROFILE_ROUTE, RECOVERY_PASS_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { ModalError } from '../modalWindow/ModalError';
import { TextField } from '../Registration/TextField';

import { SignupSchemaLoginType } from './LoginContainer';

type LoginPropsType = {
  Error: boolean;
  // isAuth: boolean;
  textError: string;
  SignupSchema: SignupSchemaLoginType;
  callback: (values: { email: string; password: string; rememberMe: boolean }) => void;
};

export const Login = (props: LoginPropsType): ReactElement => {
  const isAppInitializated = useSelector<AppRootStateType, boolean>(
    state => state.app.isAppInitializated,
  );
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);
  if (!isAppInitializated) {
    return <Loader />;
  }
  if (isAuth) {
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
