import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../../../common/FormControls/FormControls";
import s from './ProfileData.module.css'
import styles from "../../../../common/FormControls/FormControls.module.css";
import cn from 'classnames';
import {maxLengthCreator} from "../../../../utilites/validators/validators";

const ProfileDataForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.profile_info_container}>

                <div className={s.property_container}>
                    <div className={s.property_name}>FullName:</div>
                    <div className={s.property_value}>{createField('Full name', 'fullName', [], Input)}</div>
                </div>
                <div className={s.property_container}>
                    <div className={s.property_name}>About me:</div>
                    <div className={s.property_value}>{createField('About me', 'aboutMe', [], Textarea)}</div>
                </div>
                <div className={s.property_container}>
                    <div className={s.property_name}>Looking for a job:</div>
                    <div className={cn(s.property_value,s.checkbox)}>{createField('Looking for a job',
                            'lookingForAJob', [], Input, {type: 'checkbox'})}</div>
                </div>
                <div className={s.property_container}>
                    <div className={s.property_name}>Professional skills:</div>
                    <div className={s.property_value}>{createField('Professional skills', 'lookingForAJobDescription',
                            [], Textarea)}</div>
                </div >
                <div className={s.property_container}>
                    <div className={s.property_name}>Contacts:</div>
                </div>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <div className={s.property_container}>
                            <div className={s.property_name}>{key}:</div>
                            <div className={s.property_value}>{createField('', 'contacts.' + key, [], Input)} </div>
                        </div>
                    })}


                {props.error && <div className={styles.error}>{props.error}</div>}
                <button className={s.btn}>save</button>
            </div>

        </form>
    )
}

export const ProfileDataFormRedux = reduxForm({
    form: 'profileData'
})(ProfileDataForm)

