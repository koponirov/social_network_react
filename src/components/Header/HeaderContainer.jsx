import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout, refreshProfileData,} from "../../redux/authReducer";

class HeaderContainer extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentProfileData !== this.props.currentProfileData) {
            this.props.refreshProfileData(this.props.id)
        }
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    id: state.auth.id,
    login: state.auth.login,
    avatar: state.auth.photo,
    newMessagesCount: state.dialogsPage.newMessagesCount,
    profile: state.auth.authProfile,
    currentProfileData: state.profilePage.profile
});

export default connect(mapStateToProps, {logout, refreshProfileData})(HeaderContainer);

