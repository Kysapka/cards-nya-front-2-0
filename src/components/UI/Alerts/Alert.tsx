import React, {FC, useCallback, useEffect, useState} from 'react'
import s from './Alerts.module.css'

type AlertProps = {
    type: 'error' | 'success'
    text: string | null
    open: boolean
    onClose: () => void
}

export const Alert: FC<AlertProps> = props => {
    const {type, text, open, onClose} = props
    const [isOpen, setIsOpen] = useState<boolean>(open)

    const closeSnackbar = useCallback(() => {
        setIsOpen(false)
        onClose()
    }, [onClose])

    useEffect(() => {
        setIsOpen(open)
        const timeoutID = setTimeout(() => {
            closeSnackbar()
        }, 3500)

        return () => clearTimeout(timeoutID)
    }, [closeSnackbar, open])

    return (
        <>
            {isOpen &&
			<div className={`${s.container} ${type === 'error' && s.error}`}>
				<div>{text ? text : 'I am Alert'}</div>
				<span onClick={closeSnackbar}>X</span>
			</div>}
        </>
    )
}