import axios from "axios"
import { API_BASE_URL } from "../Utils/config"


export const getWorkouts = async () => {
    const res = await axios(`${API_BASE_URL}/workout`)

    return res.data
}