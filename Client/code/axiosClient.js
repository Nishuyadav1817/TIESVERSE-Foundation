import axios from "axios"

const axiosClient = axios.create({
    baseURL: 'http://localhost:1616', // Vercel backend
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});



export default axiosClient;

