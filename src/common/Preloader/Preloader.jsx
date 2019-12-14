import React from 'react'
import loading from "../../assets/images/loader.svg";

const Preloader=()=>{
    return (
        <div>
            <img src={loading} />
        </div>
    )
}

export default Preloader;