import type { PropsWithChildren } from 'react';

export const TwitterLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen flex-col divide-y divide-neutral-700">
      {children}
    </div>
  );
};
