import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { resetPassword } from '../../services/slices/user/thunks';
import {
  selectIsAuth,
  selectUserError
} from '../../services/slices/user/selectors';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const isAuth = useSelector(selectIsAuth);
  const errorText = useSelector(selectUserError);

  const handleSubmit = async (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();

    await dispatch(resetPassword({ password, token })).unwrap();

    localStorage.removeItem('resetPassword');
    navigate('/login');
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true });
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={errorText || ''}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
