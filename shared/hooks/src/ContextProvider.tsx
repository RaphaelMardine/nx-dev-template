import React, { ReactNode, cloneElement } from 'react';
import * as contextProviders from '../../contexts/src';

const Providers = {
  ...contextProviders,
};

const providers = Object.keys(Providers).reduce((acc, curr) => {
  if (!curr.includes('Provider')) return acc;
  const Component = Providers[curr as keyof typeof Providers] as React.FC;
  return [
    ...acc,
    <Component key={`Context-key:${Math.random()}`} />,
  ] as never[];
}, []);

export const ContextProvider = ({
  children: initial,
}: {
  children: ReactNode;
}) =>
  providers.reduce(
    (children, parent) => cloneElement(parent, { children }),
    initial
  );
