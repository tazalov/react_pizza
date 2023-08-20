import { configureStore } from '@reduxjs/toolkit'
import cart from './slice/cartSlice'
import filter from './slice/filterSlice'

export const store = configureStore({
  reducer: {
    filter,
    cart,
  },
})

//@ts-ignore
window.store = store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
