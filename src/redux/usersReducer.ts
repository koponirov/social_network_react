import {followAPI, usersAPI} from "../api/api";

const FOLLOW = 'socialNetwork/users/FOLLOW';
const UNFOLLOW = 'socialNetwork/users/UNFOLLOW';
const SET_USERS = 'socialNetwork/users/SET_USERS';
const SET_MORE_USERS = 'socialNetwork/users/SET_MORE_USERS';
const SET_CURRENT_PAGE = 'socialNetwork/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS = 'socialNetwork/users/SET_TOTAL_USERS';
const TOGGLE_IS_LOADING = 'socialNetwork/users/TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'socialNetwork/users/TOGGLE_IS_FOLLOWING_PROGRESS';

export type User = {
    name: String,
    id: Number,
    photos: {
        small: null,
        large: null
    },
    status: null|String,
    followed: Boolean
}

type initialStateType = typeof initialState

let initialState = {
    users: [] as Array<User>,
    pageSize: 10,
    totalUsersCount: 20,
    currentPage: 1,
    followingInProgress: [2],
    isLoading: false,
};

const usersReducer = (state = initialState, action: any) => {

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
        case SET_MORE_USERS:
            return {
                ...state,
                users: [...state.users,...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case SET_TOTAL_USERS:
            return {
                ...state,
                totalUsersCount: action.totalUsers
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
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};

export const followUser = (userId: Number) => ({type: FOLLOW, userId});
export const unfollowUser = (userId: Number) => ({type: UNFOLLOW, userId});
export const setUsers = (users: Array<User>) => ({type: SET_USERS, users});
export const setMoreUsers = (users: Array<User>) => ({type: SET_MORE_USERS, users});
export const setCurrentPage = (pageNumber: Number) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalUsersCount = (totalUsers: Number) => ({type: SET_TOTAL_USERS, totalUsers});
export const setIsLoading = (isLoading: Boolean) => ({type: TOGGLE_IS_LOADING, isLoading});
export const setInProgress = (inProgress: Boolean, userId: Number) => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, inProgress, userId}
};
export const requestUsers = (currentPage: Number, pageSize: Number) => {

    return async (dispatch: any) => {
        dispatch(setIsLoading(true));
        let response = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setIsLoading(false));
        dispatch(setUsers(response.data.items));
        dispatch(setTotalUsersCount(response.data.totalCount))
    }
};

export const requestMoreUsers = (currentPage: Number, pageSize: Number) => {

    return async (dispatch: any) => {
        dispatch(setIsLoading(true));
        let response = await usersAPI.getUsers(currentPage , pageSize);
        dispatch(setIsLoading(false));
        dispatch(setMoreUsers(response.data.items));
        dispatch(setTotalUsersCount(response.data.totalCount))
    }
};

export const onPageChanged = (currentPageNumber: Number, pageSize: Number) => {
    return async (dispatch: any) => {
        dispatch(setIsLoading(true));
        dispatch(setCurrentPage(currentPageNumber));
        let response = await usersAPI.getUsers(currentPageNumber, pageSize)
        dispatch(setIsLoading(false));
        dispatch(setUsers(response.data.items));
    }
};

const followUnfollowFlow = async (dispatch: any, userId: Number, apiMethod: any, actionCreator: any) => {
    dispatch(setInProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(setInProgress(false, userId));
};

export const follow = (userId: Number) => {
    return async (dispatch: any) => {
        await followUnfollowFlow(
            dispatch,
            userId,
            followAPI.followToUser.bind(followAPI),
            unfollowUser)
    }
};

export const unfollow = (userId: Number) => {
    return async (dispatch: any) => {
        await followUnfollowFlow(
            dispatch,
            userId,
            followAPI.unfollowToUser.bind(followAPI),
            followUser)
    }
};

export default usersReducer;