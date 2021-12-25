import {authAPI, ChangeUsersInfoData, LoginData, RegistrationsData, UsersInfoResponse} from '../../api/auth-api'
import {AppDispatch} from '../store'
import {setAppInfo, setAppInitialized, setAppIsLoading} from './app-reducer'
import {passwordRecoveryMessage} from '../../utils/passwordRecoveryMessage'
import {errorsHandler} from '../../utils/errors'

enum AUTH_ACTIONS_TYPES {
    SET_REGISTRATION_SUCCESS = 'AUTH/SET_REGISTRATION_SUCCESS',
    SET_USERS_INFO = 'AUTH/SET_USERS_INFO',
    SET_IS_LOGGED_IN = 'AUTH/SET_IS_LOGGED_IN',
    SET_EMAIL_RECOVERY = 'AUTH/SET_EMAIL_RECOVERY',
    SET_SUCCESS_PASSWORD = 'AUTH/SET_SUCCESS_PASSWORD',
    SEND_RECOVERY_EMAIL_SUCCESS = 'AUTH/SEND_RECOVERY_EMAIL_SUCCESS',
}

type AuthActions =
    | ReturnType<typeof setRegistrationSuccess>
    | ReturnType<typeof setUsersInfo>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setEmailRecovery>
    | ReturnType<typeof setSuccessPassword>
    | ReturnType<typeof setSendEmailSuccess>

export type AuthInitialState = {
    registrationSuccess: boolean
    isLoggedIn: boolean
    recoveryEmail: string
    userInfo: UsersInfoResponse | null
    setSuccessNewPass: boolean
    sendSuccessEmail: boolean
}

const initialState: AuthInitialState = {
    registrationSuccess: false,
    isLoggedIn: false,
    recoveryEmail: '',
    userInfo: null,
    setSuccessNewPass: false,
    sendSuccessEmail: false,
}

export const authReducer = (state = initialState, action: AuthActions): AuthInitialState => {
    switch (action.type) {
        case AUTH_ACTIONS_TYPES.SET_REGISTRATION_SUCCESS:
            return {...state, registrationSuccess: action.payload.status}

        case AUTH_ACTIONS_TYPES.SET_USERS_INFO:
            return {...state, userInfo: action.payload}

        case AUTH_ACTIONS_TYPES.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.payload.status}

        case AUTH_ACTIONS_TYPES.SET_EMAIL_RECOVERY:
            return {...state, recoveryEmail: action.payload.email}

        case AUTH_ACTIONS_TYPES.SET_SUCCESS_PASSWORD:
            return {...state, setSuccessNewPass: action.payload.changePassSuccess}

        case AUTH_ACTIONS_TYPES.SEND_RECOVERY_EMAIL_SUCCESS:
            return {...state, sendSuccessEmail: action.payload.successSend}

        default:
            return state
    }
}

export const setRegistrationSuccess = (status: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_REGISTRATION_SUCCESS,
    payload: {status}
} as const)

export const setUsersInfo = (info: UsersInfoResponse | null) => ({
    type: AUTH_ACTIONS_TYPES.SET_USERS_INFO,
    payload: info
} as const)

export const setIsLoggedIn = (status: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_IS_LOGGED_IN,
    payload: {status}
} as const)

export const setEmailRecovery = (email: string) => ({
    type: AUTH_ACTIONS_TYPES.SET_EMAIL_RECOVERY,
    payload: {email}
} as const)

export const setSuccessPassword = (changePassSuccess: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_SUCCESS_PASSWORD,
    payload: {changePassSuccess}
} as const)

export const setSendEmailSuccess = (successSend: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SEND_RECOVERY_EMAIL_SUCCESS,
    payload: {successSend}
} as const)

export const registration = (registrationsData: RegistrationsData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppIsLoading(true))
        await authAPI.registration(registrationsData)
        dispatch(setRegistrationSuccess(true))
        dispatch(setAppInfo(`Successful! Now you can login!`))
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setRegistrationSuccess(false))
        dispatch(setAppIsLoading(false))
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppIsLoading(true))
        const response = await authAPI.logout()
        dispatch(setUsersInfo(null))
        dispatch(setIsLoggedIn(false))
        dispatch(setAppInfo(response.data.info))
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppIsLoading(true))
        const response = await authAPI.checkAuth()
        dispatch(setUsersInfo(response.data))
        dispatch(setIsLoggedIn(true))
    } catch (e) {
        errorsHandler('', dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
        dispatch(setAppInitialized(true))
    }
}

export const changeUsersInfo = (info: ChangeUsersInfoData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppIsLoading(true))
        const response = await authAPI.changeUsersInfo(info)
        dispatch(setUsersInfo(response.data.updatedUser))
        dispatch(setAppInfo('You\'ve successfully changed your info!'))
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const login = (loginData: LoginData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppIsLoading(true))
        const response = await authAPI.login(loginData)
        dispatch(setUsersInfo(response.data))
        dispatch(setIsLoggedIn(true))
        dispatch(setAppInfo(`Successful login, ${response.data.name}`))
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const passwordRecovery = (email: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppIsLoading(true))
        const response = await authAPI.passwordRecovery(passwordRecoveryMessage(email))
        dispatch(setSendEmailSuccess(true))
        dispatch(setAppInfo(response.data.info))
        dispatch(setEmailRecovery(email))
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
        dispatch(setSendEmailSuccess(false))
    }
}

export const newPassword = (password: string, resetPasswordToken: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppIsLoading(true))
        const response = await authAPI.newPassword({password, resetPasswordToken})
        if (response.status === 200) {
            dispatch(setSuccessPassword(true))
            dispatch(setAppInfo(response.data.info))
        }
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}