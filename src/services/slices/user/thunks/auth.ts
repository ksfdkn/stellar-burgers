import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  forgotPasswordApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../../utils/cookie';
import {
  TForgotPasswordData,
  TResetPasswordData
} from '../../../../services/types';

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'user/auth/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);

      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);

      return response.user;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Ошибка авторизации';
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();

      //localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Ошибка выхода';
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'user/auth/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);

      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);

      return response.user;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Ошибка регистрации';
      return rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk<boolean, TForgotPasswordData>(
  'user/auth/forgotPassword',
  async (data: TForgotPasswordData, { rejectWithValue }) => {
    try {
      await forgotPasswordApi(data);

      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Ошибка восстановления пароля';
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk<boolean, TResetPasswordData>(
  'user/auth/resetPassword',
  async (data: TResetPasswordData, { rejectWithValue }) => {
    try {
      await resetPasswordApi(data);

      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Ошибка сброса пароля';
      return rejectWithValue(message);
    }
  }
);
