import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectAuthLoading,
  selectIsAuth
} from '../../services/slices/user/userSlice';
import { Preloader } from '@ui';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector(selectIsAuth);
  const authLoading = useSelector(selectAuthLoading);
  const location = useLocation();

  if (authLoading) {
    return <Preloader />;
  }

  if (isAuth) {
    const fromPath = location.state?.from?.pathname;
    return <Navigate to={fromPath || '/'} replace />;
  }

  return children;
};
