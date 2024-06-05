'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HeaderProvider } from '@v4company/providers';
import { ReactQueryProvider } from '@v4company/hooks';
import React from 'react';

export default function Providers({
  children,
  OAuthId,
}: {
  children: React.ReactNode;
  OAuthId: string;
}) {
  return (
    <>
      <GoogleOAuthProvider clientId={OAuthId}>
        <HeaderProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </HeaderProvider>
      </GoogleOAuthProvider>
    </>
  );
}
