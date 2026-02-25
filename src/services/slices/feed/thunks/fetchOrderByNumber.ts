import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'feed/fetchOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response.orders[0];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки заказа');
    }
  }
);
