import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { examService } from '../../services/examService'

const initialState = {
  exams: [],
  loading: false,
  error: null,
  selectedExam: null,
}

export const fetchExams = createAsyncThunk(
  'exams/fetchExams',
  async (_, { rejectWithValue }) => {
    try {
      const response = await examService.getExams()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch exams')
    }
  }
)

export const createExam = createAsyncThunk(
  'exams/createExam',
  async (examData, { rejectWithValue }) => {
    try {
      const response = await examService.createExam(examData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create exam')
    }
  }
)

export const updateExam = createAsyncThunk(
  'exams/updateExam',
  async ({ id, examData }, { rejectWithValue }) => {
    try {
      const response = await examService.updateExam(id, examData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update exam')
    }
  }
)

export const deleteExam = createAsyncThunk(
  'exams/deleteExam',
  async (id, { rejectWithValue }) => {
    try {
      await examService.deleteExam(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete exam')
    }
  }
)

const examSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setSelectedExam: (state, action) => {
      state.selectedExam = action.payload
    },
    clearSelectedExam: (state) => {
      state.selectedExam = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch exams
      .addCase(fetchExams.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.loading = false
        state.exams = action.payload
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create exam
      .addCase(createExam.fulfilled, (state, action) => {
        state.exams.push(action.payload)
      })
      // Update exam
      .addCase(updateExam.fulfilled, (state, action) => {
        const index = state.exams.findIndex(exam => exam.id === action.payload.id)
        if (index !== -1) {
          state.exams[index] = action.payload
        }
      })
      // Delete exam
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.exams = state.exams.filter(exam => exam.id !== action.payload)
      })
  },
})

export const { clearError, setSelectedExam, clearSelectedExam } = examSlice.actions
export default examSlice.reducer
