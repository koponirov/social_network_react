import React from 'react';
import style from '../Dialogs.module.css';
import {NavLink} from "react-router-dom";



const DialogWithUser = (props) => {

    let path = `/dialogs/${props.userId}/messages`

    return  <NavLink to={path} className={style.dialogWith} >
                {props.userName}
            </NavLink>
}


export default DialogWithUser;