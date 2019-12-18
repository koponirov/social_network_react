const SET_USER_DATA = 'SET_USER_DATA';
const SHOW_USER_PHOTO = 'SHOW_USER_PHOTO';


let initialState = {
    id:null,
    email:null,
    login:null,
    isAuth:false,
    photo: null

};

const authReducer = (state=initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case SHOW_USER_PHOTO:
            return {
                ...state,
                photo:action.smallUserPhoto,
                isAuth: true
            }


        default:
            return state;
    }
};

export const setUserData = (email,id,login) =>  ({type: SET_USER_DATA,data:{email,id,login}});
export const showUserPhoto = (smallUserPhoto) =>  ({type: SHOW_USER_PHOTO,smallUserPhoto});



export default authReducer;