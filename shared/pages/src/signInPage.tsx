'use client';
import React from 'react';
import Image from 'next/image';
import office from '../../assets/src/office.svg';
import v4logo from '../../assets/src/v4logo-red.svg';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/src/auth';
import GoogleLoginButton from './components/GoogleLoginButton';

const SignIn = () => {
  const { signIn } = useContext(AuthContext);

  return (
    <main className="flex w-screen h-screen z-10 bg-color-gray-100">
      <>
        <section className="flex items-center justify-center w-6/12">
          <div className="w-8/12 h-[90%] flex flex-col px-[6%] justify-between items-center">
            <Image
              className="w-2/6"
              src={v4logo}
              alt="Logo V4 Company"
            />
            <div>
              <h1 className="mb-1 text-2xl font-semibold text-center">
                Acessar plataforma
              </h1>
              <p className="mb-12 text-base text-center">
                Faça login com sua conta Google da V4 Company para continuar.
              </p>
              <div className="flex justify-center">
                <GoogleLoginButton signInFunction={signIn} />
              </div>
            </div>
            <div>Copyright © {new Date().getFullYear()} V4 Company</div>
          </div>
        </section>
        <section className="w-6/12">
          <Image
            className="object-cover w-full h-full"
            src={office}
            alt="Escritório V4 Company"
          />
        </section>
      </>
    </main>
  );
};

export default SignIn;
