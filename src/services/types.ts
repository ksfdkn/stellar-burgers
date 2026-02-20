import { TNewOrderResponse } from '@api';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TUser
} from '@utils-types';

export interface IBurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  error: string | null;
}

export interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

export interface IIngredientsState {
  ingredients: TIngredient[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

export interface IOrderState {
  orderModalData: TOrder | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

export interface IUserState {
  user: TUser | null;
  orders: TOrder[];
  isAuth: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}
