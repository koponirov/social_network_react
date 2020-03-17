import React from 'react';
import s from '../Dialogs.module.css';

const Message = ({userName,messageText,addedAt}) => {
    return (
        <div className={s.message__container} >
            <div>{userName} </div>
            <div>{messageText}</div>
            <div>{addedAt}</div>
        </div>
    )
}

export default Message;