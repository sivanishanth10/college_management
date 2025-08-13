import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import courseSlice from './slices/courseSlice'
import studentSlice from './slices/studentSlice'
import examSlice from './slices/examSlice'
import resultSlice from './slices/resultSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    courses: courseSlice,
    students: studentSlice,
    exams: examSlice,
    results: resultSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})
