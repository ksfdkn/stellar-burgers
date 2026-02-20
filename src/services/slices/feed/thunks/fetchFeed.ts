import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '@api';

export const fetchFeed = createAsyncThunk<TFeedsResponse, void>(
  'feed/fetchAllFeed',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки ленты заказов');
    }
  }
);
