import api from './api'

export const resultService = {
  async getResults(role) {
    const response = await api.get('/results', { params: { role } })
    return response.data
  },

  async getResultById(id) {
    const response = await api.get(`/results/${id}`)
    return response.data
  },

  async createResult(resultData) {
    const response = await api.post('/results', resultData)
    return response.data
  },

  async updateResult(id, resultData) {
    const response = await api.put(`/results/${id}`, resultData)
    return response.data
  },

  async deleteResult(id) {
    const response = await api.delete(`/results/${id}`)
    return response.data
  },

  async getResultsByStudent(studentId) {
    const response = await api.get(`/results/student/${studentId}`)
    return response.data
  },

  async getResultsByExam(examId) {
    const response = await api.get(`/results/exam/${examId}`)
    return response.data
  },

  async getResultsByCourse(courseId) {
    const response = await api.get(`/results/course/${courseId}`)
    return response.data
  },
}
