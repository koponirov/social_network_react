import {connect} from 'react-redux'
import React from 'react'
import {
    follow,
    setCurrentPage, setInProgress,
    setIsLoading,
    setTotalUsersAmount,
    setUsers,
    unfollow
} from '../../redux/usersReducer';
import Users from "./Users";
import Preloader from '../../common/Preloader/Preloader';
import {usersAPI} from '../../api/api';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.setIsLoading(true);
        usersAPI.getUsers(this.props.currentPage,this.props.pageUsersAmount)
        .then(data => {
            this.props.setIsLoading(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersAmount(data.totalCount)
        })
    }

    onPageChanged = (currentPageNumber) => {
        this.props.setIsLoading(true);
        this.props.setCurrentPage(currentPageNumber);
        usersAPI.getUsers(currentPageNumber,this.props.pageUsersAmount).then(data => {
            this.props.setIsLoading(false);
            this.props.setUsers(data.items);
        })
    }

    render() {

        return (<>
                {this.props.isLoading ? <Preloader/> : null}
                <Users
                    onPageChanged={this.onPageChanged}
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
    return {
        users: state.usersPage.users,
        pageUsersAmount: state.usersPage.pageUsersAmount,
        totalUsersAmount: state.usersPage.totalUsersAmount,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading,
        followingInProgress: state.usersPage.followingInProgress
    }
};

/*let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unFollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersAmount: (totalUsers) => {
            dispatch(setTotalUsersAmountAC(totalUsers))
        },
        setIsLoading: (isLoading)=>{
            dispatch(setIsLoadingAC(isLoading))
        }
    }
}*/


export default connect(mapStateToProps,
    {follow, unfollow, setUsers, setCurrentPage, setTotalUsersAmount, setIsLoading,setInProgress})(UsersContainer);

