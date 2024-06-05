'use client';
import SignIn from '@v4company/pages/signInPage';
import { useContext } from 'react';
import { AuthContext } from '@v4company/contexts/auth';
import { LoadingLogin } from '@v4company/ui-components';

export default function Index() {
  const { user, loadingUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      {loadingUser && (
        <main className="w-screen h-screen flex justify-center items-center z-10 bg-color-gray-100">
          <LoadingLogin />
        </main>
      )}
      {!user._id && !loadingUser && <SignIn />}
      {user._id && !loadingUser && <h1>Session is valid</h1>}
    </div>
  );
}
