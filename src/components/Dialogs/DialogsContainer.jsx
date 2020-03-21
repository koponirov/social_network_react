import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {requestDialogs, requestNewMessagesCount} from "../../redux/dialogsReducer";


class DialogsContainer extends React.Component {

    componentDidMount() {
        this.props.requestDialogs();
        this.props.requestNewMessagesCount()
    }

    render() {
        return <Dialogs
            dialogs={this.props.dialogs}
        />
    }
}

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        newMessageText: state.dialogsPage.newMessageText
    }
};

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {requestDialogs,requestNewMessagesCount})
)(DialogsContainer)