import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { resultService } from '../../services/resultService'

const initialState = {
  results: [],
  loading: false,
  error: null,
  selectedResult: null,
}

export const fetchResults = createAsyncThunk(
  'results/fetchResults',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const response = await resultService.getResults(auth.user?.role)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch results')
    }
  }
)

export const createResult = createAsyncThunk(
  'results/createResult',
  async (resultData, { rejectWithValue }) => {
    try {
      const response = await resultService.createResult(resultData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create result')
    }
  }
)

export const updateResult = createAsyncThunk(
  'results/updateResult',
  async ({ id, resultData }, { rejectWithValue }) => {
    try {
      const response = await resultService.updateResult(id, resultData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update result')
    }
  }
)

export const deleteResult = createAsyncThunk(
  'results/deleteResult',
  async (id, { rejectWithValue }) => {
    try {
      await resultService.deleteResult(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete result')
    }
  }
)

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setSelectedResult: (state, action) => {
      state.selectedResult = action.payload
    },
    clearSelectedResult: (state) => {
      state.selectedResult = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch results
      .addCase(fetchResults.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create result
      .addCase(createResult.fulfilled, (state, action) => {
        state.results.push(action.payload)
      })
      // Update result
      .addCase(updateResult.fulfilled, (state, action) => {
        const index = state.results.findIndex(result => result.id === action.payload.id)
        if (index !== -1) {
          state.results[index] = action.payload
        }
      })
      // Delete result
      .addCase(deleteResult.fulfilled, (state, action) => {
        state.results = state.results.filter(result => result.id !== action.payload)
      })
  },
})

export const { clearError, setSelectedResult, clearSelectedResult } = resultSlice.actions
export default resultSlice.reducer
