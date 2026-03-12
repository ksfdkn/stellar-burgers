import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { resetPassword } from '../../services/slices/user/thunks';
import {
  selectIsAuth,
  selectUserError
} from '../../services/slices/user/selectors';
import { useForm } from '../../hooks/useForm';
import { TResetPasswordData } from '../../services/types';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleChange, setValues } = useForm<TResetPasswordData>({
    password: '',
    token: ''
  });

  const isAuth = useSelector(selectIsAuth);
  const errorText = useSelector(selectUserError);

  const handleSubmit = async (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();

    await dispatch(resetPassword(values)).unwrap();

    localStorage.removeItem('resetPassword');
    navigate('/login');
  };

  const setPassword: React.Dispatch<React.SetStateAction<string>> = (value) => {
    const newValue =
      typeof value === 'function' ? value(values.password) : value;

    setValues({ ...values, password: newValue });
  };

  const setToken: React.Dispatch<React.SetStateAction<string>> = (value) => {
    const newValue = typeof value === 'function' ? value(values.token) : value;

    setValues({ ...values, token: newValue });
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
      password={values.password}
      token={values.token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
