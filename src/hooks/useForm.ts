import { useState, useCallback } from 'react';

type FormValues = {
  [key: string]: string | number | boolean | undefined;
};

export function useForm<T extends FormValues>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value
      }));
    },
    []
  );

  return {
    values,
    handleChange,
    setValues
  };
}
