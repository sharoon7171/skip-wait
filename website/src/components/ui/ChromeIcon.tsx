import { OptimizedIcon } from '@/components/ui/OptimizedIcon';

type IconProps = {
  className?: string;
  size?: number;
};

export function ChromeIcon({ className = '', size = 20 }: IconProps): React.ReactElement {
  return <OptimizedIcon src="/icons/chrome.png" size={size} className={className} />;
}
