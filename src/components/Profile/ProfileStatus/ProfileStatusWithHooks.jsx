import React, {useState, useEffect} from 'react'
import s from "../ProfileInfo/ProfileInfo.module.css";
import editIcon from '../../../assets/images/edit.svg'

const ProfileStatusWithHooks = (props) => {

    const [editMode,setEditMode] = useState(false);
    const [status,setStatus] = useState(props.status);

    useEffect(()=>{
        setStatus(props.status)
    },[props.status]);

    const activateEditMode = () => {
        if (props.isOwner) {
            setEditMode(true)}

    };

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    };

        return (
            <div className={s.user__profile__status__container}>

                {!editMode &&
                    <div className={s.user__profile__status}>
                        <span className={s.saved_status}>{props.status|| "...status"}</span>
                    </div>}
                {editMode &&
                    <div className={s.user__profile__status}>
                        <input onChange={onStatusChange} autoFocus={true}
                               onBlur={deactivateEditMode} value={status} className={s.input_status}>

                        </input>
                    </div>}
                {props.isOwner && <div onClick={activateEditMode} className={s.user__profile__status__edit}>
                    <img src={editIcon} alt='editIcon'/>
                </div>}
            </div>
        )
    };

export default ProfileStatusWithHooks;