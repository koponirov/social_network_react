import React from 'react';
import {Field, reduxForm} from "redux-form";
import {required} from "../../utilites/validators/validators";
import {createField, Input} from "../../common/FormControls/FormControls";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import styles from '../../common/FormControls/FormControls.module.css'
import s from './Login.module.css'


const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {

        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.login__wrapper}>
            <h3>LOGIN</h3>
            <span>Please, fill your e-mail address and password to enter</span>
            <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
        </div>
    )
}

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>

            <div className={s.login__field}>
                {createField('email','email',[required],Input)}
            </div>

            <div className={s.login__field}>
                {createField('password','password',[required],Input,{type:'password'})}
            </div>

            <div className={s.login__checkbox}>
                {createField('','rememberMe',[],Input,{type:'checkbox'},'')}
                <label>remember me</label>
            </div>

            {props.captcha && <img src={props.captcha}/>}
            {props.captcha && <div>
                {createField('captcha','captcha',[required],Input)}
            </div>}

            {props.error && <div className={styles.error}>
                    {props.error}
                </div>
            }
            <div >
                <button className={s.login__btn}>Login</button>
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