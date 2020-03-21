import {connect} from 'react-redux'
import React from 'react'
import {
    setInProgress, onPageChanged, follow, unfollow, requestUsers, requestMoreUsers, setCurrentPage, setUsers
} from '../../redux/usersReducer';
import Users from "./Users";
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


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, 10);
    }

    componentWillUnmount() {
        this.props.setCurrentPage(1);
        this.props.setUsers([]);
    }

    render() {
        return (<div className={s.users__container}>
                {this.props.users ? <UsersList
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    pageSize={this.props.pageSize}
                    isLoading={this.props.isLoading}
                    requestMoreUsers={this.props.requestMoreUsers}
                /> : <Preloader/>}
            </div>
        )
    }
};

let mapStateToProps = (state) => {

    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setInProgress,
        requestUsers,
        requestMoreUsers,
        setCurrentPage,
        setUsers,
        onPageChanged
    }),
    withAuthRedirect
)(UsersContainer)

