import React from 'react'
import style from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";


const Users = (props) => {

    let pageNumber= Math.ceil(props.totalUsersAmount/props.pageUsersAmount);

    let pages=[];

    for(let i=1;i<=pageNumber;i++) {
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
                        <div className={style.avatar}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>unfollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
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
