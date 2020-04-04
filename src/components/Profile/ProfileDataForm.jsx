import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";
import s from './ProfileInfo/ProfileInfo.module.css'
import styles from "../../common/FormControls/FormControls.module.css";
import {maxLengthCreator} from "../../utilites/validators/validators";

const ProfileDataForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.user__profile__information__container}>
                <table className={s.user__profile__information__table}>
                    <tr>
                        <td className={s.property}>FullName:</td>
                        <td className={s.value}>{createField('Full name', 'fullName', [], Input)}</td>
                    </tr>
                    <tr>
                        <td className={s.property}>About me:</td>
                        <td className={s.value}>{createField('About me', 'aboutMe', [], Textarea)}</td>
                    </tr>
                    <tr>
                        <td className={s.property}>Looking for a job:</td>
                        <td className={s.value}>{createField('Looking for a job',
                            'lookingForAJob', [], Input, {type: 'checkbox'})}</td>
                    </tr>
                    <tr>
                        <td className={s.property}>Professional skills:</td>
                        <td className={s.value}>{createField('Professional skills', 'lookingForAJobDescription',
                            [], Textarea)}</td>
                    </tr>
                    <tr>
                        <td className={s.property}>Contacts:</td>
                    </tr>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <tr className={s.contacts}>
                            <td className={s.property}>{key}:</td>
                            <td className={s.value}>{createField('', 'contacts.' + key, [], Input)} </td>
                        </tr>
                    })}

                </table>
                {props.error && <div className={styles.error}>{props.error}</div>}
                <button className={s.btn}>save</button>
            </div>

        </form>
    )
}

export const ProfileDataFormRedux = reduxForm({
    form: 'profileData'
})(ProfileDataForm)

