import React, {FC} from 'react'
import {Table} from '../../../components/UI/Table/Table'
import {packsModel} from './packsModel'
import {setSortCardsPackMethod} from '../../../store/reducers/packs-reducer'
import {useDispatch} from 'react-redux'
import {CardsPack} from '../../../api/packs-api'
import {useTypedSelector} from '../../../hooks/hooks'

type PacksTableProps = {
    cardPacks: CardsPack[]
}

export const PacksTable: FC<PacksTableProps> = ({cardPacks}) => {
    const dispatch = useDispatch()
    const userID = useTypedSelector(state => state.auth.userInfo?._id)
    const sortPacksMethod = useTypedSelector(state => state.packs.sortPacksMethod)

    const changePacksSortMethod = (sortMethod: string) => {
        dispatch(setSortCardsPackMethod({sortCardPacksMethod: sortMethod}))
    }

    return <Table model={packsModel(changePacksSortMethod, userID, sortPacksMethod)} data={cardPacks}/>
}