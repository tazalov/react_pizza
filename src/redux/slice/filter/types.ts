export type SortPropertyT = 'rating' | 'price' | 'title'

export type SortT = {
  name: string
  property: SortPropertyT
}

//! ---------- actions types
export interface SetFilterAT {
  page: string
  category: string
  sort: SortT
}

//! ---------- slice (state) type
export type FilterST = {
  searchValue: string
  categoryId: number
  sort: SortT
  descOrder: boolean
  currentPage: number
}
