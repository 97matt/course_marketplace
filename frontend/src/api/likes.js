import axios from './axios'

export const likeCourseRequest = (user_id, course_id) => {
    return axios.post('/likes', { user_id, course_id })
}

export const unlikeCourseRequest = (user_id, course_id) => {
    return axios.delete('/likes', { data: { user_id, course_id } })
}

export const getUserLikesRequest = (user_id) => {
    return axios.get(`/likes/${user_id}`)
}

export const getTopLikedCoursesRequest = () => {
    return axios.get('/likes/top')
}