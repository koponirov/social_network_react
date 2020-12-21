import React from 'react';
import Message from "./Message";
import MessageReduxForm from "./../MessageForm";
import s from './Messages.module.css'
import {NavLink} from "react-router-dom";
import parseIso from 'date-fns/parseISO'
import photo from "../../../assets/images/man.svg";
import arrow from '../../../assets/images/arrow.svg';
import Preloader from "../../../common/Preloader/Preloader";

const Messages = ({userData,messages,currentUser,sendMessage,isLoading,authId}) => {

    let name = userData.length ?userData[0].userName:'';
    let userAva = userData.length ?userData[0].photos.small:'';
    let messagesAll = messages.map((m) => {
        return (
            <Message userName={m.senderName}
                     userId={m.senderId}
                     authId={authId}
                     messageText={m.body}
                     key={m.id}
                     addedAt={parseIso(m.addedAt)}/>
        )
    });

    const sendMessageForm = (values) => {
        debugger
        sendMessage(currentUser, values.message)
    };

    return <div className={s.messages__container}>
        <div className={s.messages__header}>

            <NavLink to={'/dialogs'} className={s.messages__header_button}>
                <img src={arrow}></img>
                <span>back </span>
            </NavLink>

            <div>
                <div className={s.header__user_name}>{name}</div>
            </div>
            <div className={s.header__user_photo_box}>
                <img src={userAva ? userAva : photo} alt='userAva' className={s.header__user_photo_image}/>
            </div>
        </div>
        <div className={s.messages__box}>
                {isLoading ?<Preloader/> :messagesAll}
        </div>
        <div className={s.message__form_container}>
            <MessageReduxForm onSubmit={sendMessageForm}/>
        </div>
    </div>
}

export default Messages;

