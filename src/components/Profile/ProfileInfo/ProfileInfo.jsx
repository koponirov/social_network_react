import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Preloader";
import photo from '../../../assets/images/userPhoto.png'
import ProfileStatus from "../ProfileStatus/ProfileStatus";

const ProfileInfo = (props) => {

    if(!props.profile){
        return <Preloader/>
    }

    return (

        <div>
            <div className={style.description}>
                <img src={props.profile.photos.large !=null ? props.profile.photos.large : photo} alt='user photo' />
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                <div>about me: {props.profile.aboutMe}</div>
                <div>looking for a job: {props.profile.lookingForAJob? 'yes': 'not'}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;