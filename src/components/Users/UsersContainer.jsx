import {connect} from 'react-redux'
import Users from "./Users";
import {followAC, setCurrentPageAC, setTotalUsersAmountAC, setUsersAC, unFollowAC} from "../../redux/usersReducer";



let mapStateToProps=(state)=>{
    return {
        users: state.usersPage.users,
        pageUsersAmount:state.usersPage.pageUsersAmount,
        totalUsersAmount: state.usersPage.totalUsersAmount,
        currentPage:state.usersPage.currentPage
    }
};

let mapDispatchToProps=(dispatch)=>{
    return {
        follow:(userId)=>{
            dispatch(followAC(userId));
        },
        unfollow:(userId)=>{
            dispatch(unFollowAC(userId));
        },
        setUsers:(users)=>{
            dispatch(setUsersAC(users));
        },
        setCurrentPage:(pageNumber)=>{
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersAmount:(totalUsers)=>
            dispatch(setTotalUsersAmountAC(totalUsers))
    }
}

const UsersContainer=connect(mapStateToProps,mapDispatchToProps)(Users);

export default UsersContainer;

