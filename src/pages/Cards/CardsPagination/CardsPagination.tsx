import React, {FC} from 'react'
import s from '../Cards.module.css'
import {Pagination} from '../../../components/UI/Pagination/Pagination'
import {Select} from '../../../components/UI/Select/Select'
import {useDispatch} from 'react-redux'
import {setCardsCountOnPage, setCardsCurrentPage} from '../../../store/reducers/cards-reducer'

type CardsPaginationProps = {
    cardsTotalCount: number
    pageCount: number
    page: number
    countPerPage: number[]
}

export const CardsPagination: FC<CardsPaginationProps> = ({cardsTotalCount, pageCount, page, countPerPage}) => {
    const dispatch = useDispatch()

    const onPageChangeHandler = (page: number) => dispatch(setCardsCurrentPage({page}))
    const onSelectChangeHandler = (option: string) => dispatch(setCardsCountOnPage({count: Number(option)}))

    return (
        <div className={s.paginationContainer}>
            <Pagination totalCount={cardsTotalCount}
                        countPerPage={pageCount}
                        currentPage={page}
                        onChange={onPageChangeHandler}/>
            <div>
                <span style={{paddingRight: 16}}> Show on page:</span>
                <Select options={countPerPage} onChangeOption={onSelectChangeHandler}/>
            </div>
        </div>
    )
}