import orderSlice, { clearOrder } from '../slices/order/orderSlice';
import { createOrder } from '../slices/order/thunks/createOrder';
import { errorStates, loadingStates, testOrder } from '../test-utils/testData';
import { testReducerCase } from '../test-utils/testHelpers';
import {
  initialOrderState,
  modifiedOrderState
} from '../test-utils/testStates';
import { IOrderState } from '../types';

const { reducer } = orderSlice;

describe('orderSlice', () => {
  describe('Обработка экшена clearOrder', () => {
    test('должен сбросить состояние до начального', () => {
      const resultState = reducer(modifiedOrderState, clearOrder());

      expect(resultState).toEqual(initialOrderState);
    });
  });

  describe('createOrder', () => {
    describe('pending', () => {
      test('устанавливает loading: "pending", очищает error и orderModalData', () => {
        testReducerCase<IOrderState, undefined>(
          reducer,
          initialOrderState,
          createOrder.pending.type,
          {
            loading: loadingStates.pending,
            error: null,
            orderModalData: null
          }
        );
      });
    });

    describe('fulfilled', () => {
      test('сохраняет orderModalData и устанавливает loading: "succeeded"', () => {
        const payload = { order: testOrder };

        testReducerCase<IOrderState, typeof payload>(
          reducer,
          initialOrderState,
          createOrder.fulfilled.type,
          {
            loading: loadingStates.succeeded,
            orderModalData: testOrder,
            error: null
          },
          payload
        );
      });
    });

    describe('rejected', () => {
      test('с ошибкой: устанавливает error и loading: "failed"', () => {
        testReducerCase<IOrderState, string>(
          reducer,
          initialOrderState,
          createOrder.rejected.type,
          {
            loading: loadingStates.failed,
            error: errorStates.network,
            orderModalData: null
          },
          errorStates.network
        );
      });

      test('без сообщения: использует сообщение по умолчанию', () => {
        testReducerCase<IOrderState, undefined>(
          reducer,
          initialOrderState,
          createOrder.rejected.type,
          {
            loading: loadingStates.failed,
            error: errorStates.defaultOrder,
            orderModalData: null
          }
        );
      });
    });
  });
});
