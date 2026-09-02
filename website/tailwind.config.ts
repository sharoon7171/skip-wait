import type { Config } from 'tailwindcss';
import {
  animation,
  fontFamilies,
  fontSize,
  ink,
  keyframes,
  maxWidth,
  neutral,
  primary,
  radius,
  shadows,
  success,
  surface,
  warning,
} from './src/tokens';

export default {
  theme: {
    extend: {
      colors: {
        primary: { ...primary },
        neutral: { ...neutral },
        warning: { ...warning },
        success: { ...success },
        surface: { ...surface },
        ink: { ...ink },
      },
      borderRadius: { ...radius },
      boxShadow: { ...shadows },
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
