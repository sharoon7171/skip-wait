import { OptimizedIcon } from '@/components/ui/icons/OptimizedIcon';

type IconProps = {
  className?: string;
  size?: number;
};

export function GitHubIcon({ className = '', size = 20 }: IconProps): React.ReactElement {
  return <OptimizedIcon src="/icons/github.png" size={size} className={className} />;
}
