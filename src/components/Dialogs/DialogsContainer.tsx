import React from 'react';
import { connect } from "react-redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { requestDialogs, requestNewMessagesCount, ThunkType } from "../../redux/dialogsReducer";
import DialogsList from "./DialogsList";
import s from "../Users/Users.module.css";
import Preloader from "../../common/Preloader/Preloader";
import { DialogType } from "../../types";
import { AppStateType } from "../../redux/reduxStore";


type MapStatePropsType = {
    dialogs: Array<DialogType>
    //newMessageText: string

}

type MapDispatchPropsType = {
    requestDialogs: () => ThunkType
    requestNewMessagesCount: () => ThunkType
}

type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class DialogsContainer extends React.Component<PropsType> {

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

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        //newMessageText: state.dialogsPage.newMessageText
    }
};

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType,MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {requestDialogs,requestNewMessagesCount})
)(DialogsContainer)
