import axios from "axios";
import { API_BASE_URL } from "../Utils/config";


const getHeaders = () => ({
    headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` }
});

export const createSubscription = async (clientId: string, title: string, totalLessons: number, durationDays: number) => {
    const res = await axios.post(`${API_BASE_URL}/subscription`, 
        {clientId, title, totalLessons, durationDays},
        getHeaders()
    )

    return res.data
}

export const updateSubscription = async (subscriptionId: string, title: string, totalLessons: number, durationDays: number, remainingLesson: number, status: string) => {
    const res = await axios.put(`${API_BASE_URL}/subscription`,
        {subscriptionId, title, totalLessons, durationDays, remainingLesson, status},
        getHeaders()
    )

    return res.data
}

export const deleteSubscription = async (subscriptionId: string) => {
    const res = await axios.delete(`${API_BASE_URL}/subscription`, {
        data: {subscriptionId},
        ...getHeaders()
    })

    return res.data
}