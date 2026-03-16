import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TUser
} from '@utils-types';
import {
  mockBun1,
  mockCurrentOrder,
  mockIngredient1,
  mockIngredient2,
  mockOrder1,
  mockOrder2,
  mockUser
} from './mockData';
import { createTestConstructorIngredient } from './testHelpers';
import { TForgotPasswordData, TResetPasswordData } from '../types';

export const TEST_IDS = {
  BUN: 'bun-test-1',
  INGREDIENT_1: 'ingredient-test-1',
  INGREDIENT_2: 'ingredient-test-2'
};

export const testBun: TConstructorIngredient = createTestConstructorIngredient(
  mockBun1,
  TEST_IDS.BUN
);

export const testIngredient1: TConstructorIngredient =
  createTestConstructorIngredient(mockIngredient1, TEST_IDS.INGREDIENT_1);

export const testIngredient2: TConstructorIngredient =
  createTestConstructorIngredient(mockIngredient2, TEST_IDS.INGREDIENT_2);

export const testIngredients: TIngredient[] = [mockBun1, mockIngredient1];

export const errorStates = {
  generic: 'test-error',
  network: 'Ошибка сети',
  orderNotFound: 'Заказ не найден',
  defaultIngredients: 'Ошибка загрузки ингредиентов',
  defaultFeed: 'Ошибка загрузки ленты заказов',
  defaultCurrentOrder: 'Ошибка загрузки заказа',
  defaultOrder: 'Ошибка при создании заказа',
  defaultUser: 'Ошибка авторизации'
};

export const loadingStates = {
  idle: 'idle' as const,
  pending: 'pending' as const,
  succeeded: 'succeeded' as const,
  failed: 'failed' as const
} as const;

export const testOrders: TOrder[] = [mockOrder1, mockOrder2];

export const testFeedData = {
  orders: testOrders,
  total: 100,
  totalToday: 10
};

export const testOrder: TOrder = mockCurrentOrder;

export const testUser: TUser = mockUser;

export const testForgotPasswordData: TForgotPasswordData = {
  email: 'test@example.com'
};

export const testResetPasswordData: TResetPasswordData = {
  password: 'newpassword',
  token: 'reset-token'
};

export type LoadingState = (typeof loadingStates)[keyof typeof loadingStates];
