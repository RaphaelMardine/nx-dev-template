'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';
import { parseCookies } from 'nookies';
import useWebSocket from 'react-use-websocket';
import { useAuth } from '../../contexts/src';
import { socketApiAWS } from '../../services/src';

interface IDataWebsocket {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { event: string; body: any };
}

const WebsocketContext = createContext({} as IDataWebsocket);

const WebsocketProvider = ({
  children,
  plataform = '',
}: {
  children: ReactNode;
  plataform?: string;
}) => {
  const { user } = useAuth();
  const [data, setData] = useState({ event: '', body: {} });

  const { 'v4company.token': token } = parseCookies();
  useWebSocket(socketApiAWS, {
    queryParams: {
      token,
      userId: user?._id,
      unitId: user?.unitId,
      plataform,
    },
    retryOnError: true,
    onMessage: (message) => {
      const response = JSON.parse(message.data);
      setData(response);
    },
  });

  return (
    <WebsocketContext.Provider value={{ data }}>
      {children}
    </WebsocketContext.Provider>
  );
};

function useWebsocket() {
  return useContext(WebsocketContext);
}

export { WebsocketProvider, WebsocketContext, useWebsocket };
