import * as axios from "axios";


export const getUsers=(currentPage,pageUsersAmount)=>{
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageUsersAmount}`,
        {withCredentials:true})
        .then(response => {
            debugger;
            return response.data})
}

