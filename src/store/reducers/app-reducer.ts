enum APP_ACTIONS_TYPES {
    SET_APP_IS_LOADING = 'APP/SET_APP_IS_LOADING',
    SET_APP_ERROR = 'APP/SET_APP_ERROR',
    SET_APP_INITIALIZED = 'APP/SET_INITIALIZED',
    SET_APP_INFO = 'APP/SET_APP_INFO',
}

type AppActions =
    | ReturnType<typeof setAppIsLoading>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setAppInitialized>
    | ReturnType<typeof setAppInfo>

export type AppInitialState = {
    isLoading: boolean
    isInitialized: boolean
    error: string
    info: string
}

const initialState: AppInitialState = {
    isLoading: false,
    isInitialized: false,
    error: '',
    info: ''
}

export const appReducer = (state = initialState, action: AppActions): AppInitialState => {
    switch (action.type) {
        case APP_ACTIONS_TYPES.SET_APP_INITIALIZED:
            return {...state, isInitialized: action.payload.status}
        case APP_ACTIONS_TYPES.SET_APP_IS_LOADING:
            return {...state, isLoading: action.payload.status}
        case APP_ACTIONS_TYPES.SET_APP_ERROR:
            return {...state, error: action.payload.error}
        case APP_ACTIONS_TYPES.SET_APP_INFO:
            return {...state, info: action.payload.info}
        default:
            return state
    }
}

export const setAppIsLoading = (status: boolean) => ({
    type: APP_ACTIONS_TYPES.SET_APP_IS_LOADING,
    payload: {status}
} as const)

export const setAppError = (error: string) => ({
    type: APP_ACTIONS_TYPES.SET_APP_ERROR,
    payload: {error}
} as const)

export const setAppInitialized = (status: boolean) => ({
    type: APP_ACTIONS_TYPES.SET_APP_INITIALIZED,
    payload: {status}
} as const)

export const setAppInfo = (info: string) => ({
    type: APP_ACTIONS_TYPES.SET_APP_INFO,
    payload: {info}
} as const)