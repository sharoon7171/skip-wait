import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/plugin';
import { ink, neutral, primary, success, surface, warning } from './tokens/colors';
import { radius } from './tokens/radius';
import { shadows } from './tokens/shadows';
import { fontFamilies } from './tokens/typography';

const sansStack = [...fontFamilies.sans].join(', ');

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
      fontFamily: { sans: [...fontFamilies.sans] },
    },
  },
  plugins: [
    ({ addBase }: PluginAPI) => {
      addBase({ 'html, :host': { fontFamily: sansStack } });
    },
  ],
} satisfies Config;
