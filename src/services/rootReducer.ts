import { combineReducers } from '@reduxjs/toolkit';
import feedSlice from '../services/slices/feed/feedSlice';
import ingredientsSlice from '../services/slices/ingredients/ingredientsSlice';
import burgerConstructorSlice from '../services/slices/burgerConstructor/burgerConstructorSlice';
import orderSlice from '../services/slices/order/orderSlice';

const rootReducer = combineReducers({
  feed: feedSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  order: orderSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
