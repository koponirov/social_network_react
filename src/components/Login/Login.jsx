import React from 'react';
import {Field, reduxForm} from "redux-form";
import {required} from "../../utilites/validators/validators";
import {Input} from "../../common/FormControls/FormControls";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import styles from '../../common/FormControls/FormControls.module.css'


const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {

        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name='email'
                    component={Input}
                    placeholder={'email'}
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    name='password'
                    component={Input}
                    type='password'
                    placeholder={'password'}
                    validate={[required]}/>

            </div>
            <div>
                <Field name='rememberMe' component='input' type='checkbox'/>remember me
            </div>
            { props.error && <div className={styles.error}>
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
    return (
        {isAuth: state.auth.isAuth}
    )
}

export default connect(mapStateToProps, {login})(Login);