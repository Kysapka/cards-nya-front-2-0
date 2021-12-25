import React, {ChangeEvent, FC, useState} from 'react'
import {Checkbox} from '../../../components/UI/Checkbox/Checkbox'
import {setCurrentCardsCount, setPrivatePacks} from '../../../store/reducers/packs-reducer'
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../../hooks/hooks'

type PrivatePacksToggleProps = {
    privatePacks: boolean
}

export const PrivatePacksToggle: FC<PrivatePacksToggleProps> = ({privatePacks}) => {
    const [isPrivatePacks, setIsPrivatePacks] = useState(privatePacks)
    const dispatch = useDispatch()

    const onPrivateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setPrivatePacks({value: e.currentTarget.checked}))
        dispatch(setCurrentCardsCount({values: [0, 0]}))
        setIsPrivatePacks(e.currentTarget.checked)
    }

    return (
        <Checkbox checked={isPrivatePacks}
                  onChange={onPrivateChangeHandler}>
            Show only private packs?
        </Checkbox>
    )
}