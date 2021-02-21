import {followAPI, ResultCodesEnum, usersAPI} from "../api/api";
import { User } from "../types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";

// const FOLLOW = 'socialNetwork/users/FOLLOW';
// const UNFOLLOW = 'socialNetwork/users/UNFOLLOW';
// const SET_USERS = 'socialNetwork/users/SET_USERS';
// const SET_MORE_USERS = 'socialNetwork/users/SET_MORE_USERS';
// const SET_CURRENT_PAGE = 'socialNetwork/users/SET_CURRENT_PAGE';
// const SET_TOTAL_USERS = 'socialNetwork/users/SET_TOTAL_USERS';
// const TOGGLE_IS_LOADING = 'socialNetwork/users/TOGGLE_IS_LOADING';
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'socialNetwork/users/TOGGLE_IS_FOLLOWING_PROGRESS';



type initialStateType = typeof initialState

let initialState = {
    users: [] as Array<User>,
    pageSize: 10,
    totalUsersCount: 20,
    currentPage: 1,
    followingInProgress: [2],
    isLoading: false,
};

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            };
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            };
        case 'SET_USERS':
            return {
                ...state,
                users: [...action.users]
            }
        case 'SET_MORE_USERS':
            return {
                ...state,
                users: [...state.users,...action.users]
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case 'SET_TOTAL_USERS':
            return {
                ...state,
                totalUsersCount: action.totalUsers
            }
        case 'TOGGLE_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

type ActionsTypes = InferActionsTypes<typeof usersActions>

export const usersActions = {
    followUser: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowUser: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<User>) => ({type: 'SET_USERS', users} as const),
    setMoreUsers: (users: Array<User>) => ({type: 'SET_MORE_USERS', users} as const),
    setCurrentPage: (pageNumber: number) => ({type: 'SET_CURRENT_PAGE', pageNumber} as const),
    setTotalUsersCount: (totalUsers: number) => ({type: 'SET_TOTAL_USERS', totalUsers} as const),
    setIsLoading: (isLoading: boolean) => ({type: 'TOGGLE_IS_LOADING', isLoading} as const),
    setInProgress: (inProgress: boolean, userId: number) => {
        return {type: 'TOGGLE_IS_FOLLOWING_PROGRESS', inProgress, userId} as const
    },
}


type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(usersActions.setIsLoading(true));

        let data = await usersAPI.getUsers(currentPage, pageSize);
        if (getState().usersPage.users && getState().usersPage.users.length > 0 ) {
            dispatch(usersActions.setMoreUsers(data.items));
        } else {
            dispatch(usersActions.setUsers(data.items));
        }
        dispatch(usersActions.setIsLoading(false));
        dispatch(usersActions.setTotalUsersCount(data.totalCount))
    }
};

const _followUnfollowFlow = async (
    dispatch: DispatchType,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionsTypes) => {

    dispatch(usersActions.setInProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === ResultCodesEnum.success) {
        dispatch(actionCreator(userId))
    }
    dispatch(usersActions.setInProgress(false, userId));
};

export const follow = (userId: number) => {
    return async (dispatch: DispatchType) => {
        await _followUnfollowFlow(
            dispatch,
            userId,
            followAPI.followToUser.bind(followAPI),
            usersActions.unfollowUser)
    }
};

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        await _followUnfollowFlow(
            dispatch,
            userId,
            followAPI.unfollowToUser.bind(followAPI),
            usersActions.followUser)
    }
};

export default usersReducer;
