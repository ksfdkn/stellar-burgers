import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, TNewOrderResponse } from '@api';

export const createOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/createOrder',
  async (ingredientsIds: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientsIds);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка создания заказа');
    }
  }
);
