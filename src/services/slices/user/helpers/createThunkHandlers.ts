import { PayloadAction } from '@reduxjs/toolkit';
import type { IUserState } from '../../../types';

type LoadingStatus = 'idle' | 'pending' | 'succeeded' | 'failed';

export const createThunkHandlers = <T>(
  builder: any,
  thunk: any,
  onFulfilled?: (state: IUserState, action: PayloadAction<T>) => IUserState
) => {
  const setLoading = (
    state: IUserState,
    status: LoadingStatus,
    error: string | null = null
  ): IUserState => ({
    ...state,
    loading: status,
    error
  });

  builder
    .addCase(
      thunk.pending,
      (state: IUserState): IUserState => setLoading(state, 'pending')
    )
    .addCase(
      thunk.fulfilled,
      (state: IUserState, action: PayloadAction<T>): IUserState => {
        const baseState = setLoading(state, 'succeeded');

        if (onFulfilled) {
          return onFulfilled(baseState, action);
        }

        return baseState;
      }
    )
    .addCase(
      thunk.rejected,
      (state: IUserState, action: any): IUserState =>
        setLoading(state, 'failed', action.payload as string)
    );
};
