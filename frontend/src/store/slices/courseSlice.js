import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { courseService } from '../../services/courseService'

const initialState = {
  courses: [],
  loading: false,
  error: null,
  selectedCourse: null,
}

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseService.getCourses()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses')
    }
  }
)

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await courseService.createCourse(courseData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create course')
    }
  }
)

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const response = await courseService.updateCourse(id, courseData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update course')
    }
  }
)

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id, { rejectWithValue }) => {
    try {
      await courseService.deleteCourse(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete course')
    }
  }
)

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false
        state.courses = action.payload
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create course
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload)
      })
      // Update course
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(course => course.id === action.payload.id)
        if (index !== -1) {
          state.courses[index] = action.payload
        }
      })
      // Delete course
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(course => course.id !== action.payload)
      })
  },
})

export const { clearError, setSelectedCourse, clearSelectedCourse } = courseSlice.actions
export default courseSlice.reducer
