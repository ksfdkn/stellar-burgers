import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { TForgotPasswordData } from '../../services/types';
import { useForm } from '../../hooks/useForm';

export const ForgotPassword: FC = () => {
  const { values, handleChange, setValues } = useForm<TForgotPasswordData>({
    email: ''
  });
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    forgotPasswordApi({ email: values.email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

  const setEmail: React.Dispatch<React.SetStateAction<string>> = (value) => {
    const newValue = typeof value === 'function' ? value(values.email) : value;
    setValues({ ...values, email: newValue });
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={values.email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
