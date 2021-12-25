import axios from 'axios'

export const developmentMode = false

export const instance = axios.create({
    baseURL: developmentMode ? 'http://localhost:7542/2.0' : 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})