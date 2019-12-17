import React from 'react';
import Profile from './Profile';
import * as axios from "axios";
import {connect} from "react-redux";
import {addPost, changeText, isLookingForAJob, setUserProfile} from "../../redux/profileReducer";
import {withRouter} from 'react-router-dom';

class ProfileContainer extends React.Component {

    componentDidMount() {
        debugger;
        let userId=this.props.match.params.userId;
        if (!userId){
            userId=2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+userId)
            .then(response => {
            this.props.setUserProfile(response.data);
            this.props.isLookingForAJob(response.data.lookingForAJob)
        })
    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps=(state) => ({profile: state.profilePage.profile});

let withRouterProfileContainer = withRouter(ProfileContainer);

export default connect (mapStateToProps,
    {addPost,setUserProfile,changeText,isLookingForAJob})(withRouterProfileContainer);