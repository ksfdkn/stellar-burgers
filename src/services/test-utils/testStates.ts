import {
  IBurgerConstructorState,
  IFeedState,
  IIngredientsState,
  IOrderState,
  IUserState
} from '../types';
import {
  loadingStates,
  testBun,
  testIngredient1,
  testIngredient2,
  testOrder,
  testOrders,
  testUser
} from './testData';

//burgerConstructor
export const initialBCState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],
  error: null
};

export const emptyBCState: IBurgerConstructorState = initialBCState;

export const WithTwoIngredientsBCState: IBurgerConstructorState = {
  ...initialBCState,
  ingredients: [testIngredient1, testIngredient2]
};

export const FullBCState: IBurgerConstructorState = {
  ...initialBCState,
  bun: testBun,
  ingredients: [testIngredient1, testIngredient2]
};

//ingredients
export const initialIngredientsState: IIngredientsState = {
  ingredients: [],
  loading: loadingStates.idle,
  error: null
};

//feed
export const initialFeedState: IFeedState = {
  orders: [],
  currentOrder: null,
  total: 0,
  totalToday: 0,
  loading: loadingStates.idle,
  orderLoading: loadingStates.idle,
  error: null
};

//order
export const initialOrderState: IOrderState = {
  orderModalData: null,
  loading: loadingStates.idle,
  error: null
};

export const modifiedOrderState: IOrderState = {
  ...initialOrderState,
  orderModalData: testOrder,
  loading: loadingStates.succeeded,
  error: null
};

//user
export const initialUserState: IUserState = {
  user: null,
  orders: [],
  isAuth: false,
  loading: 'idle',
  error: null
};

export const modifiedUserState: IUserState = {
  ...initialUserState,
  user: testUser,
  orders: testOrders,
  isAuth: true,
  loading: 'succeeded'
};
