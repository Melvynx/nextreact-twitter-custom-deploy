import type { PropsWithChildren } from 'react';
import { Layout } from '~/src/components/layout/Layout';
import './globals.css';
import { Providers } from './providers';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
