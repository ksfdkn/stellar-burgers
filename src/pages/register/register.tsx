import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  selectIsAuth,
  selectLoadingUserStatus,
  selectUserError
} from '../../services/slices/user/userSlice';
import { useForm } from '../../hooks/useForm';
import { TRegisterData } from '@api';
import { registerUser } from '../../services/slices/user/thunks';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);
  const loadingStatus = useSelector(selectLoadingUserStatus);
  const errorText = useSelector(selectUserError);

  //const [userName, setUserName] = useState('');
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  const { values, handleChange, setValues } = useForm<TRegisterData>({
    name: '',
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

    await dispatch(registerUser(values)).unwrap();
  };

  if (loadingStatus === 'pending' || isAuth) {
    return <Preloader />;
  }

  const setUserName: React.Dispatch<React.SetStateAction<string>> = (value) => {
    const newValue = typeof value === 'function' ? value(values.name) : value;
    setValues({ ...values, name: newValue });
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

  return (
    <RegisterUI
      errorText={errorText || ''}
      email={values.email}
      userName={values.name}
      password={values.password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
