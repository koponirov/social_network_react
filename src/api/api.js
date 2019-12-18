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

export const followToUser=(userId)=> {
    return axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`,
        {
            withCredentials: true,
            headers: {"API-KEY": "ed6168aa-083c-4712-91d3-afe70566eba2"}
        })
        .then(response => {
            return response.data
        })
}

export const unfollowToUser=(userId)=>{
    return axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {},
        {
            withCredentials: true,
            headers: {"API-KEY": "ed6168aa-083c-4712-91d3-afe70566eba2"}
        })
        .then(response => {
            return response.data
        })

}