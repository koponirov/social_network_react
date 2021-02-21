import {connect} from 'react-redux'
import React from 'react'
import {
    usersActions, follow, unfollow, requestUsers,
} from '../../redux/usersReducer';
import Preloader from '../../common/Preloader/Preloader';
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsLoading, getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import UsersList from "./UsersList";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import s from './Users.module.css'
import {User} from "../../types";
import {AppStateType} from "../../redux/reduxStore";



type MapStatePropsType = {
    users: Array<User>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isLoading: boolean
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setInProgress: (inProgress: boolean, userId: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (pageNumber: number) => void
    setUsers: (users: Array<User>) => void
}

type OwnProps = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, 100);
    }

    componentWillUnmount() {
        //this.props.setCurrentPage(1);
        //this.props.setUsers([]);
    }

    loadNextPage = (startIndex: number,stopIndex: number) => {
        let itemsNumber = (stopIndex - startIndex)+1;
        let pageNumber = Math.ceil((startIndex+1)/itemsNumber);
        this.props.requestUsers(pageNumber,itemsNumber)
    };

    render() {
        return (<div className={s.list__container}>
                {this.props.users.length > 0 ?
                    <UsersList
                        users={this.props.users}
                        hasNextPage={true}
                        isNextPageLoading={this.props.isLoading}
                        loadNextPage={this.loadNextPage}
                        totalUsers={this.props.totalUsersCount}
                    /> : <Preloader/>
                }
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {

    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

const { setInProgress, setCurrentPage, setUsers } = usersActions

export default compose(
    connect<MapStatePropsType,MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        setInProgress,
        requestUsers,
        setCurrentPage,
        setUsers,
    }),
    withAuthRedirect
)(UsersContainer)
