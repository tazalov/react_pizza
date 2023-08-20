import { configureStore } from '@reduxjs/toolkit'
import filter from './slice/filterSlice'

export const store = configureStore({
  reducer: {
    filter,
  },
})

//@ts-ignore
window.store = store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
