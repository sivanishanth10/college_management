import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { studentService } from '../../services/studentService'

const initialState = {
  students: [],
  loading: false,
  error: null,
  selectedStudent: null,
}

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getStudents()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch students')
    }
  }
)

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await studentService.createStudent(studentData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create student')
    }
  }
)

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      const response = await studentService.updateStudent(id, studentData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update student')
    }
  }
)

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id, { rejectWithValue }) => {
    try {
      await studentService.deleteStudent(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete student')
    }
  }
)

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload
    },
    clearSelectedStudent: (state) => {
      state.selectedStudent = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false
        state.students = action.payload
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create student
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload)
      })
      // Update student
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(student => student.id === action.payload.id)
        if (index !== -1) {
          state.students[index] = action.payload
        }
      })
      // Delete student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(student => student.id !== action.payload)
      })
  },
})

export const { clearError, setSelectedStudent, clearSelectedStudent } = studentSlice.actions
export default studentSlice.reducer
