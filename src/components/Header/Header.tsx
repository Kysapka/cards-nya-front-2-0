import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PATH } from '../../routes/routes';
import s from './Header.module.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/reducers/auth-reducer';
import { useTypedSelector } from '../../hooks/hooks';
import { ReactIcon } from '../Icons/ReactIcon';

export const Header: FC = () => {
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    return (
        <div className={s.wrapper}>
            <nav className={s.container}>
                <Link to={PATH.HOME}><ReactIcon/></Link>
                <NavLink activeClassName={s.active} to={PATH.PROFILE}>Profile</NavLink>
                <NavLink activeClassName={s.active} to={PATH.PACKS}>Packs</NavLink>
                <NavLink activeClassName={s.active} to={PATH.CARDS}>Cards</NavLink>

                {!isLoggedIn
                    ? <NavLink activeClassName={s.active} to={PATH.LOGIN}>Login</NavLink>
                    : <span onClick={() => dispatch(logout())}>Logout</span>}
            </nav>
        </div>
    )
}