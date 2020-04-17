import React from 'react';
import s from '../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import letter from '../../../assets/images/letter.svg'
import photo from "../../../assets/images/man.svg";

const DialogWithUser = (props) => {

    let path = `/dialogs/${props.userId}/messages`

    return  <NavLink to={path} className={s.dialogWith} >
        <div className={s.user__ava}>
            <img src={props.photo ? props.photo : photo}/>
        </div>
        <div className={s.user__name}>
                {props.userName}
        </div>
        <div className={s.newMessages__indicator}>
                {props.newMessages?<img src={letter}></img>:''}
        </div>
            </NavLink>
}


export default DialogWithUser;