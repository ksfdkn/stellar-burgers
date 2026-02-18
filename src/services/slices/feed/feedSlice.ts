import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFeedState } from '../../types';
import { fetchFeed } from './thunks/fetchFeed';
import { TOrder } from '@utils-types';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: 'idle',
  error: null
} satisfies IFeedState as IFeedState;

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(
        fetchFeed.fulfilled,
        (
          state,
          action: PayloadAction<{
            orders: TOrder[];
            total: number;
            totalToday: number;
          }>
        ) => {
          state.loading = 'succeeded';
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
          state.error = null;
        }
      )
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error?.message || 'Ошибка загрузки ленты заказов';
      });
  }
});

export default feedSlice;
