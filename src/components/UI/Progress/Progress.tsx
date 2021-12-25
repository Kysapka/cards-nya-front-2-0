import React, {FC} from 'react'
import s from './Progress.module.css'

export const Progress: FC = () => {
    return (
        <div>
            <div className={s.progressContainer}>
                <div className={s.progressBar}/>
            </div>
        </div>
    )
}