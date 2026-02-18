import { combineReducers } from '@reduxjs/toolkit';
import feedSlice from './slices/feed/feedSlice';
import ingredientsSlice from './slices/ingredients/ingredientsSlice';

const rootReducer = combineReducers({
  feed: feedSlice.reducer,
  ingredients: ingredientsSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
