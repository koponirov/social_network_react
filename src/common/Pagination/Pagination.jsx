import React from 'react'
import style from './Pagination.module.css';

const Pagination = (props) => {

    let pageNumber = Math.ceil(props.totalUsersAmount / props.pageUsersAmount);

    let pages = [];

    for (let i = 1; i <= pageNumber; i++) {
        pages.push(i);
    }
    return (
        <div>
            {pages.map(page => {
                return (
                    <span
                        onClick={() => props.onPageChanged(page, props.pageUsersAmount)}
                        className={props.currentPage === page && style.selected}>
                            {page}
                        </span>
                )
            })}
        </div>

    )
}

export default Pagination;


