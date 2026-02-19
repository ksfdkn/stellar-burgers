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
      .addCase(
        fetchFeed.pending,
        (state): IFeedState => ({
          ...state,
          loading: 'pending',
          error: null
        })
      )
      .addCase(
        fetchFeed.fulfilled,
        (
          state,
          action: PayloadAction<{
            orders: TOrder[];
            total: number;
            totalToday: number;
          }>
        ): IFeedState => ({
          ...state,
          loading: 'succeeded',
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          error: null
        })
      )
      .addCase(
        fetchFeed.rejected,
        (state, action): IFeedState => ({
          ...state,
          loading: 'failed',
          error: action.error?.message || 'Ошибка загрузки ленты заказов'
        })
      );
  }
});

export default feedSlice;
