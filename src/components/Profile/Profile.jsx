import React from 'react';
import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div className={style.content}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateUserStatus}
                         isOwner={props.isOwner}
                         currentUser={props.currentUser}
                         savePhoto={props.savePhoto}
                         saveProfileData={props.saveProfileData}
                         startChatting={props.startChatting}
            />


        </div>
    )
}

export default Profile;

//{ props.isOwner ? <MyPostsContainer/> : ''}