import React, {ChangeEvent, FC, useMemo, useState} from 'react';
import {Input} from '../../../components/UI/Input/Input';
import {useDispatch} from 'react-redux';
import {fetchCardPacks} from '../../../store/reducers/packs-reducer';
import debounce from 'lodash.debounce';

export const PacksSearch: FC = () => {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')

    const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
        debouncedSearch(e.currentTarget.value)
    }

    const debouncedSearch = useMemo(() => debounce(value => dispatch(fetchCardPacks({packName: value})), 1000),[dispatch])

    return (
        <label htmlFor='packs-search'>
            Search for packs name:
            <Input id={'packs-search'}
                   placeholder={'Enter pack name...'}
                   value={searchValue}
                   onChange={onSearchChangeHandler}/>
        </label>
    )
}