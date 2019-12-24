import React from 'react';
import {onMessageChangeActionCreator, sendMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

let mapStateToProps=(state)=> {
    return {
        dialogs:state.dialogsPage.dialogs,
        messages:state.dialogsPage.messages,
        newMessageText:state.dialogsPage.newMessageText
        }
};

let mapDispatchToProps=(dispatch)=>{
    return {
        changeMessageText:(text)=>{

            dispatch(onMessageChangeActionCreator(text))
        },
        sendMessage:()=>{

            dispatch(sendMessageActionCreator())
        }
    }
}

const DialogsContainer=  withAuthRedirect(connect (mapStateToProps,mapDispatchToProps) (Dialogs));

export default DialogsContainer;