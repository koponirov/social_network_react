import {connect} from 'react-redux'
import React from 'react'
import {
    followAC,
    setCurrentPageAC,
    setIsLoadingAC,
    setTotalUsersAmountAC,
    setUsersAC,
    unFollowAC
} from "../../redux/usersReducer";
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.setIsLoading(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageUsersAmount}`).then(response => {
            this.props.setIsLoading(false);
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersAmount(response.data.totalCount)
        })
    }

    onPageChanged = (currentPageNumber) => {
        this.props.setIsLoading(true);
        this.props.setCurrentPage(currentPageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPageNumber}&count=${this.props.pageUsersAmount}`).then(response => {
            this.props.setIsLoading(false);
            this.props.setUsers(response.data.items);
        })
    }

    render() {

        return (<>
                {this.props.isLoading? <Preloader />:null}
                <Users
                    onPageChanged={this.onPageChanged}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    totalUsersAmount={this.props.totalUsersAmount}
                    pageUsersAmount={this.props.pageUsersAmount}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}/>
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
        isLoading: state.usersPage.isLoading
    }
};

let mapDispatchToProps = (dispatch) => {
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
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

