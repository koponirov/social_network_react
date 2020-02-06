import {followAPI, usersAPI} from "../api/api";

const FOLLOW = 'socialNetwork/users/FOLLOW';
const UNFOLLOW = 'socialNetwork/users/UNFOLLOW';
const SET_USERS = 'socialNetwork/users/SET_USERS';
const SET_CURRENT_PAGE = 'socialNetwork/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS = 'socialNetwork/users/SET_TOTAL_USERS';
const TOGGLE_IS_LOADING = 'socialNetwork/users/TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'socialNetwork/users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageUsersAmount: 5,
    totalUsersAmount: 20,
    currentPage: 1,
    followingInProgress: [2],
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            };
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case SET_TOTAL_USERS:
            return {
                ...state,
                totalUsersAmount: action.totalUsers
            }
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.inProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
};

export const followUser = (userId) => ({type: FOLLOW, userId});
export const unfollowUser = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalUsersAmount = (totalUsers) => ({type: SET_TOTAL_USERS, totalUsers});
export const setIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading});
export const setInProgress = (inProgress, userId) => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, inProgress, userId}
}
export const requestUsers = (currentPage, pageUsersAmount) => {
    return async (dispatch) => {
        dispatch(setIsLoading(true));
        let response = await usersAPI.getUsers(currentPage, pageUsersAmount)
            dispatch(setIsLoading(false));
            dispatch(setUsers(response.data.items));
            dispatch(setTotalUsersAmount(response.data.totalCount))
    }
}

export const onPageChanged = (currentPageNumber, pageUsersAmount) => {
    return async (dispatch) => {
        dispatch(setIsLoading(true));
        dispatch(setCurrentPage(currentPageNumber));
        let response = await usersAPI.getUsers(currentPageNumber, pageUsersAmount)
            dispatch(setIsLoading(false));
            dispatch(setUsers(response.data.items));
    }
}

const followUnfollowFlow = async (dispatch, userId,apiMethod, actionCreator) => {
    dispatch(setInProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(setInProgress(false, userId));
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(
            dispatch,
            userId,
            followAPI.followToUser.bind(followAPI),
            unfollowUser)
    }
}
export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(
            dispatch,
            userId,
            followAPI.unfollowToUser.bind(followAPI),
            followUser)
    }
}

export default usersReducer;