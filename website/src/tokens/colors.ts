import {
  neutral,
  primary,
  success,
  warning,
} from '../../../tokens/colors';

export { neutral, primary, success, warning };

export const surface = {
  canvas: 'oklch(1 0 0)',
  muted: neutral[50],
} as const;

export const ink = {
  DEFAULT: neutral[900],
  body: neutral[700],
  soft: neutral[500],
  inverse: 'oklch(0.985 0.004 250)',
  'inverse-body': 'oklch(0.8 0.02 250)',
  'inverse-soft': 'oklch(0.62 0.03 250)',
} as const;
