import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cart from './slice/cart/slice'
import filter from './slice/filter/slice'
import pizzas from './slice/pizzas/slice'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas,
  },
})

//@ts-ignore
window.store = store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
