import type { RootState } from '../../../services/rootReducer';
import userSlice from './userSlice';
import { TUser, TOrder } from '@utils-types';

export const selectUserData = (state: RootState): TUser | null =>
  state[userSlice.name].user;

export const selectLoadingUserStatus = (
  state: RootState
): 'idle' | 'pending' | 'succeeded' | 'failed' => state[userSlice.name].loading;

export const selectIsAuth = (state: RootState): boolean =>
  state[userSlice.name].isAuth;

export const selectUserError = (state: RootState): string | null =>
  state[userSlice.name].error;

export const selectAuthLoading = (state: RootState): boolean =>
  state[userSlice.name].loading === 'pending' &&
  state[userSlice.name].isAuth === false;

export const selectUserOrders = (state: RootState): TOrder[] =>
  state[userSlice.name].orders;
