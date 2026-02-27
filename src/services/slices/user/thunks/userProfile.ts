import { getOrdersApi, getUserApi, TRegisterData, updateUserApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';

export const fetchUser = createAsyncThunk<TUser, void>(
  'user/profile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();

      return response.user;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Ошибка получения данных пользователя';
      return rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/profile/update',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);

      return response.user;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Ошибка обновления данных';
      return rejectWithValue(message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk<TOrder[], void>(
  'user/profile/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();

      return response;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Ошибка загрузки заказов';
      return rejectWithValue(message);
    }
  }
);
