import React from 'react'
import style from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import {NavLink} from "react-router-dom";
import {followAPI} from "../../api/api";


const Users = (props) => {

    let pageNumber = Math.ceil(props.totalUsersAmount / props.pageUsersAmount);

    let pages = [];

    for (let i = 1; i <= pageNumber; i++) {
        pages.push(i);
    }
    return (
        <div className={style.wrapper}>

            <div>
                {pages.map(page => {
                    return (
                        <span
                            onClick={() => props.onPageChanged(page,props.pageUsersAmount)}
                            className={props.currentPage === page && style.selected}>
                            {page}
                        </span>
                    )
                })}

            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <div className={style.leftBlock}>
                        <NavLink to={'/profile/' + u.id} className={style.avatar}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}/>
                        </NavLink>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id=>id===u.id)}  onClick={() => {
                                    props.setInProgress(true,u.id);
                                    followAPI.followToUser(u.id)
                                        .then(data => {

                                            if (data.resultCode == 0) {
                                                props.unfollow(u.id)
                                            }
                                            props.setInProgress(false,u.id);
                                        });
                                }}>unfollow</button>

                                : <button disabled={props.followingInProgress.some(id=>id===u.id)} onClick={() => {
                                    props.setInProgress(true,u.id);
                                    followAPI.unfollowToUser(u.id)
                                        .then(data => {

                                            if (data.resultCode == 0) {
                                                props.follow(u.id)
                                            }
                                            props.setInProgress(false,u.id);
                                        });


                                }}>follow</button>}

                        </div>
                    </div>
                    <div className={style.rightBlock}>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>"{'u.location.country'}"</div>
                            <div>'{'u.location.city'}'</div>
                        </span>

                    </div>
                </div>)
            }
        </div>
    )
};

export default Users;
