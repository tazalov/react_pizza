import { RootState } from '../../store'

export const selectCart = (state: RootState) => state.cart

export const selectCountItemsInCart = (id: number) => (state: RootState) => {
  let count = 0
  state.cart.items.forEach(el => {
    if (el.id === id) count += el.count
  })
  return count
}
