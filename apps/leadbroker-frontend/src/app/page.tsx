'use client';

import { AuthContext } from '@v4company/contexts/auth';
import { useContext } from 'react';
import SignIn from '@v4company/pages/signInPage';
import { LoadingLogin } from '@v4company/ui-components';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, loadingUser } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className="h-full">
      {loadingUser && (
        <main className="z-10 flex items-center justify-center w-screen h-screen bg-color-gray-100">
          <LoadingLogin />
        </main>
      )}
      {!user._id && !loadingUser && <SignIn />}
      {user._id && !loadingUser && router.replace('/home')}
    </div>
  );
}
