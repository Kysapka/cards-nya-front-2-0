import {instance} from './axios-instance'
import axios, {AxiosResponse} from 'axios'

export type LoginData = {
    email: string,
    password: string,
    rememberMe: boolean
}

export type RegistrationsData = {
    email: string
    password: string
}

export type ChangeUsersInfoData = {
    name?: string
    avatar?: string
}

export type PasswordRecoveryData = {
    email: string,
    from: string,
    message: string
}

export type NewPasswordData = {
    password: string,
    resetPasswordToken: string | undefined
}

type LogoutResponse = {
    info: string
    error?: string
}

export type UsersInfoResponse = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
}

type UpdateUserResponse = {
    updatedUser: UsersInfoResponse
    error?: string
}

export type PasswordResponse = {
    info: string,
    error: string
}

export const authAPI = {
    registration: (payload: RegistrationsData) => instance
        .post<RegistrationsData, AxiosResponse<{ error?: string }>>('/auth/register', payload),

    logout: () => instance
        .delete<LogoutResponse>('/auth/me'),

    checkAuth: () => instance
        .post<{}, AxiosResponse<UsersInfoResponse>>('/auth/me', {}),

    changeUsersInfo: (payload: ChangeUsersInfoData) => instance
        .put<ChangeUsersInfoData, AxiosResponse<UpdateUserResponse>>('/auth/me', payload),

    login: (payload: LoginData) => instance
        .post<LoginData, AxiosResponse<UsersInfoResponse>>(`/auth/login`, payload),

    passwordRecovery: (payload: PasswordRecoveryData) => axios
        .post<PasswordRecoveryData, AxiosResponse<PasswordResponse>>('https://neko-back.herokuapp.com/2.0/auth/forgot', payload),

    newPassword: (payload: NewPasswordData) => axios
        .post<NewPasswordData, AxiosResponse<PasswordResponse>>(`https://neko-back.herokuapp.com/2.0/auth/set-new-password`, payload)
}