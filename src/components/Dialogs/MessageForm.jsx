import React from 'react';
import {Field, reduxForm} from "redux-form";
import s from './Messages/Messages.module.css'
import {maxLengthCreator, required} from "../../utilites/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";

const maxLength300 = maxLengthCreator(300)

const MessageForm = (props)=> {

    return (
        <form onSubmit={props.handleSubmit} className={s.message__form}>

            <div className={s.message__send__button}>
                <button type='submit' >send</button>
            </div>
            <div className={s.message__field}>
                <Field
                    name='message'
                    component={Textarea}
                    autocompele='off'

                />
            </div>


        </form>
    )
}

const MessageReduxForm = reduxForm({
    // a unique name for the form
    form: 'message'
})(MessageForm)

export default MessageReduxForm;