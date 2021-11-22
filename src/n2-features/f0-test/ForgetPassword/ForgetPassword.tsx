import React from 'react';

import { Form, Formik } from 'formik';
import { Navigate } from 'react-router-dom';

import rocketImg from '../../../n1-main/m1-ui/common/assets/Rocket.jpg';
import { PROFILE_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { ModalInfo } from '../modalWindow/ModaInfo';
import { ModalError } from '../modalWindow/ModalError';
import { TextField } from '../Registration/TextField';

type ForgetPasswordPropsType = {
  Info: boolean;
  textInfo: string;
  isAuth: boolean;
  Error: boolean;
  email: string;
  textError: string;
  SignupSchema: any;
  callback: (email: string) => void;
};
export const ForgetPassword = (props: ForgetPasswordPropsType): React.ReactElement => {
  if (props.isAuth) {
    return <Navigate to={PROFILE_ROUTE} />;
  }
  return (
    <div className="container mt-3" id="213213123123">
      {props.Error && <ModalError error={props.textError} email={props.email} />}
      {props.Info && <ModalInfo text={props.textInfo} email={props.email} />}
      <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={props.SignupSchema}
            onSubmit={values => {
              const { email } = values;
              props.callback(email);
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
