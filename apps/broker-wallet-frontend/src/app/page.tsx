'use client';
import { AuthContext } from '@v4company/contexts/auth';
import HomeWallet from './HomeWallet';
import { useContext, useEffect } from 'react';
import SignIn from '@v4company/pages/signInPage';
import { LoadingLogin } from '@v4company/ui-components';
import Script from 'next/script';

export default function Home() {
  const { user, loadingUser } = useContext(AuthContext);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!Iugu) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Iugu.setAccountID(process.env.NEXT_PUBLIC_IUGU_ACCOUNT_ID);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Iugu.setup();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Iugu.utils.isBlockedByAdBlock();
  }, []);

  return (
    <div className="items-center justify-center min-h-screen gap-2">
      <Script
        async
        strategy="beforeInteractive"
        type="text/javascript"
        src="https://js.iugu.com/v2"
      />
      {loadingUser && (
        <main className="z-10 flex items-center justify-center w-screen h-screen bg-color-gray-100">
          <LoadingLogin />
        </main>
      )}
      {!user._id && !loadingUser && <SignIn />}
      {user._id && !loadingUser && <HomeWallet />}
    </div>
  );
}
