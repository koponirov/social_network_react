import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";
import defaultPhoto from '../../assets/images/userPhoto.png'

const Header = (props) => {
    return <header className={style.header}>
        <img src='https://image.flaticon.com/icons/png/512/68/68637.png' alt='logo'></img>
        <div className={style.loginBlock}>
            {props.isAuth ?
                <div className={style.userBlock}>{props.login}
                    <img src={props.photo?props.photo:defaultPhoto}
                    alt='photo'/>
                </div>

                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;