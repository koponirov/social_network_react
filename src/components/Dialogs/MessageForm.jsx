import React from 'react';
import {Field, reduxForm} from "redux-form";

import {maxLengthCreator, required} from "../../utilites/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";

const maxLength10 = maxLengthCreator(10)

const MessageForm = (props)=> {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                name='message'
                component={Textarea}
                validate={[required,maxLength10]}
            />
            <button type='submit' >send message</button>
        </form>
    )
}

const MessageReduxForm = reduxForm({
    // a unique name for the form
    form: 'message'
})(MessageForm)

export default MessageReduxForm;