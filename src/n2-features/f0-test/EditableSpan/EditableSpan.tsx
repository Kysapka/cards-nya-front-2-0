import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

export type PropsType = {
  name: string;
  thunk: (params: string) => void;
};

export const EditableSpan = (props: PropsType): React.ReactElement => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>(props.name);
  const [editMode, setEditMode] = useState<boolean>(false);
  const onEditMode = (): void => {
    setEditMode(true);
  };
  const offEditMode = (): void => {
    setEditMode(false);
    dispatch(props.thunk(title));
  };
  const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      offEditMode();
    }
  };

  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    console.dir('click');
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <input
      /* eslint-disable-next-line jsx-a11y/no-autofocus */
      autoFocus
      value={title}
      onKeyPress={onKeyHandler}
      onBlur={offEditMode}
      onChange={onTitleChangeHandler}
    />
  ) : (
    <span onDoubleClick={onEditMode}>{title}</span>
  );
};
