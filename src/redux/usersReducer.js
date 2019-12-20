import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS = 'SET_TOTAL_USERS';
const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageUsersAmount: 5,
    totalUsersAmount: 20,
    currentPage: 1,
    followingInProgress: [2]
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

export const follow = (userId) => ({type: FOLLOW, userId});

export const unfollow = (userId) => ({type: UNFOLLOW, userId});

export const setUsers = (users) => ({type: SET_USERS, users});

export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});

export const setTotalUsersAmount = (totalUsers) => ({type: SET_TOTAL_USERS, totalUsers});

export const setIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading});

export const setInProgress = (inProgress, userId) => {

    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, inProgress, userId}
}

export const getUsersThunkCreator = (currentPage, pageUsersAmount) => {

    return (dispatch) => {

        dispatch(setIsLoading(true));

        usersAPI.getUsers(currentPage, pageUsersAmount).then(data => {
            dispatch(setIsLoading(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersAmount(data.totalCount))
        })
    }
}

export const onPageChangedThunkCreator = (currentPageNumber,pageUsersAmount) => {
    return (dispatch)=>{
        dispatch(setIsLoading(true));
        dispatch(setCurrentPage(currentPageNumber));
        usersAPI.getUsers(currentPageNumber,pageUsersAmount).then(data => {
            dispatch(setIsLoading(false));
            dispatch(setUsers(data.items));
        })
    }

}


export default usersReducer;