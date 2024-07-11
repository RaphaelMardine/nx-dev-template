'use client';
import * as api from '../../services/src';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';

import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext({} as any);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>({} as any);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!user._id) {
      checkUser();
    }
  }, []);

  const { push } = useRouter();

  async function signIn({ tokenId }: any) {
    const twoDays = 60 * 60 * 24 * 2;

    const response = await api.usersApi.post<any>('/auth', {
      tokenId,
    });
    const { token, user: requestUser, unit } = response.data;
    if (!requestUser) {
      setLoadingUser(false);
      return;
    }

    if (!unit?._id) {
      setLoadingUser(false);
      return;
    }

    requestUser.unitId = unit._id;
    requestUser.unit = unit;
    setUser(requestUser);
    setCookie(undefined, 'v4company.token', token, {
      maxAge: twoDays,
      path: '/',
    });
    setLoadingUser(false);
    push('/');
  }

  async function signOut() {
    setUser({} as any);
    destroyCookie(undefined, 'v4company.token');
  }

  async function checkUser() {
    const { 'v4company.token': token } = parseCookies();

    if (!token) {
      setLoadingUser(false);
      return;
    }

    const response = await api.usersApi.get<any>('/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.data) {
      signOut();
      setLoadingUser(false);
      return;
    }

    const { user: userInfo, unit } = response.data;

    userInfo.unitId = unit._id;
    userInfo.unit = unit;
    setUser(userInfo);
    setLoadingUser(false);
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, loadingUser, checkUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, AuthContext, useAuth };
