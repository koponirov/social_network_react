import React, {useEffect, useState} from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import defaultPhoto from '../../assets/images/man.svg'
import cn from 'classnames'
import {ProfileType} from "../../types";
import {logout, refreshProfileData} from "../../redux/authReducer";

type PropsType = {
    isAuth: boolean
    id: number| null
    login: string | null
    avatar: string | null
    newMessagesCount: number
    profile: ProfileType | null
    currentProfileData: ProfileType | null
    logout: () => void
    refreshProfileData: (id: number) => void
}

const Header: React.FC<PropsType> = ({
                                         isAuth,
                                         id,
                                         login,
                                         avatar,
                                         newMessagesCount,
                                         profile,
                                         currentProfileData,
                                         logout, refreshProfileData
                                     }) => {

    const [active, setActive] = useState(false);

    const [newAvatar, setAvatar] = useState(avatar);

    useEffect(() => {
        setAvatar(avatar)
    }, [avatar]);

    return <header className={s.header}>
        <div className={s.container}>
            <div className={s.header__body}>
                <nav onTouchEnd={() => setActive(!active)}
                     className={active ? cn(s.header__menu, s.active) : s.header__menu}>
                    <ul className={s.header__list}>
                        <NavLink to='/profile' className={s.header__link}>
                            <li>
                                Profile
                            </li>
                        </NavLink>
                        <NavLink to='/users' className={s.header__link}>
                            <li>
                                Users
                            </li>
                        </NavLink>
                        <NavLink to='/dialogs' className={s.header__link}>
                            <li>
                                Dialogs {newMessagesCount > 0 ? newMessagesCount : ''}
                            </li>
                        </NavLink>
                    </ul>
                </nav>
                <div onClick={() => setActive(!active)}
                     className={active ? `${s.header__burger} ${s.active}` : s.header__burger}>
                    <span></span>
                </div>
                <div className={s.header__auth}>
                    {profile ?
                        <div className={s.header__auth__info}>
                            <div className={s.header__auth__content}>
                                <NavLink to='/profile'>
                                    <div className={s.header__auth__name}>{profile.fullName}</div>
                                </NavLink>
                                <div className={s.header__auth__logout}>
                                    <span onClick={logout}>logout</span>
                                </div>
                            </div>
                            <div className={s.header__auth__ava}>
                                <NavLink to='/profile'>
                                    <img src={profile.photos.small != null ?
                                        profile.photos.small : defaultPhoto} alt='userMainPhoto'/>
                                </NavLink>
                            </div>
                        </div>

                        : <div className={s.header__auth__login}>
                            <NavLink className={s.header__login} to={'/login'}>LOGIN</NavLink>
                        </div>
                    }
                </div>
            </div>
        </div>
    </header>
};

export default Header;