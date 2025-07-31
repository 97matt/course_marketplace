import axios from "./axios.js";

export const newCourseRequest = course => axios.post('/courses', course);
export const coursesRequest = (params = {}) =>
	axios.get('/courses/filtered', { params });
export const coursesByProfessorRequest = (id) => axios.get(`/courses/professor/${id}`)
export const deleteCourseRequest = (id) =>
    axios.delete(`/courses/${id}`);