import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type SortT = 'rating' | 'price' | 'title';

export type SortST = {
  id: number;
  sort: {
    name: string;
    property: SortT;
  };
};

const initialState: SortST = {
  id: 0,
  sort: {
    name: 'most popular',
    property: 'rating',
  },
};

export const sortSlice = createSlice({
  name: 'sortBy',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortST>) => {
      state.id = action.payload.id;
      state.sort = action.payload.sort;
    },
  },
});

export const { setSortType } = sortSlice.actions;

export default sortSlice.reducer;
