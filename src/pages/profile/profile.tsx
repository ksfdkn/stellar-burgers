import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUserData } from '../../services/slices/user/selectors';
import { updateUser } from '../../services/slices/user/thunks';
import { useForm } from '../../hooks/useForm';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора done*/
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);

  const { values, handleChange, setValues } = useForm<TRegisterData>({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setValues((prevState) => ({
        ...prevState,
        name: user?.name || '',
        email: user?.email || ''
      }));
    }
  }, [user, setValues]);

  const isFormChanged =
    values.name !== user?.name ||
    values.email !== user?.email ||
    !!values.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isFormChanged) return;

    dispatch(updateUser(values));

    setValues({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    setValues({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  return (
    <ProfileUI
      formValue={values}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
    />
  );
};
