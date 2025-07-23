import axios from "./axios.js";

export const newCourseRequest = course => axios.post('/courses', course);
export const coursesRequest = () => axios.get('/courses')
export const coursesByProfessorRequest = (id) => axios.get(`/courses/professor/${id}`)