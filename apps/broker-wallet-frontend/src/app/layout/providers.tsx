'use client';
import React from 'react';
import { HeaderProvider } from '@v4company/providers';
import { ReactQueryProvider } from '@v4company/hooks';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MenuListContent } from '../../common';

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
        <HeaderProvider menuListContent={<MenuListContent />}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </HeaderProvider>
      </GoogleOAuthProvider>
    </>
  );
}
