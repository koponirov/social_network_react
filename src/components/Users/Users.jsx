import React from 'react'
import style from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import {NavLink} from "react-router-dom";
import * as axios from "axios";


const Users = (props) => {

    let pageNumber = Math.ceil(props.totalUsersAmount / props.pageUsersAmount);

    let pages = [];

    for (let i = 1; i <= pageNumber; i++) {
        pages.push(i);
    }
    return (
        <div className={style.wrapper}>

            <div>
                {pages.map(p => {
                    return (
                        <span
                            onClick={() => props.onPageChanged(p)}
                            className={props.currentPage === p && style.selected}>{p}</span>
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
                                ? <button onClick={() => {

                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                        {
                                            withCredentials: true,
                                            headers: {"API-KEY": "ed6168aa-083c-4712-91d3-afe70566eba2"}
                                        })
                                        .then(response => {

                                            if (response.data.resultCode == 0) {
                                                props.unfollow(u.id)
                                            }
                                        });
                                }}>unfollow</button>

                                : <button onClick={() => {

                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
                                        {
                                            withCredentials: true,
                                            headers: {"API-KEY": "ed6168aa-083c-4712-91d3-afe70566eba2"}
                                        })
                                        .then(response => {

                                            if (response.data.resultCode == 0) {
                                                props.follow(u.id)
                                            }
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
