import React, {useEffect, useState} from 'react';

export const useDebounceValue = <T>(value: T, defaultValue: T, time: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(defaultValue);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, time)

    return () => clearTimeout(id);
  }, [value, time])

  return {
    value: debouncedValue
  }
}