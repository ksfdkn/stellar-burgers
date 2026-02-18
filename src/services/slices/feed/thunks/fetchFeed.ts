import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '@api';

export const fetchFeed = createAsyncThunk<TFeedsResponse>(
  'feed/fetchAllFeed',
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);
