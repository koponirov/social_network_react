import React from 'react';
import s from './Messages.module.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import cn from 'classnames';

const Message = ({userName,messageText,addedAt,userId,authId}) => {

    let owner = !!(userId==authId)
    return (
        <div className={s.message__container} >
            <div className={s.message__user__name}>
                <span className={cn({[s.owner]:owner})}>{owner?'You':userName}:</span>
            </div>
            <div className={cn(s.message__wrapper,{[s.owner]:owner},{[s.owner_color]:owner})}>
                <div className={s.message__text}>{messageText}</div>
            </div>
            <div className={cn(s.message__add__time,{[s.owner]:owner})}>
                {formatDistanceToNow(addedAt,{addSuffix:true})}
            </div>
        </div>
    )
};

export default Message;