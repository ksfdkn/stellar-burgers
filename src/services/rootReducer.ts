import { combineReducers } from '@reduxjs/toolkit';
import feedSlice from './slices/feed/feedSlice';
import ingredientsSlice from './slices/ingredients/ingredientsSlice';
import burgerConstructorSlice from './slices/burgerConstructor/burgerConstructorSlice';

const rootReducer = combineReducers({
  feed: feedSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
