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

    me() {
        return instance.get('auth/me')
            .then(response => {
                return response.data
            })
    },

    login (email,password,rememberMe = false) {
        return instance.post('auth/login',{email,password,rememberMe})
    },

    logout () {
        return instance.delete('auth/login')
    }
}

export const profileAPI = {

    getUserProfile(id) {
        return instance.get(`profile/${id}`)
            .then(response => {
                return response.data
            })
    },

    getUserStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },

    updateUserStatus(status) {
        debugger;
        return instance.put(`profile/status`, {status: status})

    }
}

export const followAPI = {
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

