import React from 'react';
import {Field, reduxForm} from "redux-form";

import {maxLengthCreator, required} from "../../utilites/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";

const maxLength300 = maxLengthCreator(300)

const MessageForm = (props)=> {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                name='message'
                component={Textarea}
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