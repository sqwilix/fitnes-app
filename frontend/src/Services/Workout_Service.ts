import axios from "axios"
import { API_BASE_URL } from "../Utils/config"

export interface ICreateWorkoutRequest {
    clientId: string;
    date: string;
    title: string;
    exercises: {
        name: string;
        sets: string;
        reps: string;
        weight: string;
        order: number;
    }[];
}

export const getWorkouts = async () => {
    const res = await axios.get(`${API_BASE_URL}/workout`)

    return res.data
}

export const createWorkout = async (workoutData: ICreateWorkoutRequest) => {
    const token = localStorage.getItem("accessToken")

    const res = await axios.post(`${API_BASE_URL}/workout`,
        workoutData,
        {headers: {"Authorization": `Bearer ${token}`}}
    )

    return res.data.data || res.data
}