import React from 'react';
import s from './Dialogs.module.css';
import DialogWithUser from './DialogWithUser/DialogWithUser'
import {Redirect} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import {FixedSizeList as List} from "react-window";
import styles from "../Users/Users.module.css";
import AutoSizer from "react-virtualized-auto-sizer";
import UserItem from "../Users/UserItem";

const DialogsList = ({dialogs}) => {


    const Row = ({index, style}) => {
        
        let user = dialogs[index];

        let path = `/dialogs/${user.id}/messages`

        return (<UserItem path={path}
                          style={style}
                          userPhoto={user.photos.small}
                          userName={user.userName}/>

        )
    }

    return (<div className={styles.list}>


                <AutoSizer>
                    {({height, width}) => (

                        <List
                            height={height}
                            itemCount={dialogs.length}
                            itemSize={100}
                            width={width}
                            className={styles.window_list}
                        >
                            {Row}
                        </List>
                    )}
                </AutoSizer>
        </div>


    )
}

export default DialogsList;

