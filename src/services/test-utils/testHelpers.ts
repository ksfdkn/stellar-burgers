import { PayloadAction, Reducer } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export const createTestConstructorIngredient = (
  ingredient: TIngredient,
  testId: string
): TConstructorIngredient => ({
  ...ingredient,
  id: testId
});

export const createTestAction = <TPayload = void>(
  type: string,
  payload?: TPayload
): PayloadAction<TPayload> =>
  ({
    type,
    payload
  }) as PayloadAction<TPayload>;

export const createTestIngredientsState = (overrides = {}) => ({
  ingredients: [],
  loading: 'idle',
  error: null,
  ...overrides
});

/**
 * Типобезопасная фабричная функция для тестирования редукторов
 * @param reducer — тестируемый редуктор
 * @param initialState - начальное состоение слайса
 * @param actionCreator — объект экшена (с полем type)
 * @param expectedState — ожидаемое состояние (частичное)
 * @param payload — опциональные данные для экшена
 */
export const testReducerCase = <TState, TPayload>(
  reducer: Reducer<TState>,
  initialState: TState,
  actionType: string,
  expectedState: Partial<TState>,
  payload?: TPayload
) => {
  const action = actionType.includes('/rejected')
    ? {
        type: actionType,
        error: {
          name: 'Error',
          message: payload !== undefined ? (payload as string) : undefined
        }
      }
    : createTestAction(actionType, payload);
  const resultState = reducer({ ...initialState }, action);
  expect(resultState).toEqual({ ...initialState, ...expectedState });
};
