import React, {FC, useCallback, useEffect, useState} from 'react'
import {Range} from 'rc-slider'
import _ from 'lodash'
import {setCurrentGrade, setMinMaxGrade} from '../../../store/reducers/cards-reducer'
import {useDispatch} from 'react-redux'

type CardsGradeRangeProps = {
    minGrade: number
    maxGrade: number
}

export const CardsGradeRange: FC<CardsGradeRangeProps> = ({minGrade, maxGrade}) => {
    const dispatch = useDispatch()
    const [rangeValues, setRangeValues] = useState([minGrade, maxGrade])

    const rangeMarks = {
        [minGrade]: {style: {fontSize: 16}, label: minGrade},
        [maxGrade]: {style: {fontSize: 16}, label: maxGrade}
    }

    const onRangeChangeHandler = (values: number[]) => {
        setRangeValues(values)
        debouncedRange(values)
    }

    const debouncedRange = useCallback(_.debounce(values => dispatch(setCurrentGrade({values: values})), 500), [])

    useEffect(() => {
        setRangeValues([minGrade, maxGrade])
    }, [minGrade, maxGrade])

    return (
        <Range value={rangeValues}
               marks={rangeMarks}
               min={minGrade}
               max={maxGrade}
               onChange={onRangeChangeHandler}
               style={{margin: '32px 8px 48px 8px', width: 'inherit'}}/>
    )
}