import axios from "./axios.js"


export const registerRequest = user => axios.post('/users', user)
export const loginRequest = user => axios.post('/users/login', user)
export const updateUserRequest = user => axios.put('/users/:id', user)
