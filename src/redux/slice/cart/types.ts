export type PizzaCartT = {
  id: number
  title: string
  imageUrl: string
  price: number
  size: number
  dough: string
  count: number
}

//! ---------- actions types
export type PizzaAT = Omit<PizzaCartT, 'count'>

type ChangeT = {
  change: 'incr' | 'decr'
}

export type RemoveProductAT = PizzaAT & ChangeT

//! ---------- slice (state) type
export interface CartST {
  totalPrice: number
  items: PizzaCartT[]
}
