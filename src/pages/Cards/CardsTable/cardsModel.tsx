import {TableModel} from '../../../components/UI/Table/Table'
import {Card} from '../../../api/cards-api'
import {Sort} from '../../../components/UI/Sort/Sort'
import {AddCardModal} from './CardsModals/AddCardModal'
import {DeleteCardModal} from './CardsModals/DeleteCardModal'
import {UpdateCardModal} from './CardsModals/UpdateCardModal'

export const cardsModel = (sort: (sort: string) => void, isOwner: boolean, sortMethod: string | undefined): TableModel[] => [
    {
        header: index =>
            <th key={'question-title-' + index}>
                <Sort sortBy={'question'} sortCallback={sort} sortMethod={sortMethod}>Question</Sort>
            </th>,
        body: (item: Card) =>
            <td key={'question-cell-' + item._id}>{item.question}</td>
    },
    {
        header: index =>
            <th key={'answer-title-' + index}>
                <Sort sortBy={'answer'} sortCallback={sort} sortMethod={sortMethod}>Answer</Sort>
            </th>,
        body: (item: Card) =>
            <td key={'answer-cell-' + item._id}>{item.answer}</td>
    },
    {
        header: index =>
            <th key={'grade-title-' + index}>
                <Sort sortBy={'grade'} sortCallback={sort} sortMethod={sortMethod}>Grade</Sort>
            </th>,
        body: (item: Card) =>
            <td key={'grade-cell-' + item._id}>{item.grade}</td>
    },
    {
        header: index =>
            <th key={'shots-title-' + index}>
                <Sort sortBy={'shots'} sortCallback={sort} sortMethod={sortMethod}>Shots</Sort>
            </th>,
        body: (item: Card) =>
            <td key={'shots-cell-' + item._id}>{item.shots}</td>
    },
    {
        header: index =>
            <th key={'updated-title-' + index}>
                <Sort sortBy={'updated'} sortCallback={sort} sortMethod={sortMethod}>Updated</Sort>
            </th>,
        body: (item: Card) =>
            <td key={'updated-cell-' + item._id}>{item.updated.slice(5, 16)}</td>
    },
    {
        header: index =>
            <th key={'buttons-title-' + index}>
                <AddCardModal buttonDisable={isOwner}/>
            </th>,
        body: (item: Card) =>
            <td key={'buttons-cell-' + item._id} className={'tablesButtonsCell'}>
                <DeleteCardModal cardID={item._id} buttonDisable={isOwner}/>
                <UpdateCardModal cardID={item._id} buttonDisable={isOwner}
                                 prevQuestion={item.question} prevAnswer={item.answer}/>
            </td>
    }
]