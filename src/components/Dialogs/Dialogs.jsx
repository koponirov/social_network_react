import React from 'react';
import style from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogWithUser from './DialogWithUser/DialogWithUser'
import {onMessageChangeActionCreator, sendMessageActionCreator} from "../../redux/State";




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

    let newMessage=React.createRef();

    let sendMessage=()=>{

        props.dispatch(sendMessageActionCreator());
    }

    let onMessageChange= () => {
        let text=newMessage.current.value;
        let action=onMessageChangeActionCreator(text);
        props.dispatch(action);

    }
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsBar}>
                {dialogs}
            </div>
            <div className={style.messages}>
                {messages}
                <div className={style.right}>

                    <textarea ref={newMessage} value={props.state.newMessageText} onChange={onMessageChange}></textarea>
                    <button onClick={sendMessage}>send message</button>

                </div>
            </div>

        </div>
    )
}

export default Dialogs;