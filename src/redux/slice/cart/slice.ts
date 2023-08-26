import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { CartST, PizzaAT, RemoveProductAT } from './types'

const initialState: CartST = {
  totalPrice: 0,
  items: [],
}

export const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<PizzaAT>) => {
      const { id, dough, size } = action.payload
      const findIndex = state.items.findIndex(
        el => el.id === id && el.dough === dough && el.size === size,
      )
      if (findIndex !== -1) {
        state.items[findIndex].count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }
      state.totalPrice += action.payload.price
    },
    removeProduct: (state, action: PayloadAction<PizzaAT>) => {
      const { id, dough, size } = action.payload
      const findIndex = state.items.findIndex(
        el => el.id === id && el.dough === dough && el.size === size,
      )

      if (findIndex !== -1) {
        const removedItem = state.items[findIndex]
        state.items.splice(findIndex, 1)
        state.totalPrice -= removedItem.price * removedItem.count
      }
    },
    incrCountProduct: (state, action: PayloadAction<RemoveProductAT>) => {
      const { id, dough, size, change } = action.payload
      const findIndex = state.items.findIndex(
        el => el.id === id && el.dough === dough && el.size === size,
      )

      if (findIndex !== -1) {
        const itemToUpdate = state.items[findIndex]

        if (change === 'incr') {
          itemToUpdate.count++
          state.totalPrice += itemToUpdate.price
        } else {
          itemToUpdate.count--
          state.totalPrice -= itemToUpdate.price
        }
      }
    },
    clearCart: state => {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addProduct, removeProduct, incrCountProduct, clearCart } = slice.actions

export default slice.reducer
