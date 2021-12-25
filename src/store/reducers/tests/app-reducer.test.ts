import {appReducer, AppInitialState, setAppError, setAppInitialized, setAppIsLoading} from '../app-reducer'

let startState: AppInitialState

beforeEach(() => {
    startState = {
        isLoading: false,
        error: '',
        info: '',
        isInitialized: false
    }
})

describe('App reducer', () => {
    it('App Status should be change', () => {
        const action = setAppIsLoading(true)

        const endState = appReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.isLoading).toBe(true)
    })

    it('Error must be fixed', () => {
        const action = setAppError('Some Error')

        const endState = appReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.error).toBe('Some Error')
    })
    it('App should initialized', () => {
        const action = setAppInitialized(true)
        const endState = appReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.isInitialized).toBeTruthy()
    })
})