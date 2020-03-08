import React, {useState} from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import defaultPhoto from '../../assets/images/ussser.svg'

const Header = (props) => {

    const [active, setActive] = useState(false)

    return <header className={s.header}>
        <div className={s.container}>
            <div className={s.header__body}>
                <nav className={active ? `${s.header__menu} ${s.active}` : s.header__menu}>
                    <ul className={s.header__list}>
                        <li>
                            <NavLink to='/profile' className={s.header__link}>Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to='/users' className={s.header__link}>Users</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dialogs' className={s.header__link}>Dialogs</NavLink>
                        </li>
                    </ul>
                </nav>
                <div onClick={() => setActive(!active)}
                     className={active ? `${s.header__burger} ${s.active}` : s.header__burger}>
                    <span></span>
                </div>
                <div className={s.header__auth}>
                    {props.isAuth ?
                        <div className={s.header__auth__info}>

                            <div className={s.header__auth__content}>
                                <NavLink to='/profile'>
                                    <div className={s.header__auth__name}>{props.login}</div>
                                </NavLink>
                                <div className={s.header__auth__logout}><span onClick={props.logout}>logout</span></div>
                            </div>
                            <div className={s.header__auth__ava}>
                                <NavLink to='/profile'>
                                    <img src={props.photo != null ?
                                        props.photo : defaultPhoto} alt='photo'/>
                                </NavLink>
                            </div>
                        </div>

                        : <div className={s.header__auth__login}>
                            <NavLink className={s.header__login} to={'/login'}>Login</NavLink>
                        </div>}
                </div>
            </div>
        </div>
    </header>
}

export default Header;