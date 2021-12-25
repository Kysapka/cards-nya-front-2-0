import React, {FC, useState} from 'react'
import {Modal} from '../../../../components/UI/Modal/Modal'
import {Input} from '../../../../components/UI/Input/Input'
import {Checkbox} from '../../../../components/UI/Checkbox/Checkbox'
import {Button} from '../../../../components/UI/Button/Button'
import {useModal} from '../../../../hooks/useModal'
import {useDispatch} from 'react-redux'
import {createCardsPack} from '../../../../store/reducers/packs-reducer'

export const AddPackModal: FC = () => {
    const dispatch = useDispatch()
    const {isOpen, onToggle} = useModal()

    const [name, setName] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)

    const addPack = async () => {
        await dispatch(createCardsPack({cardsPack: {name, private: isPrivate}}))
        onToggle()
        setName('')
    }

    return (
        <>
            <Button onClick={() => onToggle()}>Add</Button>

            <Modal open={isOpen} onClick={() => onToggle()}>
                <label htmlFor={'packs-addPack'}>
                    New pack name
                    <Input id={'packs-addPack'}
                           placeholder={'Enter new pack name...'}
                           value={name}
                           onChange={e => setName(e.currentTarget.value)}/>
                </label>

                <Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.currentTarget.checked)}>
                    Set to private
                </Checkbox>
                <Button onClick={addPack}>Add</Button>
            </Modal>
        </>
    )
}