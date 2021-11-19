import React, { FC } from 'react';

import { ErrorMessage, useField } from 'formik';

type TextFieldPropsType = {
  label: string;
  name: string;
  type: string;
};

export const TextField: FC<TextFieldPropsType> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-2">
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && 'is-invalid'
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};
