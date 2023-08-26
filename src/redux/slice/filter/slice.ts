import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { FilterST, SetFilterAT, SortT } from './types'

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

export const slice = createSlice({
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

export const {
  setSearchValue,
  setCategoryId,
  setSortType,
  toggleDescOrder,
  setCurrentPage,
  setFilterData,
} = slice.actions

export default slice.reducer
