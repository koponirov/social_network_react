import React from 'react'
import style from "./Users.module.css";
import Pagination from "../../common/Pagination/Pagination";
import User from "./User";
import Preloader from "../../common/Preloader/Preloader";


const Users = (props) => {

    return (
        <div className={style.wrapper}>
            <Pagination
                totalItems={props.totalUsersCount}
                pageSize={props.pageSize}
                onPageChanged={props.onPageChanged}
                currentPage={props.currentPage}
            />
<div className={style.preloader_container}>
    {props.isLoading ? <Preloader/> : null}
</div>
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
