import axios from "axios";

const api = axios.create({
    baseURL: 'https://frontend-freelance-one.vercel.app',
    withCredentials : true
})

export default api