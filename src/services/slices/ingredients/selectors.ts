import type { RootState } from '../../../services/rootReducer';
import ingredientsSlice from './ingredientsSlice';
import type { TIngredient } from '@utils-types';

export const selectIngredients = (state: RootState): TIngredient[] =>
  state[ingredientsSlice.name].ingredients;

export const selectIngredientsLoading = (state: RootState): boolean =>
  state[ingredientsSlice.name].loading === 'pending';
