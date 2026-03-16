import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBurgerConstructorState } from '../../types';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

export const initialState = {
  bun: null,
  ingredients: [],
  error: null
} satisfies IBurgerConstructorState as IBurgerConstructorState;

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (
        state,
        { payload }: PayloadAction<TConstructorIngredient>
      ): IBurgerConstructorState => {
        const isBun = payload.type === 'bun';

        if (isBun) {
          return {
            ...state,
            bun: { ...payload }
          };
        } else {
          return {
            ...state,
            ingredients: [...state.ingredients, payload]
          };
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },

    upIngredient: (
      state,
      action: PayloadAction<number>
    ): IBurgerConstructorState => {
      const index = action.payload;
      const { ingredients } = state;

      if (index > 0 && index < ingredients.length) {
        const newIngredients = [...ingredients];
        [newIngredients[index - 1], newIngredients[index]] = [
          newIngredients[index],
          newIngredients[index - 1]
        ];

        return {
          ...state,
          ingredients: newIngredients
        };
      }

      return state;
    },

    downIngredient: (
      state,
      action: PayloadAction<number>
    ): IBurgerConstructorState => {
      const index = action.payload;
      const { ingredients } = state;

      if (index >= 0 && index < ingredients.length - 1) {
        const newIngredients = [...ingredients];
        [newIngredients[index], newIngredients[index + 1]] = [
          newIngredients[index + 1],
          newIngredients[index]
        ];

        return {
          ...state,
          ingredients: newIngredients
        };
      }

      return state;
    },

    removeIngredient: (
      state,
      action: PayloadAction<string>
    ): IBurgerConstructorState => ({
      ...state,
      ingredients: state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      )
    }),

    clearBurgerConstructor: (state): IBurgerConstructorState => ({
      ...state,
      bun: null,
      ingredients: [],
      error: null
    })
  },
  selectors: {
    selectBurgerConstructor: (state) => state
  }
});

export default burgerConstructorSlice;
export const {
  clearBurgerConstructor,
  upIngredient,
  downIngredient,
  removeIngredient,
  addIngredient
} = burgerConstructorSlice.actions;
