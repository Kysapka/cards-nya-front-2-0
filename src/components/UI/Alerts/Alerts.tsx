import React, {FC} from 'react'
import s from './Alerts.module.css'
import {AlertError} from './AlertError/AlertError'
import {AlertInfo} from './AlertInfo/AlertInfo'

export const Alerts: FC = () => {
    return (
        <div>
            <div className={s.wrapper}>
                <AlertError/>
                <AlertInfo/>
            </div>
        </div>
    )
}