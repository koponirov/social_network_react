import React from 'react'
import loading from '../../assets/images/466.svg';
import s from './Preloader.module.css'

const Preloader=()=>{
    return (
        <div className={s.container}>
            <img src={loading} />
        </div>
    )
}

export default Preloader;