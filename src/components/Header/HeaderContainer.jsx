import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setUserData,showUserPhoto} from "../../redux/authReducer";
import {authAPI, profileAPI} from "../../api/api";

class HeaderContainer extends React.Component  {

    componentDidMount() {

        authAPI.getUserData()
            .then(data=>{
                if (data.resultCode===0){
                    let {email,id,login}=data.data;
                    this.props.setUserData(email,id,login);
                    profileAPI.getUserPhoto(id)
                        .then(data=>{
                            let smallUserPhoto=data.photos.small;
                            this.props.showUserPhoto(smallUserPhoto)
                        })
                }
            })
    }

    render () {
        return <Header {...this.props}/>
    }
}

const mapStateToProps=(state)=>({
        isAuth: state.auth.isAuth,
        login: state.auth.login
})
export default connect (mapStateToProps,{setUserData,showUserPhoto})(HeaderContainer);

