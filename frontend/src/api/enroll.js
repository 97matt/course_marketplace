import axios from "./axios.js";

export const newEnrollRequest = data => axios.post('/enroll', data);
export const getStudentCoursesRequest = (id) => axios.get(`/enroll/my-courses/${id}`)
export const unenrollFromCourseRequest = (user_course_id) => axios.delete(`/enroll/${user_course_id}`)