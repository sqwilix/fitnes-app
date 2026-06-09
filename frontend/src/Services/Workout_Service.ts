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

export const getWorkouts = async (clientId: string) => {
    const token = localStorage.getItem('accessToken'); 
    
    const url = clientId ? `${API_BASE_URL}/workout?clientId=${clientId}` : `${API_BASE_URL}/workout`;
    
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return res.data;
}
export const createWorkout = async (workoutData: ICreateWorkoutRequest) => {
    const token = localStorage.getItem("accessToken")

    const res = await axios.post(`${API_BASE_URL}/workout`,
        workoutData,
        {headers: {"Authorization": `Bearer ${token}`}}
    )

    return res.data.data || res.data
}