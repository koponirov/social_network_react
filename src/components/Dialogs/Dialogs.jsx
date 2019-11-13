import React from 'react';
import style from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogWithUser from './DialogWithUser/DialogWithUser'


const Dialogs = (props) => {


    let dialogs = props.state.dialogs.map((dialog) => {
        return (
            <DialogWithUser userName={dialog.userName} userId={dialog.userId}/>
        )
    })



    let messages = props.state.messages.map((message) => {
        return (
            <Message messageText={message.messageText}/>
        )
    })

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsBar}>
                {dialogs}
            </div>
            <div className={style.messages}>
                {messages}
            </div>
        </div>
    )
}

export default Dialogs;