import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";
import defaultPhoto from '../../assets/images/ussser.svg'

const Header = (props) => {

    return <header className={style.header}>
        <div className={style.container}>
            <img src='https://image.flaticon.com/icons/png/512/68/68637.png' alt='logo'
                 className={style.logo}></img>
            <div className={style.loginBlock_container}>
                {props.isAuth ?
                    <div className={style.loginBlock}>

                        <div className={style.userName}>{props.login}</div>

                        <div className={style.userAva}>
                            <img src={props.photo !=null  ?
                                props.photo : defaultPhoto} alt='photo'/>
                        </div>

                        <div className={style.logout}><span onClick={props.logout}>logout</span></div>
                    </div>


                    : <div className={style.loginBlock}>
                        <NavLink className={style.login} to={'/login'}>Login</NavLink>
                    </div>}
            </div>
        </div>
    </header>
}

export default Header;