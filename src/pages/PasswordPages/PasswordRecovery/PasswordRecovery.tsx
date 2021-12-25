import React, {FC, FormEvent, useState} from 'react'
import {Button} from '../../../components/UI/Button/Button'
import {Input} from '../../../components/UI/Input/Input'
import {useDispatch} from 'react-redux'
import {passwordRecovery} from '../../../store/reducers/auth-reducer'
import {useTypedSelector} from '../../../hooks/hooks'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../../routes/routes'

export const PasswordRecovery: FC = () => {
    const sendSuccessEmail = useTypedSelector(state => state.auth.sendSuccessEmail)
    const [email, setEmail] = useState<string>('')
    const dispatch = useDispatch()

    const onsubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(passwordRecovery(email))
    }

    if (sendSuccessEmail) return <Redirect to={PATH.CHECK_EMAIL}/>

    return (
        <div>
            <h1>Forgot your password?</h1>

            <form onSubmit={onsubmit}>
                <label htmlFor={'password-recovery-email'}>
                    Enter your address and we will send you further instructions
                    <Input type={'email'}
                           id={'password-recovery-email'}
                           placeholder={'Enter your email...'}
                           value={email}
                           onChange={e => setEmail(e.currentTarget.value)}/>
                </label>

                <Button>Send instructions</Button>
            </form>
        </div>
    )
}