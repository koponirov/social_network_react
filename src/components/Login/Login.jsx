import React from 'react';
import {Field, reduxForm} from "redux-form";
import {required} from "../../utilites/validators/validators";
import {createField, Input} from "../../common/FormControls/FormControls";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import styles from '../../common/FormControls/FormControls.module.css'


const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {

        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
        </div>
    )
}

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>

            <div>
                {createField('email','email',[required],Input)}
            </div>

            <div>
                {createField('password','password',[required],Input,{type:'password'})}
            </div>

            <div>
                {createField('','rememberMe',[],Input,{type:'checkbox'},'remember me')}
            </div>

            {props.captcha && <img src={props.captcha}/>}
            {props.captcha && <div>
                {createField('captcha','captcha',[required],Input)}
            </div>}

            {props.error && <div className={styles.error}>
                    {props.error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
        }
}

export default connect(mapStateToProps, {login})(Login);