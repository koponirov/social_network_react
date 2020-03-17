import React from 'react';
import style from '../Dialogs.module.css';
import {NavLink} from "react-router-dom";



const DialogWithUser = (props) => {

    let path = `/dialogs/${props.userId}/messages`

    return (
        <div className={style.dialogWith} >
            <NavLink to={path}>
                {props.userName}
            </NavLink>
        </div>
    )
}


export default DialogWithUser;