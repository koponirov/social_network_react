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
    getIsLoading,
    getPageUsersAmount,
    getTotalUsersAmount,
    getUsers
} from "../../redux/usersSelectors";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageUsersAmount)
    }

    render() {
        console.log('render Users')
        return (<>
                {this.props.isLoading ? <Preloader/> : null}
                <Users
                    onPageChanged={this.props.onPageChanged}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    totalUsersAmount={this.props.totalUsersAmount}
                    pageUsersAmount={this.props.pageUsersAmount}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    setInProgress={this.props.setInProgress}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
};

let mapStateToProps = (state) => {
    console.log('mapStateToProps Users')

    return {
        users: getUsers(state),
        pageUsersAmount: getPageUsersAmount(state),
        totalUsersAmount: getTotalUsersAmount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

export default compose (
    connect(mapStateToProps, {follow, unfollow, setInProgress, requestUsers, onPageChanged}),
    //withAuthRedirect
) (UsersContainer)

