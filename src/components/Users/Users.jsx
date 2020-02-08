import React from 'react'
import style from "./Users.module.css";
import Pagination from "../../common/Pagination/Pagination";
import User from "./User";


const Users = (props) => {


    return (
        <div className={style.wrapper}>
            <Pagination
                totalUsersAmount={props.totalUsersAmount}
                pageUsersAmount={props.pageUsersAmount}
                onPageChanged={props.onPageChanged}
                currentPage={props.currentPage}
            />

            {
                props.users.map(u => <User
                        user={u}
                        key={u.id}
                        followingInProgress={props.followingInProgress}
                        follow={props.follow}
                        unfollow={props.unfollow}
                    />
                )
            }
        </div>
    )
};

export default Users;
