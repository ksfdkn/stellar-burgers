import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIsAuth,
  selectAuthLoading
} from '../../services/slices/user/userSlice';
import { Preloader } from '@ui';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector(selectIsAuth);
  const authLoading = useSelector(selectAuthLoading);
  const location = useLocation();

  if (authLoading) {
    return <Preloader />;
  }

  if (!isAuth) {
    return (
      <Navigate
        to='/login'
        state={{
          from: {
            pathname: location.pathname,
            search: location.search
          }
        }}
        replace
      />
    );
  }

  return children;
};
