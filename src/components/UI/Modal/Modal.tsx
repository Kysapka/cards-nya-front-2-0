import React, {FC} from 'react'
import s from './Modal.module.css'

type ModalProps = {
    open: boolean
    onClick: () => void
}

export const Modal: FC<ModalProps> = ({open, onClick, children}) => {

    return (
        <>
            {open &&
			<div className={s.wrapper} onClick={onClick}>
				<div className={s.container} onClick={e => e.stopPropagation()}>
                    {children}
				</div>
			</div>}
        </>
    )
}