import React from 'react';
import Message from "./Message";
import MessageReduxForm from "./../MessageForm";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

const Messages = (props) => {

    let messages = props.messages.map((m) => {
        return (
            <Message userName={m.senderName} userId={m.senderId} messageText={m.body} key={m.id} addedAt={m.addedAt}/>
        )
    })

    const sendMessage = (values) => {

        props.sendMessage(props.currentUser, values.message)
    };

    return <div className={s.messages__container}>
                 <div>
                    <NavLink to={'/dialogs'}>back to dialogs</NavLink>
                </div>
                <div className={s.messages}>{messages}</div>
                <MessageReduxForm className={s.message__form} onSubmit={sendMessage}/>
            </div>

}

export default Messages;

