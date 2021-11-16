import React from 'react';

import { Field, Form, Formik } from 'formik';
import { AppRootStateType } from 'n1-main/m2-bll';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import rocketImg from '../../../n1-main/m1-ui/common/assets/Rocket.jpg';
import { ProfileStateType } from '../Profile/Profile-Reducer';
import { TextField } from '../Registration/TextField';

import { loginInThunk } from './LoginReducer';

export const Login = (): React.ReactElement => {
  const profileState = useSelector<AppRootStateType, ProfileStateType>(
    state => state.profile,
  );
  const dispatch = useDispatch();
  const SignupSchema = yup
    .object({
      email: yup.string().email('email is invalid').required('email is required'),
      password: yup
        .string()
        .min(7, 'password must be at least 7 character')
        .required('password is required'),
    })
    .required();
  const n = useNavigate();
  if (!profileState.verified) n('/profile');
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={{
              email: '',
              password: '',
              rememberMe: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              // const { email, password, rememberMe } = values;
              dispatch(testThunk(values));
            }}
          >
            {() => (
              <div>
                <h1 className="my-4 font-weght-bold display-4">LOGIN</h1>
                <Form>
                  <TextField label="E-mail" name="email" type="text" />
                  <TextField label="Password" name="password" type="password" />
                  <div>
                    <Field type="checkbox" name="rememberMe" />
                  </div>
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
