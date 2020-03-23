import React, {useState, useEffect} from 'react'

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
    }

        return (
            <div>
                {!editMode &&
                    <div>
                        <span onClick={activateEditMode}>{props.status|| "...status"}</span>
                    </div>}
                {editMode &&
                    <div>
                        <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}></input>
                    </div>}
            </div>
        )
    };


export default ProfileStatusWithHooks;