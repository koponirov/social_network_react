import React from 'react';
import s from './Dialogs.module.css';
import DialogWithUser from './DialogWithUser/DialogWithUser'
import {Redirect} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import {FixedSizeList as List} from "react-window";
import styles from "../Users/Users.module.css";
import AutoSizer from "react-virtualized-auto-sizer";

const DialogsList = ({dialogs}) => {


    const Row = ({index, style}) => {

        let user = dialogs[index]

        return (<div style={style}>
                <DialogWithUser userName={user.userName}
                                userId={user.id}
                                photo={user.photos.small}
                                newMessages={user.hasNewMessages}

                />
            </div>

        )
    }

    return (<div className={styles.list}>

            {dialogs.length > 0 ?
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
                </AutoSizer> :
                <Preloader/>}

        </div>
    )
}

export default DialogsList;

