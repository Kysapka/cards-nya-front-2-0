import React, {FC, useEffect} from 'react'
import {useTypedSelector} from '../../hooks/hooks'
import {useDispatch} from 'react-redux'
import {changeUsersInfo, checkAuth} from '../../store/reducers/auth-reducer'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {EditableElement} from '../../components/UI/EditableElement/EditableElement'
import s from './Profile.module.css'

export const Profile: FC = () => {
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const {userInfo} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    const onNameChangeHandler = (name: string) => dispatch(changeUsersInfo({name}))
    const onAvatarChangeHandler = (avatar: string) => dispatch(changeUsersInfo({avatar}))

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (!isLoggedIn) return <Redirect to={PATH.LOGIN}/>

    return (
        <div>
            <h1>Profile</h1>

            {userInfo &&
			<div className={s.container}>
				<EditableElement defaultValue={userInfo.avatar || ''}
				                 onEditHandler={onAvatarChangeHandler}>
					<img src={userInfo.avatar} alt={userInfo.name} className={s.avatar}/>
				</EditableElement>

                <div className={s.infoContainer}>
	                <EditableElement defaultValue={userInfo.name}
	                                 onEditHandler={onNameChangeHandler}>
		                <h2>{userInfo.name}</h2>
	                </EditableElement>

	                <div>Number of Card Packs: {userInfo.publicCardPacksCount}</div>
                </div>
			</div>}
        </div>
    )
}