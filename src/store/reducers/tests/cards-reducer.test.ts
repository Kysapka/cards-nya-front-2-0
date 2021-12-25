import {
    PacksInitialState,
    packsReducer,
    setCardPacks, setMinMaxCardsCount,
    setPacksCountOnPage,
    setPacksCurrentPage,
    setPacksTotalCount, setPrivatePacks, setSortCardsPackMethod
} from '../packs-reducer'
import {
    CardsInitialState,
    cardsReducer,
    setCardsCountOnPage,
    setCardsCurrentPage,
    setCardsTotalCount, setCurrentCardsPackID, setMinMaxGrade
} from '../cards-reducer'

let startState: CardsInitialState

beforeEach(() => {
    startState = {
        cards: [],
        page: 1,
        pageCount: 5,
        cardsTotalCount: 0,
        packUserId: '12',
        minGrade: 0,
        maxGrade: 6,
        currentCardsPackID: ''
    }
})

describe('Cards reducer', () => {
    it('Packs page should be changed', () => {
        const action = setCardsCurrentPage({page: 20})

        const endState = cardsReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.page).toBe(20)
    })
    it('Cards count per page is change', () => {
        const action = setCardsCountOnPage({count: 17})

        const endState = cardsReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.pageCount).toBe(17)
    })
    it('Cards total count element was change', () => {
        const action = setCardsTotalCount({count: 200})

        const endState = cardsReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.cardsTotalCount).toBe(200)
    })
    it('Current pack id is set', () => {
        const action = setCurrentCardsPackID({id: 'someId1337'})

        const endState = cardsReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.currentCardsPackID).toBe('someId1337')
    })
    it('Min/max cards grade should be set', () => {
        const action = setMinMaxGrade({values: [6, 34]})

        const endState = cardsReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.minGrade).toBe(6)
        expect(endState.maxGrade).toBe(34)
    })
})