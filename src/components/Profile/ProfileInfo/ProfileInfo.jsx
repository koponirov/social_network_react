import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import s_p from '../ProfileInfo/ProfileData/ProfileData.module.css';
import Preloader from "../../../common/Preloader/Preloader";
import photo from '../../../assets/images/man.svg'
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import {ProfileDataFormRedux} from "./ProfileData/ProfileDataForm";
import {NavLink} from "react-router-dom";
import editIcon from '../../../assets/images/gear.svg'
import ProfileData from "./ProfileData/ProfileData";


const ProfileInfo = ({ profile, isOwner, status, updateStatus, savePhoto,
                         saveProfileData, currentUser, startChatting }) => {

    const [editMode, setEditMode] = useState(false);

    const [showContacts, setShowContacts] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    };

    const onSubmit = (formData) => {
        saveProfileData(formData)
            .then(() => setEditMode(false))
    };

    return (<div className={s.user__profile}>
            <div className={s.user__profile__title}>
                <div className={s.user__profile__name}>{profile.fullName}</div>
                <div className={s.user__profile__settings__btn}>
                    {isOwner && <img src={editIcon} onClick={() => {setEditMode(!editMode)}} alt='editIcon'/>}
                </div>

            </div>
            <ProfileStatusWithHooks status={status}
                                    isOwner={isOwner}
                                    updateStatus={updateStatus}/>
            <div className={s.user__profile__container}>
                <div className={s.user__profile__photo__block}>
                    <div className={s.user__profile__photo}>
                        <img src={profile.photos.large != null ? profile.photos.large : photo} alt='userPhoto'/>
                    </div>

                    {editMode &&
                    <div>
                        <input type='file' name="file" id="file"
                               onChange={onMainPhotoSelected}
                               className={s.input__file}/>
                        <label for="file">Choose main photo...</label>
                    </div>

                    }

                    {!isOwner &&
                    <NavLink to={`/dialogs/${currentUser}/messages`}>
                        <button onClick={() => startChatting(currentUser)} className={s_p.btn}>send message</button>
                    </NavLink>
                    }
                </div>
                <div className={s.user__profile__information}>
                    {editMode ?
                        <ProfileDataFormRedux initialValues={profile}
                                              onSubmit={onSubmit}
                                              profile={profile}/>:
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
};

export default ProfileInfo;

