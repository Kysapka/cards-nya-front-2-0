import {PATH} from '../routes/routes'
import {PasswordRecoveryData} from '../api/auth-api'
import {developmentMode} from '../api/axios-instance'

export const passwordRecoveryMessage = (email: string) => {
    const targetLink = developmentMode
        ? `http://localhost:3000/cards-react/#${PATH.NEW_PASSWORD}/$token$`
        : `https://aportraitofjoyce.github.io/cards-react/#${PATH.NEW_PASSWORD}/$token$`

    const payload: PasswordRecoveryData = {
        email,
        from: 'test-front-admin, <cards@gmail.com>',
        message: `<div style='background-color: #ffb700; padding: 16px'>Password recovery link: <a href='${targetLink}'>link</a></div>`
    }

    return payload
}
