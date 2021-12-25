import React, {FC, FormEvent, useState} from 'react'
import {Button} from '../../../components/UI/Button/Button'
import {Input} from '../../../components/UI/Input/Input'
import {Redirect, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {newPassword} from '../../../store/reducers/auth-reducer'
import {useTypedSelector} from '../../../hooks/hooks'
import {PATH} from '../../../routes/routes'
import {setAppError} from '../../../store/reducers/app-reducer'

export const NewPassword: FC = () => {
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()
    const successChangePassword = useTypedSelector(state => state.auth.setSuccessNewPass)

    const [values, setValues] = useState({
        password: '',
        confirmPassword: ''
    })

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        values.password === values.confirmPassword
            ? dispatch(newPassword(values.password, token))
            : dispatch(setAppError('CHECK YOUR PASSWORDS!'))
    }

    if (successChangePassword) return <Redirect to={PATH.LOGIN}/>

    return (
        <div>
            <h1>Create new password</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor={'password-recovery-new-password'}>
                    New Password
                    <Input id={'password-recovery-new-password'}
                           type={'password'}
                           placeholder={'Enter new password...'}
                           value={values.password}
                           onChange={e => setValues({...values, password: e.currentTarget.value})}/>
                </label>

                <label htmlFor={'password-recovery-new-confirm-password'}>
                    Confirm New Password
                    <Input id={'password-recovery-new-confirm-password'}
                           type={'password'}
                           placeholder={'Confirm new password...'}
                           value={values.confirmPassword}
                           onChange={e => setValues({...values, confirmPassword: e.currentTarget.value})}/>
                </label>

                <Button type={'submit'}>Create new password</Button>
            </form>
        </div>
    )
}
