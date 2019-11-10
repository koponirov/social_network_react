import React from 'react';
import style from '../Dialogs.module.css';

const Message= (props) => {
    return (
        <div className={style.messageContent}>
            {props.messageText}
        </div>
    )
}

export default Message;