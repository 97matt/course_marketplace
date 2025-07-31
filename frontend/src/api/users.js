import axios from "./axios.js"


export const registerRequest = user => axios.post('/users', user)
export const loginRequest = user => axios.post('/users/login', user)
export const updateUserRequest = (id, userData) => axios.put(`/users/${id}`, userData)
