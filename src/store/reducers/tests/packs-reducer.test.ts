import {
    PacksInitialState,
    packsReducer,
    setCardPacks, setMinMaxCardsCount,
    setPacksCountOnPage,
    setPacksCurrentPage,
    setPacksTotalCount, setPrivatePacks, setSortCardsPackMethod
} from '../packs-reducer'

let startState: PacksInitialState

beforeEach(() => {
    startState = {
        cardPacks: [],
        cardPacksTotalCount: 0,
        minCardsCount: 0,
        maxCardsCount: 100,
        page: 1,
        pageCount: 5,
        privatePacks: false,
        sortPacksMethod: '0cardsCount'
    }
})

describe('Packs reducer', () => {
    it('Packs page should be changed', () => {
        const action = setPacksCurrentPage({page: 20})

        const endState = packsReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.page).toBe(20)
    })
    it('Packs count per page is change', () => {
        const action = setPacksCountOnPage({count: 17})

        const endState = packsReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.pageCount).toBe(17)
    })
    it('Packs total count element was change', () => {
        const action = setPacksTotalCount({count: 200})

        const endState = packsReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.cardPacksTotalCount).toBe(200)
    })
    it('Min/max cards in pack when searching set', () => {
        const action = setMinMaxCardsCount({values: [3, 50]})

        const endState = packsReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.minCardsCount).toBe(3)
        expect(endState.maxCardsCount).toBe(50)
        expect(endState.pageCount).toBe(5)
    })
    it('User cards are shown', () => {
        const action = setPrivatePacks({value: true})

        const endState = packsReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.privatePacks).toBeTruthy()
    })
    it('Sorting method changed', () => {
        const action = setSortCardsPackMethod({sortCardPacksMethod: '1name'})

        const endState = packsReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.sortPacksMethod).toBe('1name')
    })

})