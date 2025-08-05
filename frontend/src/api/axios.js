import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

//Si existe token, attach como default header
const token = localStorage.getItem('token')
if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default instance;