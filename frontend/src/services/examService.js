import api from './api'

export const examService = {
  async getExams() {
    const response = await api.get('/exams')
    return response.data
  },

  async getExamById(id) {
    const response = await api.get(`/exams/${id}`)
    return response.data
  },

  async createExam(examData) {
    const response = await api.post('/exams', examData)
    return response.data
  },

  async updateExam(id, examData) {
    const response = await api.put(`/exams/${id}`, examData)
    return response.data
  },

  async deleteExam(id) {
    const response = await api.delete(`/exams/${id}`)
    return response.data
  },

  async getExamsByCourse(courseId) {
    const response = await api.get(`/exams/course/${courseId}`)
    return response.data
  },

  async getExamsByFaculty(facultyId) {
    const response = await api.get(`/exams/faculty/${facultyId}`)
    return response.data
  },
}
