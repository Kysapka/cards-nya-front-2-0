import React, {FC, useCallback} from 'react'
import {useTypedSelector} from '../../../../hooks/hooks'
import {useDispatch} from 'react-redux'
import {setAppInfo} from '../../../../store/reducers/app-reducer'
import {Alert} from '../Alert'

export const AlertInfo: FC = () => {
    const info = useTypedSelector(state => state.app.info)
    const dispatch = useDispatch()

    const onCloseHandler = useCallback(() => {
        dispatch(setAppInfo(''))
    }, [dispatch])

    return <Alert type={'success'} text={info} open={!!info} onClose={onCloseHandler}/>
}