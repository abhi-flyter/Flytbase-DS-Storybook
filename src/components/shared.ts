import { useState } from 'react';

export type ControlState = 'default' | 'hover' | 'pressed' | 'focused' | 'disabled';

export type FieldState =
  | 'default'
  | 'hover'
  | 'pressed'
  | 'focused'
  | 'disabled'
  | 'error'
  | 'active'
  | 'description';

export function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function useControllableState<T>({
  defaultValue,
  onChange,
  value
}: {
  defaultValue: T;
  onChange?: (value: T) => void;
  value?: T;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  function setValue(nextValue: T) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  }

  return [currentValue, setValue] as const;
}
