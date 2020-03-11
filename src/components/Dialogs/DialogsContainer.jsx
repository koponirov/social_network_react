import React from 'react';
import {sendMessage} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {dialogsAPI} from "../../api/api";

class DialogsContainer extends React.Component {

    componentDidMount() {
        dialogsAPI.startChatting(6348);
        dialogsAPI.getDialogs();
        dialogsAPI.sendMessage(6348,'hello!!');
        dialogsAPI.getDialogWithUser (6348);

    }

    render() {
        return <Dialogs
            dialogs={this.props.dialogs}
            messages={this.props.messages}
        />

    }
}


let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
};


export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {sendMessage})
)(DialogsContainer)