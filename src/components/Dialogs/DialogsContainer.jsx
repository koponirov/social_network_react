import React from 'react';
import {onMessageChangeActionCreator, sendMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

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


export default compose (
    withAuthRedirect,
    connect (mapStateToProps,mapDispatchToProps)
)(Dialogs)