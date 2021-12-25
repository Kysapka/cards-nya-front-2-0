import React, {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes} from 'react'
import s from './Checkbox.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CheckboxProps = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const Checkbox: FC<CheckboxProps> = props => {
    const {
        type,
        onChange,
        onChangeChecked,
        className,
        spanClassName,
        children,
        ...restProps
    } = props

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    const classNames = `${s.checkbox}${className ? className : ''}`

    return (
        <label className={s.label}>
            <input type={'checkbox'}
                   onChange={onChangeCallback}
                   className={classNames}
                   {...restProps}/>
            {children && <span>{children}</span>}
        </label>
    )
}