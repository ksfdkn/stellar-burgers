import { FC, SyntheticEvent, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  selectLoadingUserStatus,
  selectIsAuth,
  selectUserError
} from '../../services/slices/user/selectors';
import { useForm } from '../../hooks/useForm';
import { TLoginData } from '@api';
import { loginUser } from '../../services/slices/user/thunks';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);
  const loadingStatus = useSelector(selectLoadingUserStatus);
  const errorText = useSelector(selectUserError);

  const { values, handleChange, setValues } = useForm<TLoginData>({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true });
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();

    await dispatch(loginUser(values)).unwrap();
  };

  const setEmail: React.Dispatch<React.SetStateAction<string>> = (value) => {
    const newValue = typeof value === 'function' ? value(values.email) : value;
    setValues({ ...values, email: newValue });
  };

  const setPassword: React.Dispatch<React.SetStateAction<string>> = (value) => {
    const newValue =
      typeof value === 'function' ? value(values.password) : value;
    setValues({ ...values, password: newValue });
  };

  if (loadingStatus === 'pending' || isAuth) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={errorText || ''}
      email={values.email}
      setEmail={setEmail}
      password={values.password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
