import { OptimizedIcon } from '@/components/ui/icons/OptimizedIcon';

type BrandIconProps = {
  size: number;
  className?: string;
  priority?: boolean;
};

export function BrandIcon({ size, className, priority = false }: BrandIconProps): React.ReactElement {
  return (
    <OptimizedIcon src="/icon.png" size={size} className={className ?? ''} priority={priority} />
  );
}
