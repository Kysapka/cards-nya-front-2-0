import axios from 'axios'

// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': ''
//     }
// }

const instance = axios.create({
    baseURL: '',
    // ...settings
})

export const appAPI = {
    fakeRequest (param: string) {
        return instance.post<string, ResponseType>('', {param})
    }
}

type ResponseType = {
    resultCode: number
    data: {}
}