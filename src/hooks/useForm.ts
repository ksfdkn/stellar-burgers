import { useState, useCallback } from 'react';

export function useForm<T extends Record<string, any>>(initialValues: T) {
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
