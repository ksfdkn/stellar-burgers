import { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/user/thunks';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await dispatch(logoutUser()).unwrap();
    navigate('/login', { replace: true });
  }, [dispatch, navigate]);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
