import React from 'react';

import { Form, Formik } from 'formik';

import rocketImg from '../../../n1-main/m1-ui/common/assets/Rocket.jpg';
import { ModalInfo } from '../modalWindow/ModaInfo';
import { ModalError } from '../modalWindow/ModalError';
import { TextField } from '../Registration/TextField';

import { SignupSchemaRecoveryPasswordType } from './RecoveryPasswordContainer';

type RecoveryPasswordPropsType = {
  Info: boolean;
  textInfo: string;
  Error: boolean;
  textError: string;
  SignupSchema: SignupSchemaRecoveryPasswordType;
  callback: (password: string) => void;
};
export const RecoveryPassword = (
  props: RecoveryPasswordPropsType,
): React.ReactElement => (
  <div className="container mt-3">
    <div className="row">
      <div className="col-md-5">
        <Formik
          initialValues={{
            password: '',
          }}
          validationSchema={props.SignupSchema}
          onSubmit={values => {
            const { password } = values;
            props.callback(password);
          }}
        >
          {() => (
            <div>
              <h1 className="my-4 font-weght-bold display-4">Create new password</h1>
              {props.Error && <ModalError error={props.textError} />}
              {props.Info && <ModalInfo text={props.textInfo} />}
              <Form>
                <TextField label="Password" name="password" type="password" />
                <TextField
                  label="Confirm password"
                  name="confirmPassword"
                  type="password"
                />
                <button className="btn btn-dark mt-3" type="submit">
                  Accept
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
