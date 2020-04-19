import {connect} from 'react-redux'
import React from 'react'
import {
    setInProgress, onPageChanged, follow, unfollow, requestUsers, requestMoreUsers, setCurrentPage, setUsers
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


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, 100);
        console.log(this.props.users)
    }

    componentWillUnmount() {
        //this.props.setCurrentPage(1);
        //this.props.setUsers([]);
    }

    loadNextPage = (startIndex,stopIndex) => {

        let itemsNumber = (stopIndex - startIndex)+1;
        let pageNumber = Math.ceil((startIndex+1)/itemsNumber)
        this.props.requestMoreUsers(pageNumber,itemsNumber)
    }

    render() {
        return (<div className={s.list__container}>
                {this.props.users.length>0 ? <UsersList
                    users={this.props.users}
                    hasNextPage={true}
                    isNextPageLoading={this.props.isLoading}
                    loadNextPage={this.loadNextPage}
                    totalUsers={this.props.totalUsersCount}
                /> : <Preloader/>}
            </div>
        )
    }
}

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

// return (<div className={s.users__container}>
//     {this.props.users.length>0 ? <UsersList
//         users={this.props.users}
//         hasNextPage={true}
//         isNextPageLoading={this.props.isLoading}
//         loadNextPage={this.loadNextPage}
//         totalUsers={this.props.totalUsersCount}
//     /> : <Preloader/>}
// </div>