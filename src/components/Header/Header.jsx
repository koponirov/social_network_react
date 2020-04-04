import React, {useEffect, useState} from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import defaultPhoto from '../../assets/images/man.svg'
import cn from 'classnames'

const Header = (props) => {

    const [active, setActive] = useState(false);

    const [avatar,setAvatar] = useState(props.avatar);

    useEffect(()=>{
        setAvatar(props.avatar)
    },[props.avatar]);

//`${s.header__menu} ${s.active}`
    return <header className={s.header}>
        <div className={s.container}>
            <div className={s.header__body}>
                <nav  onTouchEnd={() => setActive(!active)}
                    className={active ? cn(s.header__menu,s.active) : s.header__menu}>
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
                                Dialogs {props.newMessagesCount>0?props.newMessagesCount:'' }
                            </li>
                        </NavLink>
                    </ul>
                </nav>
                <div onClick={() => setActive(!active)}
                     className={active ? `${s.header__burger} ${s.active}` : s.header__burger}>
                    <span></span>
                </div>
                <div className={s.header__auth}>
                    {props.profile ?
                        <div className={s.header__auth__info}>

                            <div className={s.header__auth__content}>
                                <NavLink to='/profile'>
                                    <div className={s.header__auth__name}>{props.profile.fullName}</div>
                                </NavLink>
                                <div className={s.header__auth__logout}><span onClick={props.logout}>logout</span></div>
                            </div>
                            <div className={s.header__auth__ava}>
                                <NavLink to='/profile'>
                                    <img src={props.profile.photos.small != null ?
                                        props.profile.photos.small : defaultPhoto} alt='photo'/>
                                </NavLink>
                            </div>
                        </div>

                        : <div className={s.header__auth__login}>
                            <NavLink className={s.header__login} to={'/login'}>LOGIN</NavLink>
                        </div>}
                </div>
            </div>
        </div>
    </header>
}

export default Header;