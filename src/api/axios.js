import axios from "axios";

const api = axios.create({
    baseURL: 'https://backend-freelance-px5x.onrender.com',
    withCredentials : true
})

export default api