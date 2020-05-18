import React from 'react'
import styles from "./Users.module.css";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import {FixedSizeList as List} from "react-window"
import UserItem from "./UserItem";

const UsersList = ({users, hasNextPage,isNextPageLoading,loadNextPage,totalUsers}) => {

    let items = users;

    const itemCount = totalUsers;

    const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

    const isItemLoaded = index => !hasNextPage || index < items.length;

    const Row = ({index, style}) => {

        let userPhoto,userName,userStatus,user,userId;

        if (!isItemLoaded(index)) {

            userId = '';
            userPhoto = false;
            userName = 'Loading...';
            userStatus= 'Loading...';
        } else {
            user = items[index];
            userId = user.id;
            userPhoto = user.photos.small;
            userName = user.name;
            userStatus= user.status
        }

        let path = '/profile/' + userId;

        return (
            <UserItem path={path}
                      style={style}
                      userName={userName}
                      userPhoto={userPhoto}
                      userStatus={userStatus}/>
        );
    };

    return (
        <div className={styles.list}>
            <AutoSizer >
                {({ height, width }) => (
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        loadMoreItems={loadMoreItems}
                        itemCount={itemCount}
                        minimumBatchSize={50}
                        threshold={25}
                    >
                        {({ onItemsRendered, ref }) => (
                            <List
                                height={height}
                                itemCount={itemCount}
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

