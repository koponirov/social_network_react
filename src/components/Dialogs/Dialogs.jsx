import React from 'react';
import style from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogWithUser from './DialogWithUser/DialogWithUser'
import {writeMessageText} from "../../redux/State";


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

        props.dispatch({type:'sendMessage'});
    }

    let onMessageChange= () => {
        let text=newMessage.current.value;
        props.dispatch({type:'writeMessage',newText: text});

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