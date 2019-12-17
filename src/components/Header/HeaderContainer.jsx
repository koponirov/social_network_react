import React from 'react';
import Header from "./Header";
import * as axios from 'axios';
import {connect} from "react-redux";
import {setUserData} from "../../redux/authReducer";

class HeaderContainer extends React.Component  {

    componentDidMount() {

        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me',
            {withCredentials:true})
            .then(response=>{
                if (response.data.resultCode===0){
                    let {email,id,login}=response.data.data;
                    this.props.setUserData(email,id,login)
                }
            })
    }

    render () {
        return <Header {...this.props}/>
    }

}

const mapDispatchToProps=(state)=>({
        isAuth: state.auth.isAuth,
        login: state.auth.login
})
export default connect (mapDispatchToProps,{setUserData})(HeaderContainer);

