import type { RootState } from '../../../services/rootReducer';
import orderSlice from './orderSlice';
import type { TOrder } from '@utils-types';

export const selectOrderModalData = (state: RootState): TOrder | null =>
  state[orderSlice.name].orderModalData;

export const selectIsOrderLoading = (state: RootState): boolean =>
  state[orderSlice.name].loading === 'pending';
