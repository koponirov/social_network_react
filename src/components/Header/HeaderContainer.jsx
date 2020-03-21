import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/authReducer";
import {requestNewMessagesCount} from "../../redux/dialogsReducer";

class HeaderContainer extends React.Component {


    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    photo: state.auth.photo,
    newMessagesCount: state.dialogsPage.newMessagesCount
})
export default connect(mapStateToProps, {getAuthUserData,logout})(HeaderContainer);

