import React from 'react';
import style from './Profile.module.css';
import MyPosts from '../Profile/MyPosts/MyPosts';

const Profile = () => {
    return (
        <div className={style.content}>
            <div>
                <img src='https://avatars.mds.yandex.net/get-pdb/1385901/97a55a4e-221b-436f-a746-bd680871dc5b/s1200' alt='space'></img>
            </div>
            <div>
                ava+description
            </div>
            <div>
                <MyPosts />
            </div>
        </div>
    )
            }

export default Profile;