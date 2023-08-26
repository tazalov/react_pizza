export type PizzaT = {
  id: number
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}

//! ---------- thunk params type
export type ParamsAT = {
  order: string
  category: string
  sort: string
  searchValue: string
  currentPage: number
}

//! ---------- slice (state) type
export interface PizzasST {
  items: PizzaT[]
  status: 'loading' | 'success' | 'error'
  error: string
}
