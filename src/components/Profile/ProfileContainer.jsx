import React from 'react';
import Profile from './Profile';
import {connect} from "react-redux";
import {addPost, changeText, getUserProfile,} from "../../redux/profileReducer";
import {Redirect, withRouter} from 'react-router-dom';

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

        if (!this.props.auth) {return <Redirect to={'/login'}/>}

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps=(state) => ({profile: state.profilePage.profile,auth: state.auth.isAuth});

let withRouterProfileContainer = withRouter(ProfileContainer);

export default connect (mapStateToProps,
    {addPost,changeText,getUserProfile})(withRouterProfileContainer);