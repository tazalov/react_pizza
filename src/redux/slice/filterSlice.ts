import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type SortPropertyT = 'rating' | 'price' | 'title';

export type SortT = {
  name: string;
  property: SortPropertyT;
};

export type FilterST = {
  categoryId: number;
  sort: SortT;
  descOrder: boolean;
};

const initialState: FilterST = {
  categoryId: 0,
  sort: {
    name: 'most popular',
    property: 'rating',
  },
  descOrder: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortT>) => {
      state.sort = action.payload;
    },
    toggleDescOrder: (state) => {
      state.descOrder = !state.descOrder;
    },
  },
});

export const { setCategoryId, setSortType, toggleDescOrder } = filterSlice.actions;

export default filterSlice.reducer;
