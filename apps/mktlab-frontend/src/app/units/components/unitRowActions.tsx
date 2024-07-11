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

import React, { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { IDeactivateUnitReq, updateUnit } from '../../common/services/requests/units/updateUnit';

const UnitRowActions = ({
  unitId,
  status,
  unit
}: {
  unitId: string;
  status: string;
  unit?: any;
}) => {
  const router = useRouter();

  const onSubmit: SubmitHandler<any> = useCallback(
    async (unit) => {
      try {

        if (!unit) {
          return;
        }

        const payload: IDeactivateUnitReq = {
          id: unitId,
          cofId: unit.cofId,
          status: 'INACTIVE',
        };

        await updateUnit(payload);

        router.refresh();

      } catch (error) {
        console.error(error);
      }
    },
    [unitId, router]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled
          onClick={() => router.push(`/units/editUnit/${unitId}`)}
        >
          Editar unidade
        </DropdownMenuItem>
        {status === 'ACTIVE' && (
          <DropdownMenuItem
            onClick={() => onSubmit(unit)}
          >
            Desativar unidade
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UnitRowActions;
