import React from 'react';

import { Form, Formik } from 'formik';
import rocketImg from 'n1-main/m1-ui/common/assets/Rocket.jpg';
import { Navigate } from 'react-router-dom';

import { PROFILE_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { ModalInfo } from '../modalWindow/ModaInfo';
import { ModalError } from '../modalWindow/ModalError';

import { SignupSchemaRegistrationType } from './RegistrationContainer';
import { TextField } from './TextField';

type RegistrationPropsType = {
  textError: string;
  Info: boolean;
  textInfo: string;
  Error: boolean;
  isAuth: boolean;
  SignupSchema: SignupSchemaRegistrationType;
  callback: (email: string, password: string) => void;
  regState: { email: string; password: string };
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
                {props.Error && (
                  <ModalError error={props.textError} email={props.regState.email} />
                )}
                {props.Info && (
                  <ModalInfo text={props.textInfo} email={props.regState.email} />
                )}
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
