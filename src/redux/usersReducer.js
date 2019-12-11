const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [/*
        {id: 1, userName: 'Sasha', followed:true},
        {id: 2, userName: 'Olga',followed:true},
        {id: 3, userName: 'Nelli',followed:true},
        {id: 4, userName: 'Igor',followed:false},
        {id: 5, userName: 'Sergey',followed:false},
    */],

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
        case SET_USERS: {
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        }
        default:
            return state;
    }
};

export const followActionCreator = (userId) => ({type: FOLLOW, userId});

export const unFollowActionCreator = (userId) => ({type: UNFOLLOW, userId});

export const setUsersActionCreator = (users) => ({type: SET_USERS, users});

export default usersReducer;