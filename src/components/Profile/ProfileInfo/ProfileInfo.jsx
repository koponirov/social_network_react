import React from 'react';
import style from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src='https://avatars.mds.yandex.net/get-pdb/1385901/97a55a4e-221b-436f-a746-bd680871dc5b/s1200'
                     alt='space'></img>
            </div>
            <div className={style.description}>
                ava+description
            </div>
        </div>
    )
}

export default ProfileInfo;