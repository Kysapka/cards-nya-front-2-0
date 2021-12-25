import React, {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import s from './Input.module.css'
import {EyeIcon} from '../../Icons/EyeIcon'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextProps = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    password?: boolean
}

export const Input: FC<InputTextProps> = props => {
    const {
        type,
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        className,
        spanClassName,
        password,
        ...restProps
    } = props

    const [isPassword, setIsPassword] = useState(!password)

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)
        onEnter && e.key === 'Enter' && onEnter()
    }

    const inputClassNames = `${s.input}${error ? s.errorInput : ''}${className ? className : ''}`
    const spanClassNames = `${s.error}${spanClassName ? spanClassName : ''}`

    return (
        <div className={s.container}>
            <input type={password && isPassword ? 'text' : type}
                   onChange={onChangeCallback}
                   onKeyPress={onKeyPressCallback}
                   className={inputClassNames}
                   placeholder={'Enter some text...'}
                   {...restProps}/>
            {password && <div className={s.eye} onClick={() => setIsPassword(!isPassword)}><EyeIcon/></div>}
            {error && <span className={spanClassNames}>{error}</span>}
        </div>
    )
}