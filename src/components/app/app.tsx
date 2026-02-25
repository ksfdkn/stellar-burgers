import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect, useState } from 'react';
import { fetchIngredients } from '../../services/slices/ingredients/thunks/fetchIngredients';
import {
  selectAuthLoading,
  selectIsAuth
} from '../../services/slices/user/userSlice';
import { Preloader } from '@ui';
import { PublicRoute } from '../public-route';
import { ProtectedRoute } from '../protected-route';
import { fetchUser } from '../../services/slices/user/thunks';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const isAuth = useSelector(selectIsAuth);
  const authLoading = useSelector(selectAuthLoading);

  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('refreshToken');

    if (token && !isAuth && !authLoading) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuth, authLoading]);

  //туду разобраться с роутингом в минус один, пока заглушка
  const mainContent = (
    <Routes location={background || location}>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/feed/:number' element={<OrderInfo />} />
      <Route path='/ingredients/:id' element={<IngredientDetails />} />

      {/*public*/}
      <Route
        path='/login'
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path='/register'
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path='/reset-password'
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      {/*protected*/}
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile/orders'
        element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path='/profile/orders/:number'
        element={
          <ProtectedRoute>
            <OrderInfo />
          </ProtectedRoute>
        }
      />

      <Route path='*' element={<NotFound404 />} />
    </Routes>
  );

  // modal
  const modalContent = background && (
    <Routes>
      <Route
        path='/feed/:number'
        element={
          <Modal title={`#${orderNumber}`} onClose={() => navigate(-1)}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal title={`#${orderNumber}`} onClose={() => navigate(-1)}>
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  );

  if (authLoading) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {mainContent}
      {modalContent}
    </div>
  );
};

export default App;
