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
        <div className={s.form__wrapper}>
            <div className={s.form}>
                <h3 className={s.form__title}>LOGIN</h3>
                <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>

            </div>
        </div>
    )
}

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} >

            <div className={s.form__group}>
                <div className={s.form__field}>
                    {createField('Email', 'email', [required], Input)}
                </div>
                <label className={s.form__label}></label>
            </div>

            <div className={s.form__group}>
                <div className={s.form__field}>
                    {createField('Password', 'password', [required], Input, {type: 'password'})}
                </div>
                <label className={s.form__label}></label>
            </div>

            {props.captcha && <img src={props.captcha}/>}
            {props.captcha && <div>
                {createField('captcha', 'captcha', [required], Input)}
            </div>}

            {props.error && <div className={styles.error}>
                {props.error}
            </div>
            }
            <div>
                <button onTouchEnd={props.handleSubmit} className={s.form__button}>Login</button>
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