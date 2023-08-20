import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type PizzaT = {
  id: number
  imageUrl: string
  title: string
  price: number
  size: number
  dough: string
  count: number
}

type PizzaAT = Omit<PizzaT, 'count'>

export type CartST = {
  totalPrice: 0
  items: PizzaT[]
}

const initialState: CartST = {
  totalPrice: 0,
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<PizzaAT>) => {
      const findItem = state.items.find(
        el =>
          el.title === action.payload.title &&
          el.dough === action.payload.dough &&
          el.size === action.payload.size,
      )
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }
      state.totalPrice += action.payload.price
    },
    removeProduct: (state, action: PayloadAction<{ id: number; price: number }>) => {
      state.items.filter(el => el.id !== action.payload.id)
      state.totalPrice -= action.payload.price
    },
    clearCart: state => {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addProduct, removeProduct, clearCart } = cartSlice.actions

export default cartSlice.reducer
