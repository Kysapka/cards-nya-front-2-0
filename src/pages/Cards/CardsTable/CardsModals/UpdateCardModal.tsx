import React, {FC, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useModal} from '../../../../hooks/useModal'
import {Button} from '../../../../components/UI/Button/Button'
import {Modal} from '../../../../components/UI/Modal/Modal'
import {Input} from '../../../../components/UI/Input/Input'
import {updateCard} from '../../../../store/reducers/cards-reducer'

type UpdatePacksModalProps = {
    cardID: string
    buttonDisable: boolean
    prevQuestion: string
    prevAnswer: string
}

export const UpdateCardModal: FC<UpdatePacksModalProps> = ({cardID, buttonDisable, prevQuestion, prevAnswer}) => {
    const dispatch = useDispatch()
    const {isOpen, onToggle} = useModal()
    const [question, setQuestion] = useState(prevQuestion)
    const [answer, setAnswer] = useState(prevAnswer)

    const updatePack = async () => {
        await dispatch(updateCard({card: {_id: cardID, question, answer}}))
        onToggle()
    }

    useEffect(() => {
        setQuestion(prevQuestion)
        setAnswer(prevAnswer)
    }, [isOpen])

    return (
        <>
            <Button onClick={() => onToggle()} disabled={buttonDisable}>Update</Button>

            <Modal open={isOpen} onClick={() => onToggle()}>
                <label htmlFor={'cards-update-question'}>
                    Question
                    <Input id={'cards-update-question'}
                           value={question}
                           onChange={e => setQuestion(e.currentTarget.value)}/>
                </label>

                <label htmlFor={'cards-update-answer'}>
                    Answer
                    <Input id={'cards-update-answer'}
                           value={answer}
                           onChange={e => setAnswer(e.currentTarget.value)}/>
                </label>

                <Button onClick={updatePack}>Update</Button>
            </Modal>
        </>
    )
}