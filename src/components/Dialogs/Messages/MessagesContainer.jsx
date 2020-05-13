import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import Messages from "./Messages";
import {requestMessages, sendNewMessage, setMessages} from "../../../redux/dialogsReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {withRouter} from "react-router-dom";
import Preloader from "../../../common/Preloader/Preloader";
import {
    getAuthId,
    getCurrentUserData,
    getCurrentUserID,
    getIsLoading,
    getMessages
} from "../../../redux/dialogsSelectors";

class MessagesContainer extends React.Component {

    componentDidMount() {
        debugger
        let currentUserId = this.props.match.params.userId;
        this.props.requestMessages(currentUserId)
    }
    componentWillUnmount () {
        this.props.setMessages('')
    }

    render() {

        return  <Messages
            messages={this.props.messages}
            sendMessage={this.props.sendNewMessage}
            currentUser={this.props.currentUserId}
            userData={this.props.currentUserData}
            isLoading={this.props.isLoading}
            authId={this.props.authId}
        />
    }
}

let mapStateToProps = (state) => {
    return {
        messages: getMessages(state),
        currentUserId: getCurrentUserID(state),
        currentUserData: getCurrentUserData(state),
        isLoading: getIsLoading(state),
        authId: getAuthId(state)
    }
};

export default compose(
    connect(mapStateToProps, {requestMessages,sendNewMessage,setMessages}),
    withRouter,
    withAuthRedirect
)(MessagesContainer)