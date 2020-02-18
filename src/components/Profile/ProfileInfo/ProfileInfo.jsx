import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Preloader";
import photo from '../../../assets/images/ussser.svg'
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";


const ProfileInfo = ({profile,isOwner,status,updateStatus,savePhoto}) => {

    if(!profile){
        return <Preloader/>
    }

    const onMainPhotoSelected = (e)=> {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (

        <div>
            <div className={style.description}>
                <div><b>{profile.fullName}</b></div>
                <img src={profile.photos.large !=null ? profile.photos.large : photo} alt='user photo' />
                {isOwner && <input type='file' onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <div><b>About me:</b> {profile.aboutMe}</div>
                <div><b>Looking for a job:</b> {profile.lookingForAJob? 'yes': 'not'}</div>
                <div><b>Professional skills:</b> {profile.lookingForAJob}</div>

                <div>
                    <b>Contacts:</b> {Object.keys(profile.contacts).map(key=>{
                       return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
                </div>

            </div>
        </div>
    )
}

const Contact = ({contactTitle,contactValue}) => {
    return (
        <div><b>{contactTitle}</b> {contactValue}</div>
    )
}

export default ProfileInfo;