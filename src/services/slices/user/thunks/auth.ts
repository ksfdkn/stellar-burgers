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

type TForgotPasswordData = {
  email: string;
};

type TResetPasswordData = {
  password: string;
  token: string;
};

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'user/auth/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);

      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);

      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка авторизации');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();

      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка выхода');
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
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка регистрации');
    }
  }
);

export const forgotPassword = createAsyncThunk<boolean, TForgotPasswordData>(
  'user/auth/forgotPassword',
  async (data: TForgotPasswordData, { rejectWithValue }) => {
    try {
      await forgotPasswordApi(data);

      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка восстановления пароля');
    }
  }
);

export const resetPassword = createAsyncThunk<boolean, TResetPasswordData>(
  'user/auth/resetPassword',
  async (data: TResetPasswordData, { rejectWithValue }) => {
    try {
      await resetPasswordApi(data);

      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка сброса пароля');
    }
  }
);
