import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slice/categorySlice';
import sortReducer from './slice/sortSlice';

const rootReducer = combineReducers({
  category: categoryReducer,
  sort: sortReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

//@ts-ignore
window.store = store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
