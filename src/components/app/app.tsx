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
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredients/thunks/fetchIngredients';
import { fetchUser } from '../../services/slices/user/thunks';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  //туду разобраться с роутингом в минус один, пока заглушка
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />

        <Route
          path='/feed/:number'
          element={
            <Modal title={`#${orderNumber}`} onClose={() => {}}>
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
            <Modal title={`#${orderNumber}`} onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
