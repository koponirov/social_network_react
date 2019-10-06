import React from 'react';
import s from './Post.module.css';

const Post = () => {
    return (
        <div className={s.item}>
            <img src='https://картинки-для-срисовки.рф/image/cache/catalog/vse-kartinki/kosmonavt/kosmonavt-011-800x800.jpg'></img>
            <div>post1</div>
        </div>
    )
}

export default Post;