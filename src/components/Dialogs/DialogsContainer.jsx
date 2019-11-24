import React from 'react';
import style from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogWithUser from './DialogWithUser/DialogWithUser'
import {onMessageChangeActionCreator, sendMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

    let state = props.store.getState();

    let sendMessage = () => {

        props.store.dispatch(sendMessageActionCreator());
    }

    let changeMessageText = (text) => {

        let action = onMessageChangeActionCreator(text);
        props.store.dispatch(action);

    }
    return (
        <Dialogs
            dialogs={state.dialogsPage.dialogs}
            messages={state.dialogsPage.messages}
            newMessageText={state.dialogsPage.newMessageText}
            changeMessageText={changeMessageText}
            sendMessage={sendMessage}/>
    )
}

export default DialogsContainer;