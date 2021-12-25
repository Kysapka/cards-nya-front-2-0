import React, {FC, useState} from 'react'
import s from './Sort.module.css'
import {checkTableActiveSort} from '../../../utils/checkTableActiveSort'

type SortPacksProps = {
    sortBy: string
    sortCallback: (sortMethod: string) => void
    sortMethod?: string
}

export const Sort: FC<SortPacksProps> = ({sortBy, sortCallback, sortMethod, children}) => {
    const [sortToggle, setSortToggle] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const checkActive = checkTableActiveSort(sortMethod, sortBy)

    const onSortHandler = () => {
        setSortToggle(!sortToggle)
        setIsActive(true)
        sortCallback(`${Number(sortToggle)}${sortBy}`)
    }

    const classNames = `${s.container} ${checkActive && isActive && sortToggle && s.up} ${checkActive && isActive && !sortToggle && s.down}`

    return (
        <div onClick={onSortHandler} className={classNames}>
            {children}
        </div>
    )
}