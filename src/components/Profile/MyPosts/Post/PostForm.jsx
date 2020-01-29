import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {maxLengthCreator, required} from "../../../../utilites/validators/validators";

const maxLength5 = maxLengthCreator (5)

const PostForm = (props) => {
    debugger;
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name='postText'
                    component='textarea'
                    validate={[required, maxLength5]}

                />

            </div>
            <div>
                <button >send</button>
            </div>
        </form>
    )
};

const PostReduxForm = reduxForm ({
    form: 'post'
})(PostForm);

export default PostReduxForm;

