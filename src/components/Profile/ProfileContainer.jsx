import React from 'react';
import Profile from './Profile';
import {connect} from "react-redux";
import {
    addPost,
    getUserProfile,
    getUserStatus,
    savePhoto,
    saveProfileData,
    updateUserStatus,
} from "../../redux/profileReducer";
import { withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {startChatting} from "../../redux/dialogsReducer";

class ProfileContainer extends React.Component {

    refreshProfile () {
        let userId=this.props.match.params.userId;
        if (!userId) {
            userId=this.props.authorizedUserId};
        if(!userId) {
            this.props.history.push('/login')
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile ()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     isOwner={!this.props.match.params.userId}
                     currentUser={this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}
                     saveProfileData={this.props.saveProfileData}
                     startChatting={this.props.startChatting}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return (
        {   profile: state.profilePage.profile,
            status: state.profilePage.status,
            authorizedUserId: state.auth.id,
            isAuth: state.auth.isAuth
        }
    )
};

export default compose(
    connect (mapStateToProps, {addPost,getUserProfile,
        getUserStatus,updateUserStatus,savePhoto,saveProfileData,startChatting }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)