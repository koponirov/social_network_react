import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Preloader";


const ProfileInfo = (props) => {
    if(!props.profile){
        return <Preloader/>
    }

    return (
        <div>
            <div>
                <img src='https://avatars.mds.yandex.net/get-pdb/1385901/97a55a4e-221b-436f-a746-bd680871dc5b/s1200'
                     alt='space'></img>
            </div>
            <div className={style.description}>
                <img src={props.profile.photos.large} />
                <div>about me: {props.profile.aboutMe}</div>
                <div>looking for a job: {props.profile.lookingForAJob? 'yes': 'not'}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;