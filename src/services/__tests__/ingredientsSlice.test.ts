import ingredientsSlice from '../slices/ingredients/ingredientsSlice';
import { fetchIngredients } from '../slices/ingredients/thunks/fetchIngredients';
import {
  errorStates,
  loadingStates,
  testIngredients
} from '../test-utils/testData';
import { testReducerCase } from '../test-utils/testHelpers';
import { initialIngredientsState } from '../test-utils/testStates';
import { IIngredientsState } from '../types';

const { reducer } = ingredientsSlice;

describe('ingredientsSlice', () => {
  describe('fetchIngredients', () => {
    test('pending: устанавливает loading: "pending" и очищает ошибку', () => {
      testReducerCase(
        reducer,
        initialIngredientsState,
        fetchIngredients.pending.type,
        { loading: loadingStates.pending, error: null }
      );
    });

    test('fulfilled: сохраняет ингредиенты и устанавливает loading: "succeeded"', () => {
      testReducerCase<IIngredientsState, typeof testIngredients>(
        reducer,
        initialIngredientsState,
        fetchIngredients.fulfilled.type,
        {
          loading: loadingStates.succeeded,
          ingredients: testIngredients,
          error: null
        },
        testIngredients
      );
    });

    describe('rejected', () => {
      test('с ошибкой: устанавливает error и loading: "failed"', () => {
        testReducerCase<IIngredientsState, string>(
          reducer,
          initialIngredientsState,
          fetchIngredients.rejected.type,
          {
            loading: loadingStates.failed,
            error: errorStates.network
          },
          errorStates.network
        );
      });

      test('без сообщения: использует сообщение по умолчанию', () => {
        testReducerCase<IIngredientsState, undefined>(
          reducer,
          initialIngredientsState,
          fetchIngredients.rejected.type,
          {
            loading: loadingStates.failed,
            error: errorStates.defaultIngredients
          }
        );
      });
    });
  });
});
