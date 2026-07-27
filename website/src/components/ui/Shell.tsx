import type { ReactNode } from 'react';

type ShellProps = {
  children: ReactNode;
  className?: string;
};

export function Shell({ children, className = '' }: ShellProps): React.ReactElement {
  return (
    <div className={`mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-10 ${className}`.trim()}>
      {children}
    </div>
  );
}
