import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchAllIngredients',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);
