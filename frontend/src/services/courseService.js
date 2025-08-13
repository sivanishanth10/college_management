import api from './api'

export const courseService = {
  async getCourses() {
    const response = await api.get('/courses')
    return response.data
  },

  async getCourseById(id) {
    const response = await api.get(`/courses/${id}`)
    return response.data
  },

  async createCourse(courseData) {
    const response = await api.post('/courses', courseData)
    return response.data
  },

  async updateCourse(id, courseData) {
    const response = await api.put(`/courses/${id}`, courseData)
    return response.data
  },

  async deleteCourse(id) {
    const response = await api.delete(`/courses/${id}`)
    return response.data
  },

  async getCoursesByFaculty(facultyId) {
    const response = await api.get(`/courses/faculty/${facultyId}`)
    return response.data
  },
}
