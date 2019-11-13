import React from 'react';
import style from './Post.module.css';

const Post = (props) => {
    return (
        <div className={style.item}>
            <img
                src='https://картинки-для-срисовки.рф/image/cache/catalog/vse-kartinki/kosmonavt/kosmonavt-011-800x800.jpg'></img>
            <div>{props.message}</div>
            <span className={style.likes}>like {props.likeCounter}</span>
        </div>
    )
}

export default Post;