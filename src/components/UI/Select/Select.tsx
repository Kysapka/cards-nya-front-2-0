import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent, FC} from 'react'
import s from './Select.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options: number[] | string[]
    onChangeOption: (option: string) => void
}

export const Select: FC<SuperSelectPropsType> = props => {
    const {options, onChange, onChangeOption, ...restProps} = props

    const mappedOptions = options ? options.map(option => (
        <option key={option} value={option}>
            {option}
        </option>
    )) : []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    return (
        <select onChange={onChangeCallback} className={s.select} {...restProps}>
            {mappedOptions}
        </select>
    )
}