import React from 'react';
import style from '../Dialogs.module.css';

const Message = ({userName,messageText,addedAt}) => {
    return (
        <div >
            <div>{userName} </div>
            <div> {messageText}</div>
            <div> {addedAt}</div>

        </div>
    )
}

export default Message;