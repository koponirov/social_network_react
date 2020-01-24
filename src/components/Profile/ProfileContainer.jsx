import React from 'react';
import Profile from './Profile';
import {connect} from "react-redux";
import {addPost, getUserProfile, getUserStatus, updateUserStatus,} from "../../redux/profileReducer";
import { withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        
        let userId=this.props.match.params.userId;
        if (!userId){
            userId=5441;
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)

    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
});

export default compose(
    connect (mapStateToProps, {addPost,getUserProfile,getUserStatus,updateUserStatus}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)