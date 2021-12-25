import {AppDispatch} from '../store/store'
import {setAppError} from '../store/reducers/app-reducer'

export const errorsHandler = (error: any, dispatch: AppDispatch) => {
    dispatch(setAppError(error.response ? error.response.data.error : error))
}