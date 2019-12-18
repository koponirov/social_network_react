import React from 'react';
import Header from "./Header";
import * as axios from 'axios';
import {connect} from "react-redux";
import {setUserData,showUserPhoto} from "../../redux/authReducer";

class HeaderContainer extends React.Component  {

    componentDidMount() {

        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me',
            {withCredentials:true})
            .then(response=>{
                if (response.data.resultCode===0){
                    let {email,id,login}=response.data.data;
                    this.props.setUserData(email,id,login);
                    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
                        .then(response=>{
                            let smallUserPhoto=response.data.photos.small;
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

