import React from 'react';
import style from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogWithUser from './DialogWithUser/DialogWithUser'


const Dialogs = (props) => {

    let dialogsData=[
        {userId:1, userName:'Sasha'},
        {userId:2, userName:'Olga'},
        {userId:3, userName:'Nelli'},
        {userId:4, userName:'Igor'},
        {userId:5, userName:'Sergey'},
    ]

    let dialogs= dialogsData.map ((dialog) => {
        return (
            <DialogWithUser userName={dialog.userName} userId={dialog.userId} />
        )
    })

    let messagesData=[
        {messageText: 'Hi!'},
        {messageText: 'How are u?'},
        {messageText: "I'm OK"},
        {messageText: 'What u want to do tomorrow?'},
        {messageText: 'Goodbye!'},
    ]

    let messages=messagesData.map ((message)=> {
        return (
            <Message messageText={message.messageText} />
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