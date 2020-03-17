import React, {useState} from 'react';
import style from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Preloader";
import photo from '../../../assets/images/ussser.svg'
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import {ProfileDataFormRedux} from "../ProfileDataForm";
import {NavLink} from "react-router-dom";


const ProfileInfo = ({profile, isOwner, status, updateStatus, savePhoto,saveProfileData,currentUser,startChatting}) => {

    const [editMode, setEditMode] = useState(false)

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
            () => {setEditMode(false)})
    };

    return (
        <div className={style.description}>

            <img src={profile.photos.large != null ? profile.photos.large : photo} alt='user photo'/>
            {editMode && <input type='file' onChange={onMainPhotoSelected}/>}
            <ProfileStatusWithHooks status={status} isOwner={isOwner} updateStatus={updateStatus}/>
            {!isOwner&&
            <NavLink to={`/dialogs/${currentUser}/messages`}>
                <button onClick={()=>startChatting(currentUser)}>chat</button>
            </NavLink>}
            {editMode ?
                <ProfileDataFormRedux initialValues={profile} onSubmit={onSubmit} profile={profile} /> :
                <ProfileData profile={profile}
                             isOwner={isOwner}
                             activateEditMode={() => {
                                 setEditMode(true)
                             }}/>
            }
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div><b>{contactTitle}</b> {contactValue}</div>
    )
};

const ProfileData = ({profile, isOwner, activateEditMode}) => {
    return (
        <div>
            <div><b>{profile.fullName}</b></div>
            <div><b>About me:</b> {profile.aboutMe}</div>
            <div><b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'not'}</div>
            <div><b>Professional skills:</b> {profile.lookingForAJobDescription}</div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
            {isOwner && <button onClick={activateEditMode}>edit</button>}
        </div>
    )
}

export default ProfileInfo;