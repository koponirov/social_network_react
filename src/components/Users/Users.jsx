import React from 'react'
import style from "./Users.module.css";
import * as axios from 'axios';
import userPhoto from "../../assets/images/userPhoto.png";

class Users extends React.Component {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response=>{
            this.props.setUsers(response.data.items)
        })
    }
    
    render() { return (
            <div className={style.wrapper}>

                {
                    this.props.users.map(u => <div key={u.id}>
                        <div className={style.leftBlock}>
                            <div className={style.avatar}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}/>
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {
                                        this.props.unfollow(u.id)
                                    }}>unfollow</button>
                                    : <button onClick={() => {
                                        this.props.follow(u.id)
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


}

export default Users;
