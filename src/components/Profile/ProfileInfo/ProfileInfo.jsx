import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Preloader";
import photo from '../../../assets/images/man.svg'
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import {ProfileDataFormRedux} from "../ProfileDataForm";
import {NavLink} from "react-router-dom";
import editIcon from '../../../assets/images/gear.svg'


const ProfileInfo = ({profile, isOwner, status, updateStatus, savePhoto, saveProfileData, currentUser, startChatting}) => {

    const [editMode, setEditMode] = useState(false);

    const [showContacts, setShowContacts] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfileData(formData).then(
            () => {
                setEditMode(false)
            })
    };

    return (<div className={s.user__profile}>
            <div className={s.user__profile__title}>
                <div className={s.user__profile__name}>{profile.fullName}</div>
                <div className={s.user__profile__settings__btn}>
                    {isOwner && <img src={editIcon} onClick={() => {setEditMode(!editMode)}}/>}
                </div>

            </div>
            <ProfileStatusWithHooks status={status}
                                    isOwner={isOwner}
                                    updateStatus={updateStatus}/>
            <div className={s.user__profile__container}>
                <div className={s.user__profile__photo}>

                    <img src={profile.photos.large != null ? profile.photos.large : photo} alt='user photo'/>
                    {editMode &&
                    <div>
                        <input type='file' name="file" id="file" onChange={onMainPhotoSelected} className={s.input__file}/>
                        <label for="file">Choose main photo...</label>
                    </div>

                    }

                    {!isOwner &&
                    <NavLink to={`/dialogs/${currentUser}/messages`}>
                        <button onClick={() => startChatting(currentUser)} className={s.btn}>send message</button>
                    </NavLink>}
                </div>
                <div className={s.user__profile__information}>


                    {editMode ?
                        <ProfileDataFormRedux initialValues={profile} onSubmit={onSubmit} profile={profile}/> :
                        <ProfileData profile={profile}
                                     isOwner={isOwner}
                                     showContacts={showContacts}
                                     activateEditMode={() => {
                                         setEditMode(true)
                                     }}
                                     activateShowContacts={() => {
                                         setShowContacts(!showContacts)
                                     }}/>
                    }
                </div>

            </div>
        </div>

    )
}

const Contact = ({contactTitle, contactValue}) => {
    return (<tr>
            <td className={s.property__contacts}>{contactTitle}</td>
            <td className={s.value}>{contactValue}</td>
        </tr>
    )

};

const ProfileData = ({profile, isOwner, activateEditMode,showContacts, activateShowContacts}) => {
    return (
        <div className={s.user__profile__information__container}>
            <table className={s.user__profile__information__table}>
                <tr >
                    <td className={s.property}>About me:</td>
                    <td className={s.value}>{profile.aboutMe}</td>
                </tr>
                <tr className={s.user__profile__information__table__tread}>
                    <td className={s.property}>Looking for a job:</td>
                    <td className={s.value}>{profile.lookingForAJob ? 'yes' : 'not'}</td>
                </tr>
                <tr className={s.user__profile__information__table__tread}>
                    <td className={s.property}>Professional skills:</td>
                    <td className={s.value}>{profile.lookingForAJobDescription}</td>
                </tr>
                <tr >
                    <td className={s.toggle__show} onClick={activateShowContacts}>
                        {showContacts?'hide contacts':'show contacts'}
                    </td>
                </tr>

                {showContacts&&(Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                }))}
            </table>
        </div>
    )
}

export default ProfileInfo;

