import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import Messages from "./Messages";
import {requestMessages, sendMessage, sendNewMessage} from "../../../redux/dialogsReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {withRouter} from "react-router-dom";

class MessagesContainer extends React.Component {

    componentDidMount() {
        let currentUser = this.props.match.params.userId;
        this.props.requestMessages(currentUser)
    }
    componentWillUnmount () {

    }

    render() {

        return <Messages
            messages={this.props.messages}
            sendMessage={this.props.sendNewMessage}
            currentUser={this.props.currentUser}
        />

    }
}


let mapStateToProps = (state) => {
    return {
        messages: state.dialogsPage.messages,
        currentUser: state.dialogsPage.currentUser,
        newMessageText: state.dialogsPage.newMessageText
    }
};


export default compose(
    connect(mapStateToProps, {requestMessages,sendNewMessage}),
    withRouter,
    withAuthRedirect
)(MessagesContainer)