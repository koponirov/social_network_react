import React from 'react';
import s from './Dialogs.module.css';
import DialogWithUser from './DialogWithUser/DialogWithUser'
import {Redirect} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";

const Dialogs = (props) => {

    let dialogs = props.dialogs.map((dialog) => {
           return (
               <DialogWithUser userName={dialog.userName}
                               userId={dialog.id}
                               photo={dialog.photos.small}
                               newMessages={dialog.hasNewMessages}
               />
           )
       })


    return (
        <div className={s.dialogs_container}>
            {dialogs.length?
                <div className={s.dialogs}>
                    <div>{dialogs}</div>
                </div>:
                <div className={s.preloder}>
                    <Preloader />
                </div>

            }
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