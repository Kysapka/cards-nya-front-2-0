import {
    Card,
    cardsAPI,
    CardsResponse,
    DeleteCardData,
    GetCardsQueryParams, GradeData,
    NewCardData,
    UpdateCardData
} from '../../api/cards-api'
import {AppDispatch, RootState, ThunkType} from '../store'
import {setAppIsLoading} from './app-reducer'
import {errorsHandler} from '../../utils/errors'

enum CARDS_ACTIONS_TYPES {
    SET_CARDS = 'CARDS/SET_CARDS',
    SET_CURRENT_CARDS_PACK_ID = 'CARDS/SET_CURRENT_CARDS_PACK_ID',
    SET_CARDS_CURRENT_PAGE = 'CARDS/SET_CARDS_CURRENT_PAGE',
    SET_CARDS_COUNT_ON_PAGE = 'CARDS/SET_CARDS_COUNT_ON_PAGE',
    SET_CARDS_TOTAL_COUNT = 'CARDS/SET_CARDS_TOTAL_COUNT',
    SET_MIN_MAX_GRADE = 'CARDS/SET_MIN_MAX_GRADE',
    SET_CURRENT_GRADE = 'CARDS/SET_CURRENT_GRADE',
    SET_SORT_CARDS_METHOD = 'CARDS/SET_SORT_CARDS_METHOD',
}

type CardsActions =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setCurrentCardsPackID>
    | ReturnType<typeof setCardsCurrentPage>
    | ReturnType<typeof setCardsCountOnPage>
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setMinMaxGrade>
    | ReturnType<typeof setSortCardsMethod>
    | ReturnType<typeof setCurrentGrade>

export type CardsInitialState = CardsResponse & {
    currentCardsPackID: string
    sortCardsMethod: string | undefined
    currentGrade: number[]
    countPerPage: number[]
}

const initialState: CardsInitialState = {
    cards: [],
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0,
    packUserId: '',
    minGrade: 0,
    maxGrade: 0,
    currentCardsPackID: '',
    sortCardsMethod: undefined,
    currentGrade: [0, 0],
    countPerPage: [10, 25, 50]
}

export const cardsReducer = (state = initialState, action: CardsActions): CardsInitialState => {
    switch (action.type) {
        case CARDS_ACTIONS_TYPES.SET_CARDS:
            return {...state, ...action.payload}

        case CARDS_ACTIONS_TYPES.SET_CURRENT_CARDS_PACK_ID:
            return {...state, currentCardsPackID: action.payload.id}

        case CARDS_ACTIONS_TYPES.SET_CARDS_CURRENT_PAGE:
            return {...state, page: action.payload.page}

        case CARDS_ACTIONS_TYPES.SET_CARDS_COUNT_ON_PAGE:
            return {...state, pageCount: action.payload.count}

        case CARDS_ACTIONS_TYPES.SET_CARDS_TOTAL_COUNT:
            return {...state, cardsTotalCount: action.payload.count}

        case CARDS_ACTIONS_TYPES.SET_MIN_MAX_GRADE:
            return {...state, minGrade: action.payload.values[0], maxGrade: action.payload.values[1]}

        case CARDS_ACTIONS_TYPES.SET_SORT_CARDS_METHOD:
            return {...state, sortCardsMethod: action.payload.sortCarsMethod, page: 1}

        case CARDS_ACTIONS_TYPES.SET_CURRENT_GRADE:
            return {...state, currentGrade: [...action.payload.values]}

        default:
            return state
    }
}

const setCards = (payload: CardsResponse) => ({
    type: CARDS_ACTIONS_TYPES.SET_CARDS,
    payload
} as const)

export const setCardsCurrentPage = (payload: { page: number }) => ({
    type: CARDS_ACTIONS_TYPES.SET_CARDS_CURRENT_PAGE,
    payload
} as const)

export const setCardsCountOnPage = (payload: { count: number }) => ({
    type: CARDS_ACTIONS_TYPES.SET_CARDS_COUNT_ON_PAGE,
    payload
} as const)

export const setCardsTotalCount = (payload: { count: number }) => ({
    type: CARDS_ACTIONS_TYPES.SET_CARDS_TOTAL_COUNT,
    payload
} as const)

export const setCurrentCardsPackID = (payload: { id: string }) => ({
    type: CARDS_ACTIONS_TYPES.SET_CURRENT_CARDS_PACK_ID,
    payload
} as const)

export const setMinMaxGrade = (payload: { values: number[] }) => ({
    type: CARDS_ACTIONS_TYPES.SET_MIN_MAX_GRADE,
    payload
} as const)

export const setCurrentGrade = (payload: { values: number[] }) => ({
    type: CARDS_ACTIONS_TYPES.SET_CURRENT_GRADE,
    payload
} as const)

export const setSortCardsMethod = (payload: { sortCarsMethod: string }) => ({
    type: CARDS_ACTIONS_TYPES.SET_SORT_CARDS_METHOD, payload
} as const)

export const fetchCards = (payload?: GetCardsQueryParams) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const cards = getState().cards
    try {
        dispatch(setAppIsLoading(true))
        const response = await cardsAPI.getCards({
            cardsPack_id: cards.currentCardsPackID || payload?.cardsPack_id,
            page: cards.page,
            pageCount: payload?.pageCount || cards.pageCount,
            min: cards.currentGrade[0],
            max: cards.currentGrade[1],
            cardQuestion: payload?.cardQuestion || undefined,
            cardAnswer: payload?.cardAnswer || undefined,
            sortCards: cards.sortCardsMethod
        })
        dispatch(setCards(response.data))
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const createCard = (payload?: NewCardData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await cardsAPI.createCard(payload)
        await dispatch(fetchCards())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const deleteCard = (payload: DeleteCardData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await cardsAPI.deleteCard(payload)
        await dispatch(fetchCards())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const updateCard = (payload: UpdateCardData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await cardsAPI.updateCard(payload)
        await dispatch(fetchCards())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const gradeAnswer = (payload: GradeData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await cardsAPI.grade(payload)
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}