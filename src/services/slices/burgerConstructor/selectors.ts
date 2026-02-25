import type { RootState } from '../../../services/rootReducer';
import burgerConstructorSlice from './burgerConstructorSlice';

export const selectBurgerConstructor = (state: RootState) =>
  state[burgerConstructorSlice.name];
