import {connect} from 'react-redux'
import React from 'react'
import {
    setInProgress, onPageChanged, follow, unfollow, requestUsers
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


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    render() {
        return (<div>

                <Users
                    onPageChanged={this.props.onPageChanged}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    setInProgress={this.props.setInProgress}
                    followingInProgress={this.props.followingInProgress}
                    isLoading={this.props.isLoading}
                />
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
    connect(mapStateToProps, {follow, unfollow, setInProgress, requestUsers, onPageChanged}),
    //withAuthRedirect
) (UsersContainer)

