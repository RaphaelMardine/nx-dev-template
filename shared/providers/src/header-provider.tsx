'use client';
import React, { ReactNode } from 'react';
import { Cable, BarChart4, LogOut, UserCog } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/src/auth';
import { Header } from '../../ui-components/src/components/ui/header';

const menuProp = [
  {
    icon: (
      <Cable
        color="#ffffff"
        width={16}
      />
    ),
    label: 'Integrar dados',
    path: '',
  },
  {
    icon: (
      <BarChart4
        size={16}
        color="#ffffff"
      />
    ),
    label: 'Analisar resultados',
    path: '',
  },
  {
    icon: (
      <LogOut
        size={16}
        color="#ffffff"
      />
    ),
    label: 'Extrair dados',
    path: '',
  },
  {
    icon: (
      <UserCog
        size={16}
        color="#ffffff"
      />
    ),
    label: 'Públicos',
    path: '',
  },
];

const HeaderProvider = ({
  children,
  menuListContent,
}: {
  children: ReactNode;
  menuListContent?: ReactNode;
}) => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div className="h-full">
      {user?._id && (
        <Header
          user={user}
          menuList={menuProp}
          menuListContent={menuListContent}
          menuTitle="MediaHub"
          authLogout={signOut}
        />
      )}

      {children}
    </div>
  );
};

export { HeaderProvider };
