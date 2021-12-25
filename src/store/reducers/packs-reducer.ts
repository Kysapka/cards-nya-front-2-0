import {
    CardsPack,
    CardsPackResponse,
    DeleteCardsPackData,
    GetCardPacksQueryParams,
    NewCardsPackData,
    packsAPI,
    UpdateCardsPackData
} from '../../api/packs-api'
import {AppDispatch, RootState, ThunkType} from '../store'
import {setAppIsLoading} from './app-reducer'
import {errorsHandler} from '../../utils/errors'

enum PACKS_ACTIONS_TYPES {
    SET_CARD_PACKS = 'PACKS/SET_CARD_PACKS',
    SET_PACKS_CURRENT_PAGE = 'PACKS/SET_PACKS_CURRENT_PAGE',
    SET_PACKS_COUNT_ON_PAGE = 'PACKS/SET_PACKS_COUNT_ON_PAGE',
    SET_PACKS_TOTAL_COUNT = 'PACKS/SET_PACKS_TOTAL_COUNT',
    SET_MIN_MAX_CARDS_COUNT = 'PACKS/SET_MIN_MAX_CARDS_COUNT',
    SET_CURRENT_CARDS_COUNT = 'PACKS/SET_CURRENT_CARDS_COUNT',
    SET_PRIVATE_PACKS = 'PACKS/SET_PRIVATE_PACKS',
    SET_SORT_CARD_PACKS_METHOD = 'PACKS/SET_SORT_CARD_PACKS_METHOD'
}

export type PacksActionsTypes =
    | ReturnType<typeof setCardPacks>
    | ReturnType<typeof setPacksCurrentPage>
    | ReturnType<typeof setPacksCountOnPage>
    | ReturnType<typeof setPacksTotalCount>
    | ReturnType<typeof setMinMaxCardsCount>
    | ReturnType<typeof setPrivatePacks>
    | ReturnType<typeof setSortCardsPackMethod>
    | ReturnType<typeof setCurrentCardsCount>


export type PacksInitialState = CardsPackResponse & {
    privatePacks: boolean
    sortPacksMethod: string | undefined
    currentCardsCount: number[]
    countPerPage: number[]
}

export const initialState: PacksInitialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 1,
    pageCount: 10,
    privatePacks: false,
    sortPacksMethod: undefined,
    currentCardsCount: [0, 0],
    countPerPage: [10, 25, 50]
}

export const packsReducer = (state = initialState, action: PacksActionsTypes): PacksInitialState => {
    switch (action.type) {
        case PACKS_ACTIONS_TYPES.SET_CARD_PACKS:
            return {...state, ...action.payload}

        case PACKS_ACTIONS_TYPES.SET_PACKS_CURRENT_PAGE:
            return {...state, page: action.payload.page}

        case PACKS_ACTIONS_TYPES.SET_PACKS_COUNT_ON_PAGE:
            return {...state, pageCount: action.payload.count}

        case PACKS_ACTIONS_TYPES.SET_MIN_MAX_CARDS_COUNT:
            return {...state, minCardsCount: action.payload.values[0], maxCardsCount: action.payload.values[1]}

        case PACKS_ACTIONS_TYPES.SET_PACKS_TOTAL_COUNT:
            return {...state, cardPacksTotalCount: action.payload.count}

        case PACKS_ACTIONS_TYPES.SET_PRIVATE_PACKS:
            return {...state, privatePacks: action.payload.value}

        case PACKS_ACTIONS_TYPES.SET_SORT_CARD_PACKS_METHOD:
            return {...state, sortPacksMethod: action.payload.sortCardPacksMethod, page: 1}

        case PACKS_ACTIONS_TYPES.SET_CURRENT_CARDS_COUNT:
            return {...state, currentCardsCount: [...action.payload.values]}

        default:
            return state
    }
}

export const setCardPacks = (payload: CardsPackResponse) => ({
    type: PACKS_ACTIONS_TYPES.SET_CARD_PACKS,
    payload
} as const)

export const setPacksCurrentPage = (payload: { page: number }) => ({
    type: PACKS_ACTIONS_TYPES.SET_PACKS_CURRENT_PAGE,
    payload
} as const)

export const setPacksCountOnPage = (payload: { count: number }) => ({
    type: PACKS_ACTIONS_TYPES.SET_PACKS_COUNT_ON_PAGE,
    payload
} as const)

export const setPacksTotalCount = (payload: { count: number }) => ({
    type: PACKS_ACTIONS_TYPES.SET_PACKS_TOTAL_COUNT,
    payload
} as const)

export const setMinMaxCardsCount = (payload: { values: number[] }) => ({
    type: PACKS_ACTIONS_TYPES.SET_MIN_MAX_CARDS_COUNT,
    payload
} as const)

export const setCurrentCardsCount = (payload: { values: number[] }) => ({
    type: PACKS_ACTIONS_TYPES.SET_CURRENT_CARDS_COUNT,
    payload
} as const)

export const setPrivatePacks = (payload: { value: boolean }) => ({
    type: PACKS_ACTIONS_TYPES.SET_PRIVATE_PACKS,
    payload
} as const)

export const setSortCardsPackMethod = (payload: { sortCardPacksMethod: string }) => ({
    type: PACKS_ACTIONS_TYPES.SET_SORT_CARD_PACKS_METHOD, payload
} as const)

export const fetchCardPacks = (payload?: GetCardPacksQueryParams) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const packs = getState().packs
    const userID = packs.privatePacks && getState().auth.userInfo?._id
    try {
        dispatch(setAppIsLoading(true))

        const response = await packsAPI.getCardPacks({
            page: packs.page,
            pageCount: packs.pageCount,
            min: packs.currentCardsCount[0],
            max: packs.currentCardsCount[1],
            packName: payload?.packName || undefined,
            user_id: userID || undefined,
            sortPacks: packs.sortPacksMethod
        })
        dispatch(setCardPacks(response.data))
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const createCardsPack = (payload: NewCardsPackData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await packsAPI.createCardsPack(payload)
        await dispatch(fetchCardPacks())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const deleteCardsPack = (payload: DeleteCardsPackData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await packsAPI.deleteCardsPack(payload)
        await dispatch(fetchCardPacks())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const updateCardsPack = (payload: UpdateCardsPackData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await packsAPI.updateCardsPack(payload)
        await dispatch(fetchCardPacks())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}