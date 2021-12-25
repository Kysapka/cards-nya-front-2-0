import React, {FC} from 'react'
import s from '../Packs.module.css'
import {Pagination} from '../../../components/UI/Pagination/Pagination'
import {Select} from '../../../components/UI/Select/Select'
import {setPacksCountOnPage, setPacksCurrentPage} from '../../../store/reducers/packs-reducer'
import {useDispatch} from 'react-redux'

type PacksPaginationProps = {
    totalCount: number
    pageCount: number
    currentPage: number
    countPerPage: number[]
}

export const PacksPagination: FC<PacksPaginationProps> = props => {
    const {totalCount, pageCount, currentPage, countPerPage} = props
    const dispatch = useDispatch()

    const onPageChangeHandler = (page: number) => dispatch(setPacksCurrentPage({page}))
    const onSelectChangeHandler = (option: string) => dispatch(setPacksCountOnPage({count: Number(option)}))

    return (
        <div className={s.paginationContainer}>
            <Pagination totalCount={totalCount}
                        countPerPage={pageCount}
                        currentPage={currentPage}
                        onChange={onPageChangeHandler}/>
            <div>
                <span style={{paddingRight: 16}}> Show on page:</span>
                <Select options={countPerPage} onChangeOption={onSelectChangeHandler}/>
            </div>
        </div>
    )
}