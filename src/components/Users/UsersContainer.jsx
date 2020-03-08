import {connect} from 'react-redux'
import React from 'react'
import {
    setInProgress, onPageChanged, follow, unfollow, requestUsers, requestMoreUsers
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


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, 5)
    }

    render() {
        return (<div>
                { this.props.users ? <UsersList
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    pageSize={this.props.pageSize}
                    isLoading={this.props.isLoading}
                    requestMoreUsers = {this.props.requestMoreUsers}
                />: <Preloader/>}

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

export default compose (
    connect(mapStateToProps, {follow, unfollow, setInProgress, requestUsers, requestMoreUsers, onPageChanged}),
    //withAuthRedirect
) (UsersContainer)

