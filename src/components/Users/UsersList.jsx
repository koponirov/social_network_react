import React from 'react'
import styles from "./Users.module.css";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import {FixedSizeList as List} from "react-window"
import photo from "../../assets/images/ussser.svg"
import {NavLink} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";


const UsersList = (props) => {


    const users = props.users


    const Row = ({index, style}) => {
        const user = users[index];
        return (
            <NavLink to={'/profile/' + user.id}>
                <div className={styles.listItem} style={style}>
                    <div>
                        <img src={user.photos.small ? user.photos.small : photo}/>
                    </div>
                    <div>
                        <div className={styles.content}>
                            { user.name}
                        </div>
                        <div className={styles.status}>
                            {user.status}
                        </div>
                    </div>


                </div>
            </NavLink>

        );
    };

    const loadMoreItems = () => {
        console.log('load')

        props.requestMoreUsers(props.currentPage, props.pageSize)
    }

    const isItemLoaded = () => {
        return props.isLoading
    }


    return (
        <div className={styles.list}>
            <AutoSizer >
                {({height, width}) => (
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        loadMoreItems={loadMoreItems}
                        itemCount={users.length}
                        threshold={15}

                    >
                        {({onItemsRendered, ref}) => (
                            <List
                                className="List"
                                height={height}
                                itemCount={users.length}
                                itemSize={65}
                                width={width}
                                ref={ref}
                                onItemsRendered={onItemsRendered}
                                className={styles.noScroll}
                            >
                                {Row}
                            </List>
                        )}
                    </InfiniteLoader>
                )}
            </AutoSizer>

        </div>
    )
};

export default UsersList;
