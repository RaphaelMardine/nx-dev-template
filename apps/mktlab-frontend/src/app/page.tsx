'use client';
import SignIn from '@v4company/pages/signInPage';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@v4company/contexts/auth';
import { LoadingLogin } from '@v4company/ui-components';
import { useRouter } from 'next/navigation';

export default function Index() {
  const { user, loadingUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if(user._id ) {
      router.push('/finance')
    }
  }, [router, user._id]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      {loadingUser && (
        <main className="z-10 flex items-center justify-center w-screen h-screen bg-color-gray-100">
          <LoadingLogin />
        </main>
      )}
      {!user._id && !loadingUser && <SignIn />}
      {user._id && !loadingUser && <h1>Session is valid</h1>}
    </div>
  );
}
