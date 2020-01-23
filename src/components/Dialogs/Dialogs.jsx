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

    let onSendMessage=()=>{

        props.sendMessage();
    }

    let onMessageChange= (newText) => {
        let text=newText.target.value;
        props.changeMessageText(text);
    }

    const onSubmit = (formData) => {
        console.log(formData)
    }


    return (
        <div className={style.dialogs}>
            <div className={style.dialogsBar}>
                {dialogs}
            </div>
            <div className={style.messages}>
                {messages}
                <div className={style.right}>

                    <MessageReduxForm onSubmit={onSubmit}/>

                </div>
            </div>

        </div>
    )
}

export default Dialogs;