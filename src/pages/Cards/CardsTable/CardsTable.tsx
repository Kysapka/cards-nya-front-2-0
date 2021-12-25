import React, {FC} from 'react'
import {cardsModel} from './cardsModel'
import {setSortCardsMethod} from '../../../store/reducers/cards-reducer'
import {useDispatch} from 'react-redux'
import {Card} from '../../../api/cards-api'
import {Table} from '../../../components/UI/Table/Table'
import {useTypedSelector} from '../../../hooks/hooks'

type CardsTableProps = {
    cards: Card[]
    cardsPackID: string
    isOwner: boolean
}

export const CardsTable: FC<CardsTableProps> = ({cards, cardsPackID, isOwner}) => {
    const dispatch = useDispatch()
    const sortCardsMethod = useTypedSelector(state => state.cards.sortCardsMethod)

    const changeCardsSortMethod = (sortMethod: string) => {
        dispatch(setSortCardsMethod({sortCarsMethod: sortMethod}))
    }

    return (
        <Table model={cardsModel(changeCardsSortMethod, isOwner, sortCardsMethod)} data={cards}/>
    )
}