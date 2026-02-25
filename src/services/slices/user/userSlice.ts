import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../../types';
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

const initialState = {
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
    createThunkHandlers<TUser>(builder, loginUser, (state, action) => ({
      ...state,
      user: action.payload,
      isAuth: true
    }));

    //register
    createThunkHandlers<TUser>(builder, registerUser, (state, action) => ({
      ...state,
      user: action.payload,
      isAuth: true
    }));

    //forgot
    createThunkHandlers<boolean>(builder, forgotPassword);

    //reset
    createThunkHandlers<boolean>(builder, resetPassword);

    //fetch
    createThunkHandlers<TUser>(builder, fetchUser, (state, action) => ({
      ...state,
      user: action.payload,
      isAuth: true
    }));

    //update
    createThunkHandlers<TUser>(builder, updateUser, (state, action) => ({
      ...state,
      user: action.payload
    }));

    //fetchUserOrders
    createThunkHandlers<TOrder[]>(
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
