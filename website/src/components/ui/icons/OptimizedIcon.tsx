import Image from 'next/image';

type OptimizedIconProps = {
  src: string;
  size?: number;
  className?: string;
  priority?: boolean;
};

export function OptimizedIcon({
  src,
  size = 20,
  className = '',
  priority = false,
}: OptimizedIconProps): React.ReactElement {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      quality={100}
      priority={priority}
      className={className}
    />
  );
}
