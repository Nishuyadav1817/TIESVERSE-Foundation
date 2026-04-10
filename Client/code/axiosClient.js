import axios from "axios"

const axiosClient = axios.create({
    baseURL: 'https://tiesverse-foundation-phi.vercel.app', // Vercel backend
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});



export default axiosClient;

