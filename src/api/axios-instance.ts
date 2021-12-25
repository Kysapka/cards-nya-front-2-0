import axios from 'axios';

export const developmentMode = false

export const instance = axios.create({
    baseURL: developmentMode ? process.env.REACT_APP_DEVELOPMENT_MODE_BASE_URL : process.env.REACT_APP_BASE_URL,
    withCredentials: true
})