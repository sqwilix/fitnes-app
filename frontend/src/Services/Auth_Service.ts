import { API_BASE_URL } from "../Utils/config"
import axios from 'axios';


export const register = async (firstName: string, lastName: string, email: string, password: string, role: string) => {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
        role
    })

    if(res.data.token) {
        localStorage.setItem('accessToken', res.data.token)
    }

    if(res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user))
    }

    return res.data
}

export const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
    })

    if(res.data.token) {
        localStorage.setItem('accessToken', res.data.token)
    }

    if(res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user))
    }

    return res.data
}