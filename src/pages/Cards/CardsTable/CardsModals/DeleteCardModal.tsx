import React, {FC} from 'react'
import {useDispatch} from 'react-redux'
import {useModal} from '../../../../hooks/useModal'
import {Button} from '../../../../components/UI/Button/Button'
import {Modal} from '../../../../components/UI/Modal/Modal'
import {deleteCard} from '../../../../store/reducers/cards-reducer'

type DeletePackModalProps = {
    cardID: string
    buttonDisable: boolean
}

export const DeleteCardModal: FC<DeletePackModalProps> = ({cardID, buttonDisable}) => {
    const dispatch = useDispatch()
    const {isOpen, onToggle} = useModal()

    const removeCard = async () => {
        await dispatch(deleteCard({id: cardID}))
    }

    return (
        <>
            <Button onClick={() => onToggle()} disabled={buttonDisable}>Delete</Button>

            <Modal open={isOpen} onClick={() => onToggle()}>
                <Button onClick={removeCard} secondary style={{marginBottom: 24}}>Delete</Button>
                <Button onClick={() => onToggle()}>Cancel</Button>
            </Modal>
        </>
    )
}