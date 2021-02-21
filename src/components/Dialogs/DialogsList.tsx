import React from 'react';
import {FixedSizeList as List} from "react-window";
import s from "../Users/Users.module.css";
import AutoSizer from "react-virtualized-auto-sizer";
import UserItem from "../Users/UserItem";
import { DialogType } from "../../types";

type PropsType = {
    dialogs: Array<DialogType>
}

const DialogsList: React.FC<PropsType> = ({ dialogs }) => {

    // @ts-ignore
    const Row = ({ index, style }) => {

        let user = dialogs[index];

        let path = `/dialogs/${user.id}/messages`;

        return (<UserItem path={path}
                          style={style}
                          userPhoto={user.photos.small}
                          userName={user.userName}
                          lastSeen={user.lastUserActivityDate}
            />
        )
    };

    return (<div className={s.list}>
                <AutoSizer>
                    {({ height, width }) => (

                        <List
                            height={height}
                            itemCount={dialogs.length}
                            itemSize={100}
                            width={width}
                            className={s.window_list}
                        >
                            {Row}
                        </List>
                    )}
                </AutoSizer>
        </div>


    )
};

export default DialogsList;

