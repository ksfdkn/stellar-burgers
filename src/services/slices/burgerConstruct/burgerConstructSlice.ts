import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBurgerConstructorState } from '../../types';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],
  error: null,
};

const burgerConstructSlice = createSlice({
  name: 'constructBurger',
  initialState,
  reducers: {
    add: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        const isBun = payload.type === 'bun';
        
        if (isBun) {
          state.bun = {...payload };
        } else {
          state.ingredients = [...state.ingredients, payload];
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid(),
        }
      })
    },

    up: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const { ingredients } = state;

      if (index > 0 && index < ingredients.length) {
        state.
      }
    },
  },
});
