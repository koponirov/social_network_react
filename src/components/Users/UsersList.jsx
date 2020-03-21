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
                <div className={styles.listItem__container} style={style}>
                    <div className={styles.listItem}>
                        <div className={styles.ava}>
                            <img src={user.photos.small ? user.photos.small : photo}/>
                        </div>
                        <div className={styles.content__container}>
                            <div className={styles.content}>
                                { user.name}
                            </div>
                            <div className={styles.status}>
                                {user.status}
                            </div>
                        </div>
                    </div>

                </div>
            </NavLink>

        );
    };

    const loadMoreItems = () => {
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
                                height={height}
                                itemCount={users.length}
                                itemSize={100}
                                width={width}
                                ref={ref}
                                onItemsRendered={onItemsRendered}
                                className={styles.window_list}
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
