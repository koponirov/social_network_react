import React from 'react';
import style from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const Dialogs = (props) => {
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsBar}>
                <NavLink to='/dialogs/1' className={style.dialogWith} activeClassName={style.activeLink}>Sasha</NavLink>
                <NavLink to='/dialogs/2' className={style.dialogWith}>Olga</NavLink>
                <NavLink to='/dialogs/3' className={style.dialogWith}>Nelli</NavLink>
                <NavLink to='/dialogs/4' className={style.dialogWith}>Igor</NavLink>
                <NavLink to='/dialogs/5' className={style.dialogWith}>Sergey</NavLink>
            </div>
            <div className={style.messages}>
                <div className={style.messageContent}>Hi!</div>
                <div className={style.messageContent}>How are u?</div>
                <div className={style.messageContent}>I'm OK</div>
                <div className={style.messageContent}>What u want to do tomorrow? </div>
            </div>
        </div>
    )
            }

export default Dialogs;