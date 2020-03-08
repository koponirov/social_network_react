import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";
import style from './ProfileInfo/ProfileInfo.module.css'
import styles from "../../common/FormControls/FormControls.module.css";

const ProfileDataForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={style.formWrapper}>

            <div >
                <div className={style.titleData}><b>FullName:</b></div>{createField('Full name','fullName',[],Input)}
            </div>
            <div>
                <div className={style.titleData}><b>About me:</b></div> {createField('About me','aboutMe',[],Textarea)}
            </div>
            <div>
                <div className={style.titleData}><b>Looking for a job:</b></div>
                {createField('Looking for a job',
                    'lookingForAJob',[],Input,{type:'checkbox'})}
            </div>
            <div>
                <div className={style.titleData}><b>Professional skills:</b></div>
                {createField('Professional skills','lookingForAJobDescription',
                    [],Textarea)}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(props.profile.contacts).map(key => {
                return <div className={styles.contacts}>
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

