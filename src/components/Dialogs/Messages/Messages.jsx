import React from 'react';
import Message from "./Message";
import MessageReduxForm from "./../MessageForm";
import s from './Messages.module.css'
import {NavLink} from "react-router-dom";
import arrow from './../../../assets/images/arrow_back.svg'
import parseIso from 'date-fns/parseISO'

const Messages = (props) => {

    let messages = props.messages.map((m) => {
        console.log(m.addedAt)
        return (
            <Message userName={m.senderName}
                     userId={m.senderId}
                     messageText={m.body}
                     key={m.id}
                     addedAt={parseIso(m.addedAt)}/>
        )
    })

    const sendMessage = (values) => {

        props.sendMessage(props.currentUser, values.message)
    };

    return <div className={s.messages__container}>
        <div className={s.back__btn}>
            <NavLink to={'/dialogs'}> <img src={arrow}/> back to dialogs</NavLink>
        </div>
        <div className={s.messages__box}>
                {messages}
        </div>


        <div className={s.message__form_container}>
            <MessageReduxForm onSubmit={sendMessage}/>
        </div>

    </div>
}

export default Messages;

