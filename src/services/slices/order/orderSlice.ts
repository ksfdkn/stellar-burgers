import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createOrder } from '../order/thunks/createOrder';
import { IOrderState } from 'src/services/types';
import { TOrder } from '@utils-types';

const initialState = {
  orderModalData: null,
  loading: 'idle',
  error: null
} satisfies IOrderState as IOrderState;

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state): IOrderState => ({
      ...state,
      orderModalData: null,
      loading: 'idle',
      error: null
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        createOrder.pending,
        (state): IOrderState => ({
          ...state,
          loading: 'pending',
          error: null,
          orderModalData: null
        })
      )
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<{ order: TOrder }>): IOrderState => ({
          ...state,
          loading: 'succeeded',
          orderModalData: action.payload.order,
          error: null
        })
      )
      .addCase(
        createOrder.rejected,
        (state, action): IOrderState => ({
          ...state,
          loading: 'failed',
          error: action.error?.message || 'Ошибка при создании заказа',
          orderModalData: null
        })
      );
  },
  selectors: {
    selectLoading: (state) => state.loading,
    selectOrderModalData: (state) => state.orderModalData,
    selectIsOrderLoading: (state) => state.loading === 'pending',
    selectIsOrderSuccess: (state) => state.loading === 'succeeded'
  }
});

export const { clearOrder } = orderSlice.actions;
export const {
  selectLoading,
  selectOrderModalData,
  selectIsOrderLoading,
  selectIsOrderSuccess
} = orderSlice.selectors;
export default orderSlice;
