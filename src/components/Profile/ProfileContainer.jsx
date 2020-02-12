import React from 'react';
import Profile from './Profile';
import {connect} from "react-redux";
import {addPost, getUserProfile, getUserStatus, updateUserStatus,} from "../../redux/profileReducer";
import { withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

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
        debugger;
        this.refreshProfile();


    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        debugger;
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile ()
        }
    }

    render() {
        console.log('render Profile')
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}/>
        )
    }
}

let mapStateToProps = (state) => {
    console.log('mapStateToProps Profile')
    return (
        {
            profile: state.profilePage.profile,
            status: state.profilePage.status,
            authorizedUserId: state.auth.id,
            isAuth: state.auth.isAuth
        }
    )

};

export default compose(
    connect (mapStateToProps, {addPost,getUserProfile,getUserStatus,updateUserStatus}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)