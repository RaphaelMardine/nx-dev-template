'use client';

import { AuthContext } from '@v4company/contexts/auth';
import { useContext } from 'react';
import SignIn from '@v4company/pages/signInPage';
import { Container, LoadingLogin } from '@v4company/ui-components';

export default function Home() {
  const { user, loadingUser } = useContext(AuthContext);

  return (
    <div className="items-center justify-center min-h-screen gap-2">
      {loadingUser && (
        <main className="z-10 flex items-center justify-center w-screen h-screen bg-color-gray-100">
          <LoadingLogin />
        </main>
      )}
      {!user._id && !loadingUser && <SignIn />}
      {user._id && !loadingUser && (
        <Container>
          <div className="flex items-center justify-center w-full">
            Lead Broker
          </div>
        </Container>
      )}
    </div>
  );
}
