import type { PropsWithChildren } from 'react';
import { Header } from './Header';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="m-auto flex min-h-full max-w-lg flex-col">
      <Header />
      <div className="h-full">{children}</div>
    </div>
  );
};
