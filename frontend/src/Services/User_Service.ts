import axios from "axios"
import { API_BASE_URL } from "../Utils/config"

interface UpdateProfileProps {
    firstName: string,
    lastName: string,
    weight?: number | string,
    height?: number | string,
    goal?: string,
    specialization?: string
    experience?: string | number,
    aboutMe?: string
}

export const getProfile = async () => {
    const token = localStorage.getItem("accessToken")
    const res = await axios.get(`${API_BASE_URL}/user/profile`, {
        headers: {"Authorization": `Bearer ${token}`}
    })
    
    return res.data
}

export const updateClientProfile = async ({firstName, lastName, weight, height, goal}: UpdateProfileProps) => {
    const token = localStorage.getItem("accessToken")

    const res = await axios.put(`${API_BASE_URL}/user/profile`,
        {firstName, lastName, weight, height, goal},
        {headers: {"Authorization": `Bearer ${token}`}}
    )

    return res.data
}

export const updateTrainerProfile = async ({firstName, lastName, specialization, experience, aboutMe}: UpdateProfileProps) => {
    const token = localStorage.getItem("accessToken")

    const res = await axios.put(`${API_BASE_URL}/user/profile`,
        {firstName, lastName, specialization, experience, aboutMe},
        {headers: {"Authorization": `Bearer ${token}`}}
    )

    return res.data
}

export const getUserById = async (clientId: string) => {
    const token = localStorage.getItem("accessToken");
    
    const res = await axios.get(`${API_BASE_URL}/client/my/${clientId}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    return res.data.data
}