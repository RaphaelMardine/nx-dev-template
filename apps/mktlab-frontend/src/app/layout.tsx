import './global.css';
import 'v4design-tokens/dist/Internal-Domain/HQ_FC/css/variables.css';
import { Noto_Sans as FontSans } from 'next/font/google';

import { cn } from '@v4company/ui-components/utils';

import { HeaderProvider } from '@v4company/providers/header-provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@v4company/contexts/auth';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { ReactQueryProvider } from '@v4company/hooks';
import { Toaster } from '@v4company/ui-components';
import { ThemeProvider } from '@v4company/providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Markitbase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const v4cookie = cookies().get('v4company.token');
  let isValid = false;

  const decodedToken: JwtPayload = jwt.decode(
    v4cookie?.value as string
  ) as JwtPayload;

  if (decodedToken && decodedToken.exp) {
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decodedToken.exp;

    isValid = currentTime < expirationTime;
  }

  // add to .env variable after tests PLEASE
  const googleClientId =
    '587184758719-eed0mnubth1t8im1t97f9d88rolns872.apps.googleusercontent.com';

  return (
    <html lang="en">
      <body
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <ReactQueryProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <GoogleOAuthProvider clientId={googleClientId}>
                <HeaderProvider>{children}</HeaderProvider>
                <Toaster />
              </GoogleOAuthProvider>
            </ThemeProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
