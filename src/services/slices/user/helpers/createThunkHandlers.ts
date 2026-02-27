import {
  ActionReducerMapBuilder,
  AsyncThunk,
  PayloadAction
} from '@reduxjs/toolkit';
import type { IUserState } from '../../../types';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

// ежики кусали лис, а я в шоке, что зачем-то захотела поиграться
// с паттернами. было лень писать от руки, а теперь сполна нахлебалась типизацией
// и ведь работает... только не с logout
type LoadingStatus = 'idle' | 'pending' | 'succeeded' | 'failed';

type RejectedAction = {
  payload?: unknown;
};

export const createThunkHandlers = <T, ThunkArg extends unknown>(
  builder: ActionReducerMapBuilder<IUserState>,
  thunk: AsyncThunk<T, ThunkArg, AsyncThunkConfig>,
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
      (state: IUserState, action: RejectedAction): IUserState => {
        const payload = action.payload;
        return setLoading(
          state,
          'failed',
          typeof payload === 'string' ? payload : 'Неизвестная ошибка'
        );
      }
    );
};
