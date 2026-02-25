import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUserOrders } from '../../services/slices/user/userSlice';
import { fetchUserOrders } from '../../services/slices/user/thunks';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора done */
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
