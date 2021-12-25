import React, {FC, useEffect, useMemo, useState} from 'react';
import {Range} from 'rc-slider';
import debounce from 'lodash.debounce';
import {setCurrentCardsCount} from '../../../store/reducers/packs-reducer';
import {useDispatch} from 'react-redux';

type CardsCountRangeProps = {
    minCardsCount: number
    maxCardsCount: number
}

export const CardsCountRange: FC<CardsCountRangeProps> = ({minCardsCount, maxCardsCount}) => {
    const dispatch = useDispatch()
    const [rangeValues, setRangeValues] = useState([minCardsCount, maxCardsCount])

    const rangeMarks = {
        [minCardsCount]: {style: {fontSize: 16}, label: minCardsCount},
        [maxCardsCount]: {style: {fontSize: 16}, label: maxCardsCount}
    }

    const onRangeChangeHandler = (values: number[]) => {
        setRangeValues(values)
        debouncedRange(values)
    }

    const debouncedRange = useMemo(() => debounce( values => dispatch(setCurrentCardsCount({values: values})), 500), [dispatch])

    useEffect(() => {
        setRangeValues([minCardsCount, maxCardsCount])
    }, [minCardsCount, maxCardsCount])

    return (
        <Range value={rangeValues}
               marks={rangeMarks}
               min={minCardsCount}
               max={maxCardsCount}
               onChange={onRangeChangeHandler}
               style={{margin: '32px 8px 48px 8px', width: 'inherit'}}/>
    )
}