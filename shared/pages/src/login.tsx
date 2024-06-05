import React, { useEffect } from 'react';

import Image from 'next/image';

import { GoogleLogin, GoogleCredentialResponse } from '@react-oauth/google';

import { useAuth } from '../../contexts/src';

import Logo from '../../assets/src/sign-in-logo.svg';
import Background from '../../assets/src/sign-background.webp';

export function Login() {
  const { signIn, errorMessage } = useAuth();

  const handleLogin = async (e: GoogleCredentialResponse) => {
    const { credential } = e as GoogleCredentialResponse;

    if (!credential) return;

    await signIn({ tokenId: credential });
  };

  const handleLoginFailed = () => {
    console.log('Login failed');
  };

  useEffect(() => {
    document.title = 'Login - V4 LB';
  }, []);

  return (
    <div className=" flex w-full h-[100vh]">
      <div className="flex flex-col justify-center items-center h-full w-5/12 gap-8 p-8">
        <Image
          src={Logo}
          alt="logo"
        />

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleLogin(credentialResponse);
          }}
          onError={() => {
            handleLoginFailed();
          }}
          text="signin_with"
        />

        <p>{errorMessage} </p>
      </div>
      <Image
        className="w-7/12 h-full object-cover"
        src={Background}
        alt="background"
      />
    </div>
  );
}
