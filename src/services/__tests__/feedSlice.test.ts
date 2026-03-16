import { TOrder } from '@utils-types';
import feedSlice from '../slices/feed/feedSlice';
import { fetchFeed } from '../slices/feed/thunks/fetchFeed';
import {
  errorStates,
  loadingStates,
  testFeedData,
  testOrder
} from '../test-utils/testData';
import { testReducerCase } from '../test-utils/testHelpers';
import { initialFeedState } from '../test-utils/testStates';
import { IFeedState } from '../types';
import { fetchOrderByNumber } from '../slices/feed/thunks/fetchOrderByNumber';

const { reducer } = feedSlice;

describe('feedSlice', () => {
  describe('fetchFeed', () => {
    test('pending: устанавливает loading: "pending" и очищает ошибку', () => {
      testReducerCase(reducer, initialFeedState, fetchFeed.pending.type, {
        loading: loadingStates.pending,
        error: null
      });
    });

    test('fulfilled: сохраняет заказы и статистику', () => {
      testReducerCase<
        IFeedState,
        { orders: TOrder[]; total: number; totalToday: number }
      >(
        reducer,
        initialFeedState,
        fetchFeed.fulfilled.type,
        {
          loading: loadingStates.succeeded,
          orders: testFeedData.orders,
          total: testFeedData.total,
          totalToday: testFeedData.totalToday,
          error: null
        },
        testFeedData
      );
    });

    describe('rejected', () => {
      test('с ошибкой: устанавливает error и loading: "failed"', () => {
        testReducerCase<IFeedState, string>(
          reducer,
          initialFeedState,
          fetchFeed.rejected.type,
          {
            loading: loadingStates.failed,
            error: errorStates.network
          },
          errorStates.network
        );
      });

      test('без сообщения: использует сообщение по умолчанию', () => {
        testReducerCase<IFeedState, undefined>(
          reducer,
          initialFeedState,
          fetchFeed.rejected.type,
          {
            loading: loadingStates.failed,
            error: errorStates.defaultFeed
          }
        );
      });
    });
  });

  describe('fetchOrderByNumber', () => {
    describe('pending', () => {
      test('устанавливает orderLoading: "pending" и очищает ошибку', () => {
        testReducerCase<IFeedState, undefined>(
          reducer,
          initialFeedState,
          fetchOrderByNumber.pending.type,
          {
            orderLoading: loadingStates.pending,
            error: null
          }
        );
      });
    });

    describe('fulfilled', () => {
      test('сохраняет currentOrder и устанавливает orderLoading: "succeeded"', () => {
        testReducerCase<IFeedState, TOrder>(
          reducer,
          initialFeedState,
          fetchOrderByNumber.fulfilled.type,
          {
            orderLoading: loadingStates.succeeded,
            currentOrder: testOrder,
            error: null
          },
          testOrder
        );
      });
    });

    describe('rejected', () => {
      test('с ошибкой: устанавливает error и orderLoading: "failed"', () => {
        testReducerCase<IFeedState, string>(
          reducer,
          initialFeedState,
          fetchOrderByNumber.rejected.type,
          {
            orderLoading: loadingStates.failed,
            error: errorStates.network
          },
          errorStates.network
        );
      });

      test('без сообщения: использует сообщение по умолчанию', () => {
        testReducerCase<IFeedState, undefined>(
          reducer,
          initialFeedState,
          fetchOrderByNumber.rejected.type,
          {
            orderLoading: loadingStates.failed,
            error: errorStates.defaultCurrentOrder
          }
        );
      });
    });
  });
});
