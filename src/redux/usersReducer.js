const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS = 'SET_TOTAL_USERS';

let initialState = {
    users: [ ],
    pageUsersAmount:5,
    totalUsersAmount:20,
    currentPage:4

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



        default:
            return state;
    }
};

export const followAC = (userId) => ({type: FOLLOW, userId});

export const unFollowAC = (userId) => ({type: UNFOLLOW, userId});

export const setUsersAC = (users) => ({type: SET_USERS, users});

export const setCurrentPageAC = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});

export const setTotalUsersAmountAC = (totalUsers) => ({type: SET_TOTAL_USERS, totalUsers});

export default usersReducer;