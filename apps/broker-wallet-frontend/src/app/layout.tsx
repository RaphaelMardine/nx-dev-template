/* eslint-disable @next/next/no-page-custom-font */
import React from 'react';
import './global.css';
import 'v4design-tokens/dist/Internal-Domain/HQ_FC/css/variables.css';
import { Noto_Sans as FontSans } from 'next/font/google';
import { Toaster } from '@v4company/ui-components';
import { cn } from '@v4company/ui-components/utils';
import { AuthProvider } from '@v4company/contexts';
import Providers from './layout/providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Carteira - V4 Company',
  description:
    'Serviço da V4 Company para gestão de carteira de investimentos nos brokers',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const googleClientId = process.env.GOOGLE_CLIENT_ID || '';

  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        {/* TO DO: ADJUST IMPORT FONTS */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Toaster />
        <AuthProvider>
          <Providers OAuthId={googleClientId}>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
