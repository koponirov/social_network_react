import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogWithUser from './DialogWithUser/DialogWithUser'
import {Redirect} from "react-router-dom";
import MessageReduxForm from "./MessageForm";

const Dialogs = (props) => {

    let arr = []

    for (let i=0;i<200;i++) {
        arr.push(i)
    }

    let dialogs = arr.map((dialog) => {
        return (
            <DialogWithUser userName={dialog} userId={dialog}/>
        )
    })

    /*   let dialogs = props.dialogs.map((dialog) => {
           return (
               <DialogWithUser userName={dialog.userName} userId={dialog.userId}/>
           )
       })

       let messages = props.messages.map((message) => {
           return (
               <Message messageText={message.messageText}/>
           )
       })
   */
    const sendMessage = (values) => {
        props.sendMessage(values.message)
    };

    return (
        <div className={s.dialogs_container}>
            <div className={s.dialogs}>dialogs
                <div>{dialogs}</div>

            </div>
            <div className={s.messages__container}>
                <div className={s.messages}>message
                    <div>{dialogs}</div>

                </div>
                <MessageReduxForm className={s.message__form}/>
            </div>


        </div>
    )
}

export default Dialogs;

/*
before :
<div className={style.dialogsBar}>
                {dialogs}
            </div>
            <div className={style.messages}>
                {messages}
                <div >

                    <MessageReduxForm onSubmit={sendMessage}/>

                </div>
            </div>
 */