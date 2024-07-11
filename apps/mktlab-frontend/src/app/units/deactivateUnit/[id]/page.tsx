'use client';
import { Button, DialogClose } from '@v4company/ui-components';
import { useCallback, useEffect } from 'react';
import { NavigationBreadcrumb } from '@v4company/ui-components/components/ui/navigationBreadcrumb';
import DeactivateUnitForm from '../../components/deactivateUnitForm';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@v4company/ui-components';
import { useRouter as useNavigation } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@v4company/ui-components';
import { getUnitById } from '../../../common/services/requests/units/getUnitById';
import { IDeactivateUnitReq, updateUnit } from '../../../common/services/requests/units/updateUnit';


const unitDeactivationSchema = z.object({
  description: z
    .string({
      message: 'Descrição inválida',
    })
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .optional(),
  documentType: z
    .string({
      message: 'Selecione um tipo de documento',
    })
    .optional(),
  document: z.instanceof(File).optional(),
});

export interface IUnitDeactivation {
  description: string | undefined;
  documentType: string | undefined;
  document: File | undefined;
}

export default function DeactivateUnit() {
  const [deactivationComplete, setDeactivationComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigation();
  const params = useParams();

  const formDeactivateUnit = useForm<IUnitDeactivation>({
    resolver: zodResolver(unitDeactivationSchema),
  });

  const onSubmit: SubmitHandler<IUnitDeactivation> = useCallback(
    async () => {
      try {
        setLoading(true);
        const unitId = params.id as string;
        const unit = await getUnitById(unitId);

        if (!unit) {
          return;
        }

        const payload: IDeactivateUnitReq = {
          id: unitId,
          cofId: unit.cofId,
          status: 'INACTIVE',
        };

        await updateUnit(payload);

        setDeactivationComplete(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [params.id]
  );

  useEffect(() => {
    setIsValid(formDeactivateUnit.formState.isValid);
  }, [formDeactivateUnit.formState.isValid]);

  return (
    <Form {...formDeactivateUnit}>
      <form>
        <div className="min-h-screen px-8 pt-20 bg-center first-line:bg-center text-ellipsis">
          <NavigationBreadcrumb
            bcrumbContent={[
              { label: 'Home', path: '/' },
              { label: 'Unidades', path: '/units' },
              { label: 'Desativar unidade', path: '' },
            ]}
          />
          <div className="flex justify-between pt-8 pb-6">
            <h1 className="text-4xl font-bold">Desativar unidade</h1>
            <div>
              <Button
                variant="secondary"
                className="mr-4 rounded-full"
                type="button"
                onClick={() => navigate.back()}
              >
                Voltar
              </Button>
              <Dialog>
                {!deactivationComplete &&
                  (isValid ? (
                    <DialogTrigger>
                      <Button
                        className="rounded-full"
                        type="button"
                      >
                        Finalizar
                      </Button>
                    </DialogTrigger>
                  ) : (
                    <Button
                      className="rounded-full"
                      type="button"
                      onClick={() => formDeactivateUnit.trigger()}
                    >
                      Finalizar
                    </Button>
                  ))}
                <DialogContent>
                  <DialogHeader>
                    {deactivationComplete ? (
                      <DialogTitle className="pt-4 text-3xl text-center">
                        Unidade desativada com sucesso
                      </DialogTitle>
                    ) : (
                      <DialogTitle className="pt-4 text-3xl text-center">
                        Você tem certeza que deseja desativar esta unidade?
                      </DialogTitle>
                    )}
                  </DialogHeader>
                  <div className="flex justify-around mt-3">
                    <DialogClose asChild>
                      <Button
                        className="rounded-full"
                        onClick={() => {
                          if (deactivationComplete) {
                            navigate.replace('/units');
                          }
                        }}
                      >
                        {deactivationComplete ? 'Fechar janela' : 'Voltar'}
                      </Button>
                    </DialogClose>
                    {deactivationComplete ? (
                      <></>
                    ) : (
                      <Button
                        disabled={loading}
                        className="rounded-full"
                        type="button"
                        onClick={() =>
                          formDeactivateUnit.handleSubmit(onSubmit)()
                        }
                      >
                        Desativar unidade
                      </Button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div>
            <h2>
              A unidade ainda tem clientes ativos. Desvincule os clientes e
              tente novamente
            </h2>
          </div>
          <div className="flex flex-col gap-8">
            <DeactivateUnitForm form={formDeactivateUnit} />
          </div>
        </div>
      </form>
    </Form>
  );
}
