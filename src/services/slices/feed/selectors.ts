import type { RootState } from '../../../services/rootReducer';
import feedSlice from './feedSlice';
import { TOrder } from '@utils-types';

export const selectOrders = (state: RootState): TOrder[] =>
  state[feedSlice.name].orders;

export const selectCurrentOrder = (state: RootState): TOrder | null =>
  state[feedSlice.name].currentOrder;

export const selectTotal = (state: RootState): number =>
  state[feedSlice.name].total;

export const selectTotalToday = (state: RootState): number =>
  state[feedSlice.name].totalToday;

export const selectFeedLoading = (state: RootState): boolean =>
  state[feedSlice.name].loading === 'pending';
