import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBurgerConstructorState } from '../../types';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';
import { BurgerConstructor } from '@components';

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],
  error: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        const isBun = payload.type === 'bun';

        if (isBun) {
          state.bun = { ...payload };
        } else {
          state.ingredients = [...state.ingredients, payload];
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },

    upIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const { ingredients } = state;

      if (index > 0 && index < ingredients.length) {
        state.ingredients = [
          ...ingredients.slice(0, index - 1),
          ingredients[index],
          ingredients[index - 1],
          ...ingredients.slice(index + 1)
        ];
      }
    },

    downIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const { ingredients } = state;

      if (index >= 0 && index < ingredients.length - 1) {
        state.ingredients = [
          ...ingredients.slice(0, index),
          ingredients[index + 1],
          ingredients[index],
          ...ingredients.slice(index + 2)
        ];
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },

    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.error = null;
    }
  },
  selectors: {
    selectBurgerConstructor: (state) => state
  }
});

export default burgerConstructorSlice;
export const { selectBurgerConstructor } = burgerConstructorSlice.selectors;
export const {
  clearBurgerConstructor,
  upIngredient,
  downIngredient,
  removeIngredient,
  addIngredient
} = burgerConstructorSlice.actions;
