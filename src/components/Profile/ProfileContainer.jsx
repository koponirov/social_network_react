import React from 'react';
import Profile from './Profile';
import {connect} from "react-redux";
import {addPost, changeText, getUserProfile,} from "../../redux/profileReducer";
import {Redirect, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {

    componentDidMount() {
        
        let userId=this.props.match.params.userId;
        if (!userId){
            userId=2;
        }
        this.props.getUserProfile(userId)

        /*axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+userId)
            .then(response => {
            this.props.setUserProfile(response.data);
            this.props.isLookingForAJob(response.data.lookingForAJob)
        })*/
    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}
//create AuthRedirectComponent(HOC) with auth logic(wrapping ProfileContainer with HOC)
let AuthRedirectComponent=withAuthRedirect(ProfileContainer)

let mapStateToProps=(state) => ({profile: state.profilePage.profile});

//wrapping  AuthRedirectComponent(HOC) by withRouter
let withRouterProfileContainer = withRouter(AuthRedirectComponent);

export default connect (mapStateToProps,
    {addPost,changeText,getUserProfile})(withRouterProfileContainer);