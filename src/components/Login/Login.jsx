import React from 'react';
import {Field, reduxForm} from "redux-form";
import {required} from "../../utilites/validators/validators";
import {Input} from "../../common/FormControls/FormControls";

const Login=(props)=>{

    const onSubmit=(formData)=>{
        console.log(formData)
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const LoginForm=(props)=>{

    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field
                        name='login'
                        component={Input}
                        placeholder={'login'}
                        validate={[required]}
                    />
                </div>
                <div>
                    <Field
                        name='password'
                        component={Input}
                        placeholder={'password'}
                        validate={[required]}/>

                </div>
                <div>
                    <Field name='rememberMe' component='input' type='checkbox'/>remember me
                </div>
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

export default Login;