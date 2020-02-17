import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Preloader";
import photo from '../../../assets/images/ussser.svg'
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";


const ProfileInfo = (props) => {

    if(!props.profile){
        return <Preloader/>
    }

    const onMainPhotoSelected = (e)=> {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (

        <div>
            <div className={style.description}>
                <img src={props.profile.photos.large !=null ? props.profile.photos.large : photo} alt='user photo' />
                {props.isOwner && <input type='file' onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                <div>about me: {props.profile.aboutMe}</div>
                <div>looking for a job: {props.profile.lookingForAJob? 'yes': 'not'}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;