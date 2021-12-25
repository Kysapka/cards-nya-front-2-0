import {PATH} from '../../../routes/routes'
import {Link} from 'react-router-dom'
import {TableModel} from '../../../components/UI/Table/Table'
import {CardsPack} from '../../../api/packs-api'
import {Sort} from '../../../components/UI/Sort/Sort'
import {AddPackModal} from './PacksModals/AddPackModal'
import {UpdatePacksModal} from './PacksModals/UpdatePacksModal'
import {DeletePackModal} from './PacksModals/DeletePackModal'
import React from 'react'

export const packsModel = (sort: (sort: string) => void, userID: string | undefined, sortMethod: string | undefined): TableModel[] => [
    {
        header: index =>
            <th key={'name-title-' + index}>
                <Sort sortBy={'name'} sortCallback={sort} sortMethod={sortMethod}>Pack Name</Sort>
            </th>,
        body: (item: CardsPack) =>
            <td key={'name-cell-' + item._id}>
                <Link to={PATH.CARDS + '/' + item._id}>{item.name}</Link>
            </td>
    },
    {
        header: index =>
            <th key={'userName-title-' + index}>
                <Sort sortBy={'user_name'} sortCallback={sort} sortMethod={sortMethod}>User Name</Sort>
            </th>,
        body: (item: CardsPack) =>
            <td key={'name-cell-' + item.user_name}>{item.user_name}</td>
    },
    {
        header: index =>
            <th key={'cardsCount-title-' + index}>
                <Sort sortBy={'cardsCount'} sortCallback={sort} sortMethod={sortMethod}>Cards count</Sort>
            </th>,
        body: (item: CardsPack) =>
            <td key={'cardsCount-cell-' + item._id}>{item.cardsCount}</td>
    },
    {
        header: index =>
            <th key={'updated-title-' + index}>
                <Sort sortBy={'updated'} sortCallback={sort} sortMethod={sortMethod}>Updated</Sort>
            </th>,
        body: (item: CardsPack) =>
            <td key={'updated-cell-' + item._id}>{item.updated.slice(5, 16)}</td>
    },
    {
        header: index =>
            <th key={'buttons-title-' + index}>
                <AddPackModal/>
            </th>,
        body: (item: CardsPack) =>
            <td key={'buttons-cell-' + item._id} className={'tablesButtonsCell'}>
                <Link to={PATH.LEARN + '/' + item._id}>Learn</Link>
                <UpdatePacksModal packID={item._id} buttonDisable={item.user_id !== userID} prevPackName={item.name}/>
                <DeletePackModal packID={item._id} buttonDisable={item.user_id !== userID}/>
            </td>
    },
]