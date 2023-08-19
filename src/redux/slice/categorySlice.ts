import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type CategoryST = {
  categoryId: number;
};

const initialState: CategoryST = {
  categoryId: 0,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
  },
});

export const { setCategoryId } = categorySlice.actions;

export default categorySlice.reducer;
