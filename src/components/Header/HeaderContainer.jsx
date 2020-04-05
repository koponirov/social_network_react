import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/authReducer";
import {requestNewMessagesCount} from "../../redux/dialogsReducer";
import {getProfileAvatar} from "../../redux/usersSelectors";

class HeaderContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    avatar: state.auth.photo,
    newMessagesCount: state.dialogsPage.newMessagesCount,
    profile: state.auth.authProfile
})
export default connect(mapStateToProps, {logout})(HeaderContainer);

