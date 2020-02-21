import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";
import style from './ProfileInfo/ProfileInfo.module.css'
import styles from "../../common/FormControls/FormControls.module.css";

const ProfileDataForm = (props) => {
    debugger;
    return (
        <form onSubmit={props.handleSubmit} className={style.formWrapper}>
            <div>
                <b>FullName:</b>{createField('Full name','fullName',[],Input)}
            </div>
            <div>
                <b>About me:</b> {createField('About me','aboutMe',[],Textarea)}
            </div>
            <div>
                <b>Looking for a job:</b>
                {createField('Looking for a job',
                    'lookingForAJob',[],Input,{type:'checkbox'})}
            </div>
            <div>
                <b>Professional skills:</b>
                {createField('Professional skills','lookingForAJobDescription',
                    [],Textarea)}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(props.profile.contacts).map(key => {
                return <div>
                    <b>{key}: {createField('','contacts.'+key,[],Input)} </b>
                </div>
            })}
            </div>

                { props.error && <div className={styles.error}>{props.error}</div>}

            <button >save</button>
        </form>
    )
}

export const ProfileDataFormRedux = reduxForm({
    form: 'profileData'
})(ProfileDataForm)

