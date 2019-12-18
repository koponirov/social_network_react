import * as axios from "axios";


export const getUsers=(currentPage,pageUsersAmount)=>{
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageUsersAmount}`,
        {withCredentials:true})
        .then(response => {
            debugger;
            return response.data})
};

export const getUserData=()=>{
    return axios.get('https://social-network.samuraijs.com/api/1.0/auth/me',
        {withCredentials:true})
        .then(response=>{
            return response.data
        })
}

export const getUserPhoto=(id)=>{
    return axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
        .then(response=>{
            return response.data
        })
}

