import React from 'react';
import Profile from './Profile';
import {connect} from "react-redux";
import {addPost, changeText, getUserBio,} from "../../redux/profileReducer";
import {withRouter} from 'react-router-dom';

class ProfileContainer extends React.Component {

    componentDidMount() {
        debugger;
        let userId=this.props.match.params.userId;
        if (!userId){
            userId=2;
        }
        this.props.getUserBio(userId)

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

let mapStateToProps=(state) => ({profile: state.profilePage.profile});

let withRouterProfileContainer = withRouter(ProfileContainer);

export default connect (mapStateToProps,
    {addPost,changeText,getUserBio})(withRouterProfileContainer);