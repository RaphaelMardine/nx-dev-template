'use client';
import { CreateUnitStructure } from './components/editUnitStructure';
import { useState } from 'react';
import { UnitIdentification } from './components/unitIdentification';
import { Partners } from './components/partners';
import { Documents } from './components/documents';
import { Resume } from './components/resume';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  documentsFormSchema,
  partnersFormSchema,
  unitIdentificationSchema,
} from './hooks/zodValidation';
import {
  IDocumentsFormCreation,
  IPartnerFormCreation,
  IUnitFormCreation,
} from '../../../common/types/hooks-forms';
import { useParams } from 'next/navigation';

export default function NewUnit() {
  const [step, setStep] = useState(0);
  const { id } = useParams();

    const formUnitIdentification = useForm<IUnitFormCreation>({
    resolver: zodResolver(unitIdentificationSchema),
  });

  const valuesFromUnitIdentification = formUnitIdentification.getValues();

  const formPartners = useForm<IPartnerFormCreation>({
    resolver: zodResolver(partnersFormSchema),
    defaultValues: {
      partners: [
        {
          namePartner: '',
          surnamePartner: '',
          businessEmailPartner: '',
          telephonePartner: '',
          cpfPartner: '',
          rgPartner: '',
          birthdayPartner: undefined,
          emailPartner: '',
          motherNamePartner: '',
          address: {
            zipCodePartner: '',
            streetPartner: '',
            statePartner: '',
            numberPartner: '',
            cityPartner: '',
            districtPartner: '',
            complementPartner: '',
            countryPartner: '',
          },
        },
      ],
    },
    mode: 'onChange',
  });

  const valuesFromPartners = formPartners.getValues();

  const formDocuments = useForm<IDocumentsFormCreation>({
    resolver: zodResolver(documentsFormSchema),
  });

  const valuesFromDocuments = formDocuments.getValues();

  return (
    <CreateUnitStructure
      step={step}
      stepsToCreateUnit={[
        {
          title: 'Identificação da unidade',
          content: (
            <UnitIdentification
              form={formUnitIdentification}
              setStep={setStep}
            />
          ),
        },
        {
          title: 'Sócios',
          content: (
            <Partners
              form={formPartners}
              setStep={setStep}
            />
          ),
        },
        {
          title: 'Documentação',
          content: (
            <Documents
              form={formDocuments}
              setStep={setStep}
            />
          ),
        },
        {
          title: 'Resumo',
          content: (
            <Resume
              formUnitIdentification={valuesFromUnitIdentification}
              formPartners={valuesFromPartners}
              formDocuments={valuesFromDocuments}
              setStep={setStep}
              unitId={id as string}
            />
          ),
        },
      ]}
    />
  );
}
