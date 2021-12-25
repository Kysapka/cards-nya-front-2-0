import {
    AuthInitialState,
    authReducer,
    setEmailRecovery,
    setIsLoggedIn,
    setRegistrationSuccess, setSendEmailSuccess,
    setSuccessPassword, setUsersInfo
} from '../auth-reducer'


let startState: AuthInitialState

beforeEach(() => {
    startState = {
        registrationSuccess: false,
        isLoggedIn: false,
        recoveryEmail: '',
        userInfo:  {
            email: '',
            name: '',
            avatar: '',
            publicCardPacksCount: 0,
            _id:'31'

        },
        setSuccessNewPass: false,
        sendSuccessEmail: false
    }
})

describe('Auth reducer', () => {
    it('Registration was successful', () => {
        const action = setRegistrationSuccess(true)

        const endState = authReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.registrationSuccess).toBeTruthy()
    })
    it('Successfully logged in', () => {
        const action = setIsLoggedIn(true)

        const endState = authReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.isLoggedIn).toBeTruthy()
    })
    it('Email for password recovery has been created', () => {
        const action = setEmailRecovery('some@gmail.com')

        const endState = authReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.recoveryEmail).toBe('some@gmail.com')
    })
    it('New password has been successfully changed', () => {
        const action = setSuccessPassword(true)

        const endState = authReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.setSuccessNewPass).toBeTruthy()
    })

    it('User information should be set in state', () => {
        const testData = {
            _id: '1223434535435',
            email: 'some@gmail.com',
            name: 'Nyanya',
            avatar: 'dgfdg',
            publicCardPacksCount: 3,
            created: new Date(),
            updated: new Date(),
            isAdmin: false,
            verified: true,
            rememberMe: true,
            error: '',
        }

        const action = setUsersInfo(testData)

        const endState = authReducer(startState, action)

        expect(endState).not.toBe(startState)
        expect(endState.userInfo?.name).toBe('Nyanya')
        expect(endState.userInfo?.email).toBe('some@gmail.com')
        expect(endState.userInfo?.publicCardPacksCount).toBe(3)
    })

    it('Recovery email success send', () => {
        const action = setSendEmailSuccess(true)

        const endState = authReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.sendSuccessEmail).toBeTruthy()
    })
})