import type { Config } from 'tailwindcss';
import {
  accent,
  animation,
  fontFamilies,
  fontSize,
  ink,
  keyframes,
  maxWidth,
  neutral,
  primary,
  radius,
  success,
  surface,
  warning,
} from './src/tokens';

export default {
  theme: {
    extend: {
      colors: {
        primary: { ...primary },
        accent: { ...accent },
        neutral: { ...neutral },
        warning: { ...warning },
        success: { ...success },
        surface: { ...surface },
        ink: { ...ink },
      },
      borderRadius: { ...radius },
      fontFamily: {
        sans: [...fontFamilies.sans],
        display: [...fontFamilies.display],
        mono: [...fontFamilies.mono],
      },
      fontSize: { ...fontSize },
      maxWidth: { ...maxWidth },
      keyframes: { ...keyframes },
      animation: { ...animation },
    },
  },
} satisfies Config;
