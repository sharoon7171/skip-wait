import type { ReactNode } from 'react';

type ShellProps = {
  children: ReactNode;
  className?: string;
};

export function Shell({ children, className = '' }: ShellProps): React.ReactElement {
  return (
    <div className={`mx-auto w-full max-w-shell px-4 sm:px-6 lg:px-8 ${className}`.trim()}>
      {children}
    </div>
  );
}
