import React from 'react';
import style from './Profile.module.css';
import MyPosts from '../Profile/MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {
    return (
        <div className={style.content}>
            <ProfileInfo />
            <MyPosts />
        </div>
    )
            }

export default Profile;