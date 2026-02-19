import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, TNewOrderResponse } from '@api';

export const createOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/createOrder',
  async (ingredientsIds: string[]) => {
    const response = await orderBurgerApi(ingredientsIds);
    return response;
  }
);
