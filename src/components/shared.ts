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
