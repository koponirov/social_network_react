import React from 'react';
import styles from "./UserItem.module.css";
import defaultPhoto from "../../assets/images/man.svg";
import {NavLink} from "react-router-dom";

const UserItem = ({userName,userStatus,userPhoto,path,style}) => {

    return (
        <NavLink to={path}>
            <div className={styles.listItem__container} style={style}>
                <div className={styles.listItem}>
                    <div className={styles.ava}>
                        <img src={ userPhoto ? userPhoto : defaultPhoto}/>
                    </div>
                    <div className={styles.content__container}>
                        <div className={styles.content}>
                            {userName}
                        </div>
                        <div className={styles.status}>
                            {userStatus}
                        </div>
                    </div>
                </div>

            </div>
        </NavLink>
    )
};

export default UserItem;