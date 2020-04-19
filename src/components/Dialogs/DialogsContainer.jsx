import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {requestDialogs, requestNewMessagesCount} from "../../redux/dialogsReducer";
import DialogsList from "./DialogsList";
import s from "../Users/Users.module.css";
import Preloader from "../../common/Preloader/Preloader";


class DialogsContainer extends React.Component {

    componentDidMount() {
        this.props.requestDialogs();
        this.props.requestNewMessagesCount()
    }

    render() {
        return (<div className={s.list__container}>
                {this.props.dialogs.length > 0 ? <DialogsList
                    dialogs={this.props.dialogs}
                /> : <Preloader/>}
            </div>
        )
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