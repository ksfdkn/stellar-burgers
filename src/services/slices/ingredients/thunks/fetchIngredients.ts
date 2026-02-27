import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk<TIngredient[], void>(
  'ingredients/fetchAllIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Ошибка загрузки ингредиентов';
      return rejectWithValue(message);
    }
  }
);
