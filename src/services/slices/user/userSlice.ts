import { createSlice } from '@reduxjs/toolkit';
import {
  IUserState,
  TForgotPasswordData,
  TResetPasswordData
} from '../../types';
import { createThunkHandlers } from './helpers/createThunkHandlers';
import { TOrder, TUser } from '@utils-types';
import {
  fetchUser,
  fetchUserOrders,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser
} from './thunks';
import { TLoginData, TRegisterData } from '@api';

export const initialState = {
  user: null,
  orders: [],
  isAuth: false,
  loading: 'idle',
  error: null
} satisfies IUserState as IUserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
    createThunkHandlers<TUser, TLoginData>(
      builder,
      loginUser,
      (state, action) => ({
        ...state,
        user: action.payload,
        isAuth: true
      })
    );

    //register
    createThunkHandlers<TUser, TRegisterData>(
      builder,
      registerUser,
      (state, action) => ({
        ...state,
        user: action.payload,
        isAuth: true
      })
    );

    //forgot
    createThunkHandlers<boolean, TForgotPasswordData>(builder, forgotPassword);

    //reset
    createThunkHandlers<boolean, TResetPasswordData>(builder, resetPassword);

    //fetch
    createThunkHandlers<TUser, void>(builder, fetchUser, (state, action) => ({
      ...state,
      user: action.payload,
      isAuth: true
    }));

    //update
    createThunkHandlers<TUser, Partial<TRegisterData>>(
      builder,
      updateUser,
      (state, action) => ({
        ...state,
        user: action.payload
      })
    );

    //fetchUserOrders
    createThunkHandlers<TOrder[], void>(
      builder,
      fetchUserOrders,
      (state, action) => ({
        ...state,
        orders: action.payload
      })
    );

    //logout
    builder
      .addCase(
        logoutUser.pending,
        (state): IUserState => ({
          ...state,
          loading: 'pending',
          error: null
        })
      )

      .addCase(
        logoutUser.fulfilled,
        (state): IUserState => ({
          ...state,
          loading: 'succeeded',
          user: null,
          orders: [],
          isAuth: false
        })
      )

      .addCase(
        logoutUser.rejected,
        (state, action): IUserState => ({
          ...state,
          loading: 'failed',
          error: action.payload as string,
          user: null,
          orders: [],
          isAuth: false
        })
      );
  }
});

export default userSlice;
