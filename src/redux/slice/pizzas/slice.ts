import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import pizzasAPI from '../../../api/api'
import { ParamsAT, PizzasST, PizzaT } from './types'

export const fetchPizzas = createAsyncThunk<PizzaT[], ParamsAT>(
  'pizzas/fetchPizzas',
  async params => {
    const { order, category, sort, searchValue, currentPage } = params
    try {
      const { data } = await pizzasAPI.get<PizzaT[]>(
        `items?page=${currentPage}&limit=4${order}${category}${sort}${searchValue}`,
      )
      return data
    } catch (error) {
      throw error
    }
  },
)

const initialState: PizzasST = {
  items: [],
  status: 'loading',
  error: '',
}

export const slice = createSlice({
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

export const { setItems } = slice.actions

export default slice.reducer
