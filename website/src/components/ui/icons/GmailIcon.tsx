import { OptimizedIcon } from '@/components/ui/icons/OptimizedIcon';

type IconProps = {
  className?: string;
  size?: number;
};

export function GmailIcon({ className = '', size = 20 }: IconProps): React.ReactElement {
  return <OptimizedIcon src="/icons/email.png" size={size} className={className} />;
}
