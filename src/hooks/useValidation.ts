import {ChangeEvent, useEffect, useState} from 'react'

export const useInput = (initialValue: string, validators: Validators) => {
    const [value, setValue] = useState(initialValue)
    const [touched, setTouched] = useState(false)
    const validation = useValidation(value, validators)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onBlur = () => setTouched(true)

    return {
        value,
        touched,
        onChange,
        onBlur,
        validation
    }
}

type Validators = {
    isRequired?: boolean
    minLength?: number
    maxLength?: number
    isEmail?: boolean
}

export const useValidation = (value: string, validators: Validators) => {
    const [isValid, setIsValid] = useState(false)

    const [isRequired, setIsRequired] = useState('')
    const [isEmail, setIsEmail] = useState('')
    const [minLength, setMinLength] = useState('')
    const [maxLength, setMaxLength] = useState('')

    useEffect(() => {
        for (const validator in validators) {
            switch (validator) {
                case 'isRequired':
                    !value
                        ? setIsRequired('Field is required')
                        : setIsRequired('')
                    break

                case 'minLength':
                    value.length < validators[validator]!
                        ? setMinLength(`Min length must be more than ${validators[validator]!}`)
                        : setMinLength('')
                    break

                case 'maxLength':
                    value.length > validators[validator]!
                        ? setMaxLength(`Max length must be less than ${validators[validator]!}`)
                        : setMaxLength('')
                    break

                case 'isEmail':
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        .test(String(value).toLowerCase())
                        ? setIsEmail('')
                        : setIsEmail('Wrong email address')
                    break

            }
        }
    }, [value, validators])

    useEffect(() => {
        (isRequired || isEmail || minLength || maxLength) ? setIsValid(false) : setIsValid(true)
    }, [isRequired, isEmail, minLength, maxLength])

    return {
        isValid,
        isRequired,
        isEmail,
        minLength,
        maxLength
    }
}