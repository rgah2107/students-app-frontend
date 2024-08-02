import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../appSlice'
import { studentsApi } from '../services/api'

export const store = configureStore({
  reducer: {
    app: appReducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentsApi.middleware),
})
