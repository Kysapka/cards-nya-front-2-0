import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react'
import s from './Button.module.css'
import {useTypedSelector} from '../../../hooks/hooks'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonProps = DefaultButtonPropsType & {
    secondary?: boolean
    grouped?: boolean
}

export const Button: FC<ButtonProps> = props => {
    const isLoading = useTypedSelector(state => state.app.isLoading)

    const {secondary, className, grouped, disabled, ...restProps} = props
    const classNames = `${secondary ? s.secondary : ''}${grouped ? s.grouped : ''}${className ? className : ''}`

    return <button className={classNames} disabled={disabled || isLoading} {...restProps}/>
}