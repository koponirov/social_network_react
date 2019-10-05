import React from 'react';
import s from './Profile.module.css';

const Profile = () => {
    return <div className={s.content}>
        <div>
            <img src='https://avatars.mds.yandex.net/get-pdb/1385901/97a55a4e-221b-436f-a746-bd680871dc5b/s1200' alt='space'></img>
        </div>
        <div>
            ava+description
        </div>
        <div>
            My posts
        </div>
        <div>
            New post
        </div>
        <div>
        <div>
            post1
        </div>
        <div>
            post2
        </div>
        </div>
    </div>
}

export default Profile;