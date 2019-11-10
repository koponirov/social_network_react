import React from 'react';
import style from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogWithUser = (props) => {

    let path = `/dialogs/${props.userId}`

    return (
        <div className={style.dialogWith} >
            <NavLink to={path}>
                {props.userName}
            </NavLink>
        </div>
    )
}

const Message= (props) => {
    return (
        <div className={style.messageContent}>
            {props.messageText}
        </div>
    )
}


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

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsBar}>
                <DialogWithUser userName={dialogsData[0].userName} userId={dialogsData[0].userId} />
                <DialogWithUser userName={dialogsData[1].userName} userId={dialogsData[1].userId} />
                <DialogWithUser userName={dialogsData[2].userName} userId={dialogsData[2].userId} />
                <DialogWithUser userName={dialogsData[3].userName} userId={dialogsData[3].userId} />
                <DialogWithUser userName={dialogsData[4].userName} userId={dialogsData[4].userId} />
            </div>
            <div className={style.messages}>
                <Message messageText={messagesData[0].messageText} />
                <Message messageText={messagesData[1].messageText}/>
                <Message messageText={messagesData[2].messageText}/>
                <Message messageText={messagesData[3].messageText}/>
                <Message messageText={messagesData[4].messageText}/>


            </div>
        </div>
    )
            }

export default Dialogs;