import React from 'react';
import style from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogWithUser from './DialogWithUser/DialogWithUser'
import {Redirect} from "react-router-dom";
import MessageReduxForm from "./MessageForm";

const Dialogs = (props) => {

    let dialogs = props.dialogs.map((dialog) => {
        return (
            <DialogWithUser userName={dialog.userName} userId={dialog.userId}/>
        )
    })

    let messages = props.messages.map((message) => {
        return (
            <Message messageText={message.messageText}/>
        )
    })

    const sendMessage = (values) => {
        props.sendMessage(values.message)
    };

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsBar}>
                {dialogs}
            </div>
            <div className={style.messages}>
                {messages}
                <div className={style.right}>

                    <MessageReduxForm onSubmit={sendMessage}/>

                </div>
            </div>

        </div>
    )
}

export default Dialogs;