import React from 'react';
import style from '../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import letter from '../../../assets/images/letter.svg'
import photo from "../../../assets/images/ussser.svg";

const DialogWithUser = (props) => {

    let path = `/dialogs/${props.userId}/messages`

    return  <NavLink to={path} className={style.dialogWith} >
        <div className={style.user__ava}>
            <img src={props.photo ? props.photo : photo}/>
        </div>
        <div className={style.user__name}>
                {props.userName}
        </div>
        <div className={style.newMessages__indicator}>
                {props.newMessages?<img src={letter}></img>:''}
        </div>
            </NavLink>
}


export default DialogWithUser;