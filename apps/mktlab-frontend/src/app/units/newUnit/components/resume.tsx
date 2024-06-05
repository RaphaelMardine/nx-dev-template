import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Separator,
} from '@v4company/ui-components';
import { FileText } from 'lucide-react';
import {
  IDocumentsFormCreation,
  IPartnerFormCreation,
  IUnitFormCreation,
} from '../../../common/types/hooks-forms';
import { UseFormReturn } from 'react-hook-form';
import { NextStepContainer } from './nextStepContainer';
import { useState } from 'react';
import { DialogCreateUnit } from './dialogCreateUnit';

export const Resume = ({
  formUnitIdentification,
  formPartners,
  formDocuments,
  setStep,
}: {
  formUnitIdentification: IUnitFormCreation;
  formPartners: IPartnerFormCreation;
  formDocuments: IDocumentsFormCreation;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  
  const dataToSend = {
    formUnitIdentification,
    formPartners,
    formDocuments,
  };

  return (
    <div className="flex flex-col gap-8">
      <Accordion
        type="single"
        collapsible
        className="w-full px-5 py-2 bg-white border border-solid h-max border-color-gray-default"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-2xl font-bold">
            Dados da unidade
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-5 mb-6">
              <div>
                <h4 className="font-bold">Nome da unidade</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Razão social</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">CNPJ</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Nome fantasia</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Data da fundação</h4>
                <p>Lorem ipsum</p>
              </div>
            </div>
            <div className="grid grid-cols-5">
              <div>
                <h4 className="font-bold">CNAE</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Tipo de empresa</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Regime tributário</h4>
                <p>Lorem ipsum</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion
        type="single"
        collapsible
        className="w-full px-5 py-2 bg-white border border-solid h-max border-color-gray-default"
      >
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-2xl font-bold">
            Dados da unidade
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-7 mb-6">
              <div>
                <h4 className="font-bold">CEP</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Estado</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Cidade</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Complemento</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">País</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Bairro</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Número</h4>
                <p>Lorem ipsum</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion
        type="single"
        collapsible
        className="w-full px-5 py-2 bg-white border border-solid h-max border-color-gray-default"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-2xl font-bold">
            Sócio principal
          </AccordionTrigger>
          <AccordionContent>
            <h4 className="font-bold">Dados pessoais</h4>
            <div className="grid grid-cols-9 mb-6">
              <div>
                <h4 className="font-bold">Nome</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Sobrenome</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Nome da mãe</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Nome fantasia</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Data de nascimento</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">E-mail pessoal</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">RG</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">CPF</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Endereço pessoal</h4>
                <p>Lorem ipsum</p>
              </div>
            </div>
            <h4 className="font-bold">Dados empresariais</h4>
            <div className="grid grid-cols-5">
              <div>
                <h4 className="font-bold">E-mail</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Cargo</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Representante legal</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Tipo partner</h4>
                <p>Lorem ipsum</p>
              </div>
              <div>
                <h4 className="font-bold">Telefone</h4>
                <p>Lorem ipsum</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold">Percentual</h4>
              <p>Lorem ipsum</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion
        type="single"
        collapsible
        className="w-full px-5 py-2 bg-white border border-solid h-max border-color-gray-default"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-2xl font-bold">
            Documentação
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <div>
              <div className="flex items-center gap-4">
                <FileText />
                <div className="flex flex-col">
                  <h4 className="text-xl font-bold">Contrato</h4>
                  <p>Data da assinatura: 00/00/00</p>
                </div>
                <Button
                  className="flex ml-auto"
                  variant={'outline'}
                >
                  Ver documento
                </Button>
              </div>
            </div>
            <Separator />
            <div>
              <div className="flex items-center gap-4">
                <FileText />
                <div className="flex flex-col">
                  <h4 className="text-xl font-bold">Cartão CNPJ</h4>
                  <p>Data da assinatura: 00/00/00</p>
                </div>
                <Button
                  className="flex ml-auto"
                  variant={'outline'}
                >
                  Ver documento
                </Button>
              </div>
            </div>
            <Separator />
            <div>
              <div className="flex items-center gap-4">
                <FileText />
                <div className="flex flex-col">
                  <h4 className="text-xl font-bold">Contrato social</h4>
                  <p>Data da assinatura: 00/00/00</p>
                </div>
                <Button
                  className="flex ml-auto"
                  variant={'outline'}
                >
                  Ver documento
                </Button>
              </div>
            </div>
            <Separator />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <DialogCreateUnit
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
      <NextStepContainer
        step={3}
        setStep={setStep}
        dataToSend={dataToSend}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};
