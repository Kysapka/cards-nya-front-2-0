import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react'
import {Input} from '../Input/Input'
import s from './EditableElement.module.css'

type EditableElementProps = {
    defaultValue: string
    onEditHandler: (title: string) => void
}

export const EditableElement: FC<EditableElementProps> = props => {
    const {onEditHandler, defaultValue, children} = props
    const [value, setValue] = useState(defaultValue)
    const [editMode, setEditMode] = useState(false)

    const turnOnEditMode = () => setEditMode(true)

    const turnOffEditMode = () => {
        setEditMode(false)
        onEditHandler(value)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') turnOffEditMode()
    }

    return (
        editMode
            ? <Input value={value}
                     onBlur={turnOffEditMode}
                     onChange={onChangeHandler}
                     onKeyPress={onKeyPressHandler}
                     autoFocus/>
            : <div onDoubleClick={turnOnEditMode} className={s.element}>{children}</div>
    )
}