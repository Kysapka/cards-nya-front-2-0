import React, {FC, FormEvent, useState} from 'react'
import {Input} from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {Checkbox} from '../../components/UI/Checkbox/Checkbox'
import {Link, Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../hooks/hooks'
import {login} from '../../store/reducers/auth-reducer'

export const Login: FC = () => {
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        email: '',
        password: '',
        rememberMe: false
    })

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(login({...values}))
    }

    if (isLoggedIn) return <Redirect to={PATH.PROFILE}/>

    return (
        <div>
            <h1>Sign In</h1>

            <form onSubmit={onSubmit}>
                <label htmlFor='login-email'>
                    Email
                    <Input id={'login-email'}
                           type={'email'}
                           placeholder={'Enter your email address...'}
                           value={values.email}
                           onChange={e => setValues({...values, email: e.currentTarget.value})}/>
                </label>

                <label htmlFor='login-password'>
                    Password
                    <Input id={'login-password'}
                           type={'password'}
                           placeholder={'Enter your password...'}
                           value={values.password}
                           password
                           onChange={e => setValues({...values, password: e.currentTarget.value})}/>
                </label>

                <Checkbox checked={values.rememberMe}
                          onChange={e => setValues({...values, rememberMe: e.currentTarget.checked})}>
                    Remember me
                </Checkbox>

                <Button type={'submit'}>Login</Button>

                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', marginTop: 32}}>
                    <Link to={PATH.PASSWORD_RECOVERY}><h4>Forgot your password?</h4></Link>
                    <Link to={PATH.REGISTRATION}><h4>Don’t have an account? Sign Up!</h4></Link>
                    <div style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16}}>
                        <p>Or use next data to login:</p>
                        <p>aportraitofjoyce@gmail.com</p>
                        <p>123456789</p>
                    </div>
                </div>
            </form>
        </div>
    )
}