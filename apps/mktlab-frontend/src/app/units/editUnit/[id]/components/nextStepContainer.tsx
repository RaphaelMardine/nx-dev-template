import { Button, toast } from '@v4company/ui-components';
import React from 'react';
import { handleNextStep } from '../hooks/handleNextStep';
import {
  IDocumentsFormCreation,
  IPartnerFormCreation,
  IUnitFormCreation,
} from '../../../../common/types/hooks-forms';
import { useRouter } from 'next/navigation';
import { editUnit } from '../../../../common/services/requests/units/editUnit';

interface IDataToSend {
  formUnitIdentification: IUnitFormCreation;
  formPartners: IPartnerFormCreation;
  formDocuments: IDocumentsFormCreation;
}
interface INextStepContainer {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isValidUnitIdentification?: boolean;
  isValidPartner?: boolean;
  isValidDocuments?: boolean;
  dataToSend?: IDataToSend;
  setOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  unitId?: string;
}

export const NextStepContainer = ({
  step,
  setStep,
  isValidUnitIdentification,
  isValidPartner,
  isValidDocuments,
  dataToSend,
  setOpenDialog,
  unitId,
}: INextStepContainer) => {
  const router = useRouter();

  const backStepFunction = (step: number) => {
    if (step !== 0) {
      setStep(step - 1);
    } else {
      router.push('/units');
    }
  };

  return (
    <div className="flex justify-end gap-8 mt-8">
      <Button
        variant={'link'}
        onClick={() => backStepFunction(step)}
      >
        Voltar
      </Button>
      <Button
        onClick={async () => {
          if (step === 3) {
            const responseToCreateUnit = {
              cofId: dataToSend?.formDocuments?.cof,
              headquarterId: 'Matriz',
              startDate: dataToSend?.formDocuments?.startDateFranchise,
              attributionModel: 'Hunter de franqueado',
              pipefyId: '123',
              franchiseFee: parseInt(
                dataToSend?.formDocuments?.taxFranchiseTraining || '0'
              ), // criar um campo pra esse
              franchiseTrainingFee: parseInt(
                dataToSend?.formDocuments?.taxFranchiseTraining || '0'
              ),
              assignatureContractDate:
                dataToSend?.formDocuments?.startDateFranchise || '',
              primaryPartnerDocument:
                dataToSend?.formPartners?.partners[0]?.cpfPartner,
              document: dataToSend?.formUnitIdentification?.cnpj,
              documentType: 'cnpj',
              tradingName: dataToSend?.formUnitIdentification?.fantasyName,
              legalName: dataToSend?.formUnitIdentification?.socialName,
              businessType: dataToSend?.formUnitIdentification?.businessType,
              cnae: dataToSend?.formUnitIdentification?.cnae,
              taxRegime: dataToSend?.formUnitIdentification?.taxRegime,
              address: {
                zipCode: dataToSend?.formUnitIdentification?.address?.zipCode,
                name: 'at',
                street: dataToSend?.formUnitIdentification?.address?.street,
                state: dataToSend?.formUnitIdentification?.address?.state,
                number: dataToSend?.formUnitIdentification?.address?.number,
                city: dataToSend?.formUnitIdentification?.address?.city,
                district: dataToSend?.formUnitIdentification?.address?.district,
                complement:
                  dataToSend?.formUnitIdentification?.address?.complement,
                country: 'Brasil',
              },
              partners: dataToSend?.formPartners?.partners.map((partner) => ({
                name: partner.namePartner,
                surname: partner.surnamePartner,
                personalEmail: partner.emailPartner,
                businessEmail: partner.businessEmailPartner,
                phone: partner.telephonePartner,
                document: partner.cpfPartner,
                documentType: 'cpf',
                birthday: partner.birthdayPartner,
                motherName: partner.motherNamePartner,
                address: {
                  name: 'at',
                  zipCode: partner.address.zipCodePartner,
                  street: partner.address.streetPartner,
                  state: partner.address.statePartner,
                  number: partner.address.numberPartner,
                  city: partner.address.cityPartner,
                  district: partner.address.districtPartner,
                  complement: partner.address.complementPartner,
                  country: 'Brasil',
                },
              })),
            };

            const response = await editUnit(responseToCreateUnit, unitId || '');

            if (response) {
              toast({
                title: 'Sucesso ao editar unidade',
                description: 'Unidade editada com sucesso!',
              });
              setOpenDialog && setOpenDialog(true);
            } else {
              toast({
                title: 'Erro ao editar unidade',
                description:
                  'Ocorreu um erro ao tentar editar esta unidade, tente novamente mais tarde ou entre em contato com o suporte!',
                variant: 'destructive',
              });
            }
          } else {
            handleNextStep({
              setStep,
              step,
              isValidUnitIdentification,
              isValidPartner,
              isValidDocuments,
            });
          }
        }}
        type="submit"
      >
        Avançar
      </Button>
    </div>
  );
};
