'use client';

import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@v4company/ui-components';
import { Ellipsis } from 'lucide-react';

import React from 'react';

const UnitRowActions = ({
  unitId,
  status,
}: {
  unitId: string;
  status: string;
}) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push(`/units/editUnit/${unitId}`)}
        >
          Editar unidade
        </DropdownMenuItem>
        {status === 'ACTIVE' && (
          <DropdownMenuItem
            onClick={() => router.push(`/units/deactivateUnit/${unitId}`)}
          >
            Desativar unidade
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UnitRowActions;
