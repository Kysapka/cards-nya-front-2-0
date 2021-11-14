import React from 'react';

import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import rocketImg from '../../../n1-main/m1-ui/common/assets/Rocket.jpg';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { TextField } from '../Registration/TextField';

import { CheckMail } from './CheckMail';
import { initRecoveryStateType, RecoveryPassThunk } from './RecoveryPassReducer';

export const RecoveryPass = (): React.ReactElement => {
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
  const renderContent = !recovereState.toggle ? (
    <br />
  ) : (
    <CheckMail error={recovereState.error} />
  );
  return (
    <div className="container mt-3">
      {renderContent}
      <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              const { email } = values;
              console.log(email);
              dispatch(RecoveryPassThunk(email));
            }}
          >
            {() => (
              <div>
                <h1 className="my-4 font-weght-bold display-4">Recovery password</h1>
                <Form>
                  <TextField label="E-mail" name="email" type="text" />
                  <button className="btn btn-dark mt-3" type="submit">
                    Register
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
