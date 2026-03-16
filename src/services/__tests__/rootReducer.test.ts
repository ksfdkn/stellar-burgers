import rootReducer from '../rootReducer';
import { initialState as initialFeedState } from '../slices/feed/feedSlice';
import { initialState as initialIngrigientsState } from '../slices/ingredients/ingredientsSlice';
import { initialState as initialBurgerConstructorState } from '../slices/burgerConstructor/burgerConstructorSlice';
import { initialState as initialOrderState } from '../slices/order/orderSlice';
import { initialState as initialUserState } from '../slices/user/userSlice';

const unknownAction = { type: 'UNKNOWN_ACTION' };
const initAction = { type: 'INIT' };

describe('rootReducer', () => {
  describe('Общая работа rootReducer', () => {
    test('должен возвращать начальное состояние, если состояние undefined и экшен не обрабатывается', () => {
      const resultState = rootReducer(undefined, unknownAction);

      const expectedState = rootReducer(undefined, initAction);

      expect(resultState).toEqual(expectedState);
      expect(resultState).not.toBe(expectedState);
    });
  });

  describe('Инициализация слайсов', () => {
    const sliceConfig = [
      {
        name: 'feed' as const,
        initialState: initialFeedState
      },
      {
        name: 'ingredients' as const,
        initialState: initialIngrigientsState
      },
      {
        name: 'burgerConstructor' as const,
        initialState: initialBurgerConstructorState
      },
      {
        name: 'order' as const,
        initialState: initialOrderState
      },
      {
        name: 'user' as const,
        initialState: initialUserState
      }
    ];

    sliceConfig.forEach(({ name, initialState }) => {
      test(`должен инициализировать состояние ${name} при undefined`, () => {
        const resultState = rootReducer(undefined, unknownAction)[name];
        expect(resultState).toEqual(initialState);
      });
    });
  });
});
