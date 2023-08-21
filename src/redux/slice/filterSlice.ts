import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type SortPropertyT = 'rating' | 'price' | 'title'

export type SortT = {
  name: string
  property: SortPropertyT
}

export type FilterST = {
  searchValue: string
  categoryId: number
  sort: SortT
  descOrder: boolean
  currentPage: number
}

export type SetFilterAT = {
  page: string
  category: string
  sort: SortT
}

const initialState: FilterST = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'most popular',
    property: 'rating',
  },
  descOrder: false,
  currentPage: 1,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    setSortType: (state, action: PayloadAction<SortT>) => {
      state.sort = action.payload
    },
    toggleDescOrder: state => {
      state.descOrder = !state.descOrder
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setFilterData: (state, action: PayloadAction<SetFilterAT>) => {
      state.currentPage = +action.payload.page
      state.sort = action.payload.sort
      state.categoryId = +action.payload.category
    },
  },
})

//! ---------- selectors ----------
export const selectFilter = (state: RootState) => state.filter

export const selectSearchValue = (state: RootState) => state.filter.searchValue
//! ---------- selectors ----------

export const {
  setSearchValue,
  setCategoryId,
  setSortType,
  toggleDescOrder,
  setCurrentPage,
  setFilterData,
} = filterSlice.actions

export default filterSlice.reducer
