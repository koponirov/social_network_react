import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "ed6168aa-083c-4712-91d3-afe70566eba2"},

})

export const usersAPI = {
    getUsers(currentPage, pageUsersAmount) {
        return instance.get(`users?page=${currentPage}&count=${pageUsersAmount}`)
            .then(response => {

                return response.data
            })
    }
}

export const authAPI = {

    getUserData () {
        return instance.get('auth/me')
            .then(response => {
                return response.data
            })
    }
}


export const profileAPI = {

    getUserPhoto (id) {
        return instance.get(`profile/${id}`)
            .then(response => {
                return response.data
            })
    },
    getUserProfile (id) {
        return instance.get(`profile/${id}`)
            .then(response => {
                return response.data
            })
    }
}

export const followAPI= {
    followToUser(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    unfollowToUser(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    }
}

