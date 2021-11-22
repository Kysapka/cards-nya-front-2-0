import React from 'react';

import { Form, Formik } from 'formik';
import rocketImg from 'n1-main/m1-ui/common/assets/Rocket.jpg';
import { Navigate } from 'react-router-dom';

import { PROFILE_ROUTE } from '../../../n1-main/m1-ui/routes/consts';

import { TextField } from './TextField';

type RegistrationPropsType = {
  isAuth: boolean;
  SignupSchema: any;
  callback: (email: string, password: string) => void;
  regState: any;
};
export const Registration = (props: RegistrationPropsType): React.ReactElement => {
  if (props.isAuth) {
    return <Navigate to={PROFILE_ROUTE} />;
  }
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
            validationSchema={props.SignupSchema}
            onSubmit={values => {
              const { email, password } = values;
              props.callback(email, password);
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
                {props.regState.email.length > 0 ? (
                  <h1 style={{ color: 'green' }}>
                    Register successful with e-mail: {props.regState.email}
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
