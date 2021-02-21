import React from 'react';
import s from "./UserItem.module.css";
import defaultPhoto from "../../assets/images/man.svg";
import {NavLink} from "react-router-dom";

type PropsType = {
    userName: string
    userStatus?: string
    userPhoto: string | null
    path: string
    style: any
    lastSeen?: string
}

const UserItem: React.FC<PropsType> = ({ userName, userStatus, userPhoto, path, style }) => {

    return (
        <NavLink to={path}>
            <div className={s.listItem__container} style={style}>
                <div className={s.listItem}>
                    <div className={s.ava}>
                        <img src={ userPhoto ? userPhoto : defaultPhoto} alt='userPhoto'/>
                    </div>
                    <div className={s.content__container}>
                        <div className={s.content}>
                            {userName}
                        </div>
                        <div className={s.status}>
                            {userStatus}
                        </div>
                    </div>
                </div>

            </div>
        </NavLink>
    )
};

export default UserItem;
