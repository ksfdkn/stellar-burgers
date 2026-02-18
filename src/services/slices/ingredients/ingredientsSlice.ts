import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredientsState } from 'src/services/types';
import { fetchIngredients } from './thunks/fetchIngredients';
import { TIngredient } from '@utils-types';

const initialState = {
  ingredients: [],
  loading: 'idle',
  error: null
} satisfies IIngredientsState as IIngredientsState;

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = 'succeeded';
          state.ingredients = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = 'failed';
        state.error =
          (action.payload as string) || 'Ошибка загрузки ингредиентов';
      });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsLoading: (state) => state.loading === 'pending'
  }
});

export default ingredientsSlice;
export const { selectIngredients, selectIngredientsLoading } =
  ingredientsSlice.selectors;
