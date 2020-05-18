import React from 'react';
import s from './ProfileData.module.css';
import cn from 'classnames';

const ProfileData = ({ profile, isOwner, activateEditMode,showContacts, activateShowContacts }) => {
    return (
        <div className={s.profile_info_container}>
            <div className={cn(s.property_container,s.shadow)}>
                <div className={s.property_name}>About me:</div>
                <div className={s.property_value}>{profile.aboutMe}</div>
            </div>
            <div className={cn(s.property_container,s.shadow)}>
                <div className={s.property_name}>Looking for a job:</div>
                <div className={s.property_value}>{profile.lookingForAJob ? 'yes' : 'not'}</div>
            </div>
            <div className={cn(s.property_container,s.shadow)}>
                <div className={s.property_name}>Professional skills:</div>
                <div className={s.property_value}>{profile.lookingForAJobDescription}</div>
            </div>
            <div className={cn(s.property_container,s.shadow)}>
                <div className={s.toggle__show} onClick={activateShowContacts}>
                    {showContacts?'hide contacts':'show contacts'}
                </div>
            </div>

            {showContacts&&(Object.keys(profile.contacts).map(key => {
             return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            }))}

        </div>
    )
};

const Contact = ({contactTitle, contactValue}) => {
    return (<div className={cn(s.property_container,s.shadow)}>
            <div className={s.property_name}>{contactTitle}</div>
            <div className={s.property_value}>{contactValue}</div>
        </div>
    )
}


export default ProfileData;

