import { mockBun1, mockIngredient1 } from '../test-utils/mockData';
import {
  emptyBCState,
  FullBCState,
  initialBCState,
  WithTwoIngredientsBCState
} from '../test-utils/testStates';
import {
  TEST_IDS,
  testBun,
  testIngredient1,
  testIngredient2
} from '../test-utils/testData';

jest.mock('@reduxjs/toolkit', () => {
  const actual = jest.requireActual('@reduxjs/toolkit');
  return {
    ...actual,
    nanoid: jest
      .fn()
      .mockReturnValueOnce(TEST_IDS.BUN)
      .mockReturnValueOnce(TEST_IDS.INGREDIENT_1)
      .mockReturnValueOnce(TEST_IDS.INGREDIENT_2)
  };
});

import burgerConstructorSlice from '../slices/burgerConstructor/burgerConstructorSlice';

const {
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient,
  clearBurgerConstructor
} = burgerConstructorSlice.actions;

describe('burgerConstructorSlice', () => {
  describe('Обработка экшена добавления ингредиента', () => {
    test('должен добавить булку в конструктор', () => {
      const resultState = burgerConstructorSlice.reducer(
        emptyBCState,
        addIngredient(mockBun1)
      );

      expect(resultState.bun).toEqual(testBun);
      expect(resultState.ingredients).toHaveLength(0);
    });

    test('должен добавить начинку в конструктор', () => {
      const resultState = burgerConstructorSlice.reducer(
        emptyBCState,
        addIngredient(mockIngredient1)
      );

      expect(resultState.ingredients).toHaveLength(1);
      expect(resultState.ingredients[0]).toEqual(testIngredient1);
    });
  });

  describe('Обработка экшена удаления ингредиента', () => {
    test('должен удалить начинку из конструктора', () => {
      const ingredientToRemoveId = TEST_IDS.INGREDIENT_1;

      const resultState = burgerConstructorSlice.reducer(
        WithTwoIngredientsBCState,
        removeIngredient(ingredientToRemoveId)
      );

      expect(resultState.ingredients).toHaveLength(1);
      expect(resultState.ingredients[0].id).toBe(TEST_IDS.INGREDIENT_2);
      expect(resultState.ingredients[0]).toEqual(testIngredient2);
    });

    test('не должен изменять стейт при удалении несуществующего ингредиента', () => {
      const resultState = burgerConstructorSlice.reducer(
        emptyBCState,
        removeIngredient('unknown-id')
      );

      expect(resultState).toEqual(emptyBCState);
    });
  });

  describe('Обработка изменения порядка ингредиентов', () => {
    test('должен переместить ингредиент вверх', () => {
      const resultState = burgerConstructorSlice.reducer(
        WithTwoIngredientsBCState,
        upIngredient(1)
      );

      expect(resultState.ingredients).toEqual([
        testIngredient2,
        testIngredient1
      ]);
    });

    test('должен переместить ингредиент вниз', () => {
      const resultState = burgerConstructorSlice.reducer(
        WithTwoIngredientsBCState,
        downIngredient(0)
      );

      expect(resultState.ingredients).toEqual([
        testIngredient2,
        testIngredient1
      ]);
    });

    describe('Обработка очистки конструктора', () => {
      test('должен очистить весь конструктор', () => {
        const resultState = burgerConstructorSlice.reducer(
          FullBCState,
          clearBurgerConstructor()
        );

        expect(resultState).toEqual(initialBCState);
      });

      test('не должен изменять пустой конструктор', () => {
        const resultState = burgerConstructorSlice.reducer(
          emptyBCState,
          clearBurgerConstructor()
        );

        expect(resultState).toEqual(emptyBCState);
      });
    });
  });
});
