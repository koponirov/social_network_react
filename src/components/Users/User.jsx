import React from 'react'
import style from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import {NavLink} from "react-router-dom";


const User = (props) => {
    let user = props.user
    return (
        <div className={style.wrapper}>

            <div >
                    <div className={style.leftBlock}>
                        <NavLink to={'/profile/' + user.id} className={style.avatar}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto}/>
                        </NavLink>
                        <div>
                            {user.followed
                                ? <button disabled={props.followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              props.follow(user.id)
                                          }}>unfollow</button>

                                : <button disabled={props.followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              props.unfollow(user.id)
                                          }}>follow</button>}

                        </div>
                    </div>
                    <div className={style.rightBlock}>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>"{'user.location.country'}"</div>
                            <div>'{'user.location.city'}'</div>
                        </span>

                    </div>
                </div>

        </div>
    )
};

export default User;
