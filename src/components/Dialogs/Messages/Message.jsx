import React from 'react';
import s from './Messages.module.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Message = ({userName,messageText,addedAt}) => {
    return (
        <div className={s.message__container} >
            <div className={s.message__wrapper}>
                <div className={s.message__user__name}>{userName}:</div>
                <div className={s.message__text}>{messageText}</div>
            </div>
            <div className={s.message__add__time}>
                {formatDistanceToNow(addedAt,{addSuffix:true})}
            </div>
        </div>
    )
}

export default Message;