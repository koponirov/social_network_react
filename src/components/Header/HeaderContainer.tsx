import React from 'react';
import Header from "./Header";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout, refreshProfileData } from "../../redux/authReducer";
import { ProfileType } from "../../types";
import { AppStateType } from "../../redux/reduxStore";


type MapStatePropsType = {
    isAuth: boolean
    id: number
    login: string | null
    avatar: string | null
    newMessagesCount: number
    profile: ProfileType | null
    currentProfileData: ProfileType | null

}

type MapDispatchPropsType = {
    logout: () => void
    refreshProfileData: (id: number) => void
}

type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class HeaderContainer extends React.Component<PropsType> {

    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.currentProfileData !== this.props.currentProfileData) {
            this.props.refreshProfileData(this.props.id)
        }
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    id: state.auth.id,
    login: state.auth.login,
    avatar: state.auth.photo,
    newMessagesCount: state.dialogsPage.newMessagesCount,
    profile: state.auth.authProfile,
    currentProfileData: state.profilePage.profile
});

export default  compose(
    connect<MapStatePropsType,MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {logout, refreshProfileData})
)(HeaderContainer);

