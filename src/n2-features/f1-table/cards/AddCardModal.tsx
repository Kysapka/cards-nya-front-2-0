import React from 'react';

import { Formik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { AppRootStateType } from '../../../n1-main/m2-bll';

import { AddCardsThunk, initCardsStateType, ShowCardModalAC } from './CardsReducer';

export const AddCardModal = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { _idPackCards, add } = useSelector<AppRootStateType, initCardsStateType>(
    state => state.cards,
  );
  const SignupSchema = yup
    .object({
      answer: yup
        .string()
        .min(3, 'answer must be at least 3 character')
        .required('answer is required'),
      question: yup
        .string()
        .min(1, 'question must be at least 1 character')
        .required('confirm question is required'),
    })
    .required();
  return (
    <Modal show={add}>
      <Modal.Header closeButton>
        <Modal.Title>Add Card</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ answer: '', question: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(AddCardsThunk(_idPackCards!, values.question, values.answer));
          dispatch(ShowCardModalAC(false));
        }}
        onReset={() => {
          dispatch(ShowCardModalAC(false));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          handleReset,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                  type="answer"
                  name="answer"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.answer}
                  placeholder="Input answer please"
                />
                {errors.answer && touched.answer && errors.answer}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="question"
                  name="question"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.question}
                  as="textarea"
                  rows={3}
                  placeholder="Input question please"
                />
                {errors.question && touched.question && errors.question}
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" type="reset" onClick={handleReset}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Apply
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
