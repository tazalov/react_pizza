import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import pizzasAPI from '../../api/api'
import { RootState } from '../store'

type ParamsAT = {
  order: string
  category: string
  sort: string
  searchValue: string
  currentPage: number
}

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params: ParamsAT) => {
  const { order, category, sort, searchValue, currentPage } = params
  try {
    const { data } = await pizzasAPI.get<PizzaT[]>(
      `items?page=${currentPage}&limit=4&${order}&${category}&sortBy=${sort}${searchValue}`,
    )
    return data
  } catch (error) {
    throw error
  }
})

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

export type PizzasST = {
  items: PizzaT[]
  status: 'loading' | 'success' | 'error'
  error: string
}

const initialState: PizzasST = {
  items: [],
  status: 'loading',
  error: '',
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaT[]>) => {
      state.items = action.payload
      state.items = []
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success'
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error'
      state.items = []
      state.error = action.error.message!
    })
  },
})

//! ---------- selectors ----------
export const selectPizzas = (state: RootState) => state.pizzas
//! ---------- selectors ----------

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
