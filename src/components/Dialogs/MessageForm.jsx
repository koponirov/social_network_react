import React from 'react';
import {Field, reduxForm} from "redux-form";

const MessageForm = (props)=> {
    
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name='message' component='textarea' />
            <button type='submit'>send message</button>
        </form>
    )
}

const MessageReduxForm = reduxForm({
    // a unique name for the form
    form: 'message'
})(MessageForm)

export default MessageReduxForm;