import { TLoginData, TRegisterData } from '@api';
import userSlice from '../slices/user/userSlice';
import { testReducerCase } from '../test-utils/testHelpers';
import { IUserState, TForgotPasswordData, TResetPasswordData } from '../types';
import { initialUserState, modifiedUserState } from '../test-utils/testStates';
import {
  fetchUser,
  fetchUserOrders,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser
} from '../slices/user/thunks';
import {
  errorStates,
  loadingStates,
  testForgotPasswordData,
  testOrders,
  testResetPasswordData,
  testUser
} from '../test-utils/testData';
import { TOrder, TUser } from '@utils-types';

const { reducer } = userSlice;

describe('userSlice', () => {
  describe('loginUser', () => {
    describe('pending', () => {
      test('устанавливает loading: "pending" и очищает ошибку', () => {
        testReducerCase<IUserState, TLoginData>(
          reducer,
          initialUserState,
          loginUser.pending.type,
          {
            loading: loadingStates.pending,
            error: null
          },
          { email: 'test@example.com', password: 'password' }
        );
      });
    });

    describe('fulfilled', () => {
      test('сохраняет пользователя и устанавливает isAuth: true', () => {
        testReducerCase<IUserState, TUser>(
          reducer,
          initialUserState,
          loginUser.fulfilled.type,
          {
            loading: loadingStates.succeeded,
            user: testUser,
            isAuth: true,
            error: null
          },
          testUser
        );
      });
    });

    describe('rejected', () => {
      test('с ошибкой: устанавливает error и loading: "failed"', () => {
        testReducerCase<IUserState, string>(
          reducer,
          initialUserState,
          loginUser.rejected.type,
          {
            loading: loadingStates.failed,
            error: 'Неизвестная ошибка'
          },
          errorStates.network
        );
      });

      test('без сообщения: использует сообщение по умолчанию из createThunkHandlers', () => {
        testReducerCase<IUserState, undefined>(
          reducer,
          initialUserState,
          loginUser.rejected.type,
          {
            loading: loadingStates.failed,
            error: 'Неизвестная ошибка'
          }
        );
      });
    });
  });

  describe('registerUser', () => {
    describe('pending', () => {
      test('устанавливает loading: "pending" и очищает ошибку', () => {
        testReducerCase<IUserState, TRegisterData>(
          reducer,
          initialUserState,
          registerUser.pending.type,
          {
            loading: loadingStates.pending,
            error: null
          },
          { name: 'Test User', email: 'test@example.com', password: 'password' }
        );
      });
    });

    describe('fulfilled', () => {
      test('сохраняет пользователя и устанавливает isAuth: true', () => {
        testReducerCase<IUserState, TUser>(
          reducer,
          initialUserState,
          registerUser.fulfilled.type,
          {
            loading: loadingStates.succeeded,
            user: testUser,
            isAuth: true,
            error: null
          },
          testUser
        );
      });
    });

    describe('rejected', () => {
      test('с ошибкой: обрабатывает ошибку', () => {
        testReducerCase<IUserState, string>(
          reducer,
          initialUserState,
          registerUser.rejected.type,
          {
            loading: loadingStates.failed,
            error: 'Неизвестная ошибка'
          },
          errorStates.network
        );
      });

      test('без сообщения: использует сообщение по умолчанию', () => {
        testReducerCase<IUserState, undefined>(
          reducer,
          initialUserState,
          registerUser.rejected.type,
          {
            loading: loadingStates.failed,
            error: 'Неизвестная ошибка'
          }
        );
      });
    });
  });

  describe('forgotPassword', () => {
    describe('pending', () => {
      test('устанавливает loading: "pending"', () => {
        testReducerCase<IUserState, TForgotPasswordData>(
          reducer,
          initialUserState,
          forgotPassword.pending.type,
          {
            loading: loadingStates.pending,
            error: null
          },
          testForgotPasswordData
        );
      });
    });

    describe('fulfilled', () => {
      test('успешно устанавливает loading: "succeeded"', () => {
        testReducerCase<IUserState, boolean>(
          reducer,
          initialUserState,
          forgotPassword.fulfilled.type,
          {
            loading: loadingStates.succeeded,
            error: null
          },
          true
        );
      });
    });

    describe('rejected', () => {
      test('обрабатывает ошибку', () => {
        testReducerCase<IUserState, string>(
          reducer,
          initialUserState,
          forgotPassword.rejected.type,
          {
            loading: loadingStates.failed,
            error: 'Неизвестная ошибка'
          },
          errorStates.network
        );
      });
    });
  });

  describe('resetPassword', () => {
    describe('pending', () => {
      test('устанавливает loading: "pending"', () => {
        testReducerCase<IUserState, TResetPasswordData>(
          reducer,
          initialUserState,
          resetPassword.pending.type,
          {
            loading: loadingStates.pending,
            error: null
          },
          testResetPasswordData
        );
      });
    });

    describe('fulfilled', () => {
      test('успешно устанавливает loading: "succeeded"', () => {
        testReducerCase<IUserState, boolean>(
          reducer,
          initialUserState,
          resetPassword.fulfilled.type,
          {
            loading: loadingStates.succeeded,
            error: null
          },
          true
        );
      });
    });

    describe('rejected', () => {
      test('обрабатывает ошибку', () => {
        testReducerCase<IUserState, string>(
          reducer,
          initialUserState,
          resetPassword.rejected.type,
          {
            loading: loadingStates.failed,
            error: 'Неизвестная ошибка'
          },
          errorStates.network
        );
      });
    });
  });

  describe('fetchUser', () => {
    describe('pending', () => {
      test('устанавливает loading: "pending"', () => {
        testReducerCase<IUserState, void>(
          reducer,
          initialUserState,
          fetchUser.pending.type,
          {
            loading: loadingStates.pending,
            error: null
          }
        );
      });
    });

    describe('fulfilled', () => {
      test('сохраняет пользователя и устанавливает isAuth: true', () => {
        testReducerCase<IUserState, TUser>(
          reducer,
          initialUserState,
          fetchUser.fulfilled.type,
          {
            loading: loadingStates.succeeded,
            user: testUser,
            isAuth: true,
            error: null
          },
          testUser
        );
      });
    });

    describe('rejected', () => {
      test('обрабатывает ошибку', () => {
        testReducerCase<IUserState, string>(
          reducer,
          initialUserState,
          fetchUser.rejected.type,
          {
            loading: loadingStates.failed,
            error: 'Неизвестная ошибка'
          },
          errorStates.network
        );
      });
    });
  });

  describe('updateUser', () => {
    describe('pending', () => {
      test('устанавливает loading: "pending"', () => {
        testReducerCase<IUserState, Partial<TRegisterData>>(
          reducer,
          initialUserState,
          updateUser.pending.type,
          {
            loading: loadingStates.pending,
            error: null
          },
          {
            name: 'Updated Name'
          }
        );
      });
    });

    describe('fulfilled', () => {
      test('обновляет пользователя без изменения isAuth', () => {
        const updatedUser: TUser = {
          ...testUser,
          name: 'Updated Name'
        };

        testReducerCase<IUserState, TUser>(
          reducer,
          initialUserState,
          updateUser.fulfilled.type,
          {
            loading: loadingStates.succeeded,
            user: updatedUser,
            error: null
          },
          updatedUser
        );
      });
    });

    describe('rejected', () => {
      test('обрабатывает ошибку', () => {
        testReducerCase<IUserState, string>(
          reducer,
          initialUserState,
          updateUser.rejected.type,
          {
            loading: loadingStates.failed,
            error: 'Неизвестная ошибка'
          },
          errorStates.network
        );
      });
    });
  });

  describe('fetchUserOrders', () => {
    describe('pending', () => {
      test('устанавливает loading: "pending"', () => {
        testReducerCase<IUserState, void>(
          reducer,
          initialUserState,
          fetchUserOrders.pending.type,
          {
            loading: loadingStates.pending,
            error: null
          }
        );
      });
    });

    describe('fulfilled', () => {
      test('сохраняет заказы пользователя', () => {
        testReducerCase<IUserState, TOrder[]>(
          reducer,
          initialUserState,
          fetchUserOrders.fulfilled.type,
          {
            loading: loadingStates.succeeded,
            orders: testOrders,
            error: null
          },
          testOrders
        );
      });
    });

    describe('rejected', () => {
      test('обрабатывает ошибку', () => {
        testReducerCase<IUserState, string>(
          reducer,
          initialUserState,
          fetchUserOrders.rejected.type,
          {
            loading: loadingStates.failed,
            error: 'Неизвестная ошибка'
          },
          errorStates.network
        );
      });
    });
  });

  describe('logoutUser', () => {
    describe('pending', () => {
      test('устанавливает loading: "pending" и очищает ошибку', () => {
        testReducerCase<IUserState, void>(
          reducer,
          initialUserState,
          logoutUser.pending.type,
          {
            loading: loadingStates.pending,
            error: null
          }
        );
      });
    });

    describe('fulfilled', () => {
      test('сбрасывает состояние пользователя и устанавливает isAuth: false', () => {
        const resultState = reducer(
          modifiedUserState,
          logoutUser.fulfilled(undefined, 'request-id-123', undefined)
        );

        expect(resultState).toEqual({
          ...initialUserState,
          loading: loadingStates.succeeded
        });
      });
    });

    //опять с logout проблемы, поэтому решила тест сделать отд
    describe('rejected', () => {
      test('при ошибке сбрасывает состояние и устанавливает error', () => {
        const errorMessage = 'Ошибка выхода из системы';

        const modifiedState: IUserState = {
          ...initialUserState,
          user: testUser,
          orders: testOrders,
          isAuth: true
        };

        const error: Error = new Error(errorMessage);

        const resultState = reducer(
          modifiedState,
          logoutUser.rejected(
            error, // обязательный аргумент типа Error
            errorMessage, // payload: сообщение об ошибке
            undefined, // arg: logoutUser не принимает аргументов
            errorMessage // meta: дополнительные данные
          )
        );

        expect(resultState).toEqual({
          ...initialUserState,
          loading: loadingStates.failed,
          error: errorMessage
        });
      });
    });
  });
});
