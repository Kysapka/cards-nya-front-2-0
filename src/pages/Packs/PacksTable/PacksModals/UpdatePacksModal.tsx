import React, {FC, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useModal} from '../../../../hooks/useModal'
import {updateCardsPack} from '../../../../store/reducers/packs-reducer'
import {Button} from '../../../../components/UI/Button/Button'
import {Modal} from '../../../../components/UI/Modal/Modal'
import {Input} from '../../../../components/UI/Input/Input'

type UpdatePacksModalProps = {
    packID: string
    buttonDisable: boolean
    prevPackName: string
}

export const UpdatePacksModal: FC<UpdatePacksModalProps> = ({packID, buttonDisable, prevPackName}) => {
    const dispatch = useDispatch()
    const {isOpen, onToggle} = useModal()
    const [name, setName] = useState(prevPackName)

    const updatePack = async () => {
        await dispatch(updateCardsPack({cardsPack: {_id: packID, name}}))
        onToggle()
    }

    useEffect(() => {
        setName(prevPackName)
    }, [isOpen])

    return (
        <>
            <Button onClick={() => onToggle()} disabled={buttonDisable}>Update</Button>

            <Modal open={isOpen} onClick={() => onToggle()}>
                <label htmlFor={'packs-updatePack'}>
                    New pack name
                    <Input id={'packs-updatePack'}
                           placeholder={'Enter new name...'}
                           value={name}
                           onChange={e => setName(e.currentTarget.value)}/>
                </label>

                <Button onClick={updatePack}>Update</Button>
            </Modal>
        </>
    )
}