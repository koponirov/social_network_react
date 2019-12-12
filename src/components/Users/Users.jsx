import React from 'react'
import style from './Users.module.css'
import * as axios from 'axios'
import userPhoto from '../../assets/images/userPhoto.png'

const Users = (props) => {

    if (props.users.length === 0) {

        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response=>{
                props.setUsers(response.data.items)})
        /*props.setUsers([
                {
                    id: 1,
                    userName: 'Sasha',
                    followed: true,
                    status: 'i\'m OK',
                    location: {country: 'Russia', city: 'Moscow'},
                    ava: 'https://image.flaticon.com/icons/png/512/64/64096.png'
                },
                {
                    id: 2,
                    userName: 'Olga',
                    followed: true,
                    status: 'i\'m OK',
                    location: {country: 'Russia', city: 'Moscow'},
                    ava: 'https://image.flaticon.com/icons/png/512/64/64096.png'
                },
                {
                    id: 3,
                    userName: 'Nelli',
                    followed: true,
                    status: 'i\'m OK',
                    location: {country: 'Russia', city: 'Moscow'},
                    ava: 'https://image.flaticon.com/icons/png/512/64/64096.png'
                },
                {
                    id: 4,
                    userName: 'Igor',
                    followed: false,
                    status: 'i\'m OK',
                    location: {country: 'Russia', city: 'Moscow'},
                    ava: 'https://image.flaticon.com/icons/png/512/64/64096.png'
                },
                {
                    id: 5,
                    userName: 'Sergey',
                    followed: false,
                    status: 'i\'m OK',
                    location: {country: 'Russia', city: 'Moscow'},
                    ava: 'https://image.flaticon.com/icons/png/512/64/64096.png'
                }
            ]
        )*/
    }

    return (
        <div className={style.wrapper}>
            {
                props.users.map(u => <div key={u.id}>
                    <div className={style.leftBlock}>
                        <div className={style.avatar}>
                            <img src={u.photos.small!=null?u.photos.small:userPhoto}/>
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