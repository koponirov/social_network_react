import { followAPI, usersAPI } from "../api/api";
import { User } from "../types";

const FOLLOW = 'socialNetwork/users/FOLLOW';
const UNFOLLOW = 'socialNetwork/users/UNFOLLOW';
const SET_USERS = 'socialNetwork/users/SET_USERS';
const SET_MORE_USERS = 'socialNetwork/users/SET_MORE_USERS';
const SET_CURRENT_PAGE = 'socialNetwork/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS = 'socialNetwork/users/SET_TOTAL_USERS';
const TOGGLE_IS_LOADING = 'socialNetwork/users/TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'socialNetwork/users/TOGGLE_IS_FOLLOWING_PROGRESS';



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
type FollowUserType = {
    type: typeof FOLLOW
    userId: number
}
type UnfollowUserType = {
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<User>
}
type SetMoreUsersType = {
    type: typeof SET_MORE_USERS
    users: Array<User>
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    pageNumber: number
}
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS
    totalUsers: number
}
type SetIsLoadingType = {
    type: typeof TOGGLE_IS_LOADING
    isLoading: boolean
}
type SetInProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    userId: number
    inProgress: boolean
}

export const followUser = (userId: number): FollowUserType => ({type: FOLLOW, userId});
export const unfollowUser = (userId: number): UnfollowUserType => ({type: UNFOLLOW, userId});
export const setUsers = (users: Array<User>): SetUsersType => ({type: SET_USERS, users});
export const setMoreUsers = (users: Array<User>): SetMoreUsersType => ({type: SET_MORE_USERS, users});
export const setCurrentPage = (pageNumber: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalUsersCount = (totalUsers: number): SetTotalUsersCountType => ({type: SET_TOTAL_USERS, totalUsers});
export const setIsLoading = (isLoading: boolean): SetIsLoadingType => ({type: TOGGLE_IS_LOADING, isLoading});
export const setInProgress = (inProgress: boolean, userId: number): SetInProgressType => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, inProgress, userId}
};
export const requestUsers = (currentPage: number, pageSize: number) => {

    return async (dispatch: any) => {
        dispatch(setIsLoading(true));
        let response = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setIsLoading(false));
        dispatch(setUsers(response.data.items));
        dispatch(setTotalUsersCount(response.data.totalCount))
    }
};

// export const requestMoreUsers = (currentPage: Number, pageSize: Number) => {
//
//     return async (dispatch: any) => {
//         dispatch(setIsLoading(true));
//         let response = await usersAPI.getUsers(currentPage , pageSize);
//         dispatch(setIsLoading(false));
//         dispatch(setMoreUsers(response.data.items));
//         dispatch(setTotalUsersCount(response.data.totalCount))
//     }
// };

export const onPageChanged = (currentPageNumber: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(setIsLoading(true));
        dispatch(setCurrentPage(currentPageNumber));
        let response = await usersAPI.getUsers(currentPageNumber, pageSize)
        dispatch(setIsLoading(false));
        dispatch(setUsers(response.data.items));
    }
};

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(setInProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(setInProgress(false, userId));
};

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        await followUnfollowFlow(
            dispatch,
            userId,
            followAPI.followToUser.bind(followAPI),
            unfollowUser)
    }
};

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        await followUnfollowFlow(
            dispatch,
            userId,
            followAPI.unfollowToUser.bind(followAPI),
            followUser)
    }
};

export default usersReducer;