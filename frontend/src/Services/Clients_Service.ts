import axios from "axios";
import { API_BASE_URL } from "../Utils/config";

const getHeaders = () => ({
    headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` }
});

export const getMyClients = async () => {
    const res = await axios.get(`${API_BASE_URL}/client/my`, getHeaders());
    return res.data.data; 
};

export const getFreeClients = async () => {
    const res = await axios.get(`${API_BASE_URL}/client/free`, getHeaders());
    return res.data.data; 
};

export const assignClientToTrainer = async (clientId: string) => {
    const res = await axios.post(`${API_BASE_URL}/client/assign`, 
        {clientId},
        getHeaders()
    )

    return res.data.data
}