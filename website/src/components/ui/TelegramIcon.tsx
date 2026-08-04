import { OptimizedIcon } from '@/components/ui/OptimizedIcon';

type IconProps = {
  className?: string;
  size?: number;
};

export function TelegramIcon({ className = '', size = 20 }: IconProps): React.ReactElement {
  return <OptimizedIcon src="/icons/telegram.png" size={size} className={className} />;
}
