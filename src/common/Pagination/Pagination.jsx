import React, {useState} from 'react'
import style from './Pagination.module.css';
import cn from 'classnames'

const Pagination = (props) => {

    let pagesCount = Math.ceil(props.totalItems / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionSize = 10;

    let portionCount = Math.ceil(pagesCount/portionSize);
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber-1)*portionSize+1;
    let rightPortionPageNumber = portionNumber*portionSize;

    return (
        <div className={style.paginator}>
            {portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber-1)}}> {'\<'} </button>}

            {pages
                .filter(page => page >= leftPortionPageNumber && page <=rightPortionPageNumber)
                .map(page => {
                return (
                    <span
                        onClick={() => props.onPageChanged(page, props.pageSize)}

                        className={ cn({
                            [style.selectedPage]: props.currentPage === page
                        }, style.pageNumber) }
                        key={page}
                    >
                            {page}
                        </span>
                )
            })}

            { portionCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }}> &gt </button> }

        </div>

    )
};

export default Pagination;


