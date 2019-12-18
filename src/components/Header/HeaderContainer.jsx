import React from 'react';
import Header from "./Header";
import * as axios from 'axios';
import {connect} from "react-redux";
import {setUserData,showUserPhoto} from "../../redux/authReducer";
import {getUserData, getUserPhoto} from "../../api/api";

class HeaderContainer extends React.Component  {

    componentDidMount() {

        getUserData()
            .then(data=>{
                if (data.resultCode===0){
                    let {email,id,login}=data.data;
                    this.props.setUserData(email,id,login);
                    getUserPhoto(id)
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

