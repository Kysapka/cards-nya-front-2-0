import React, {FC, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../../../hooks/hooks'
import {setAppError} from '../../../../store/reducers/app-reducer'
import {Alert} from '../Alert'

export const AlertError: FC = () => {
    const error = useTypedSelector(state => state.app.error)
    const dispatch = useDispatch()

    const onCloseHandler = useCallback(() => {
        dispatch(setAppError(''))
    }, [dispatch])

    return <Alert type={'error'} text={error} open={!!error} onClose={onCloseHandler}/>
}