import React from 'react';
import style from './Profile.module.css';
import MyPosts from '../Profile/MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div className={style.content}>
            <ProfileInfo/>
            <MyPosts state={props.state} addPost={props.addPost} updateText={props.updateText}/>
        </div>
    )
}

export default Profile;