'use client';
import { StepProgress } from '@v4company/ui-components';
import { BreadcrumbCreateUnits } from './breadcrumbEditUnits';
import React from 'react';

export interface ISteps {
  title: string;
  content: JSX.Element;
}

interface ICreateUnitsStructure {
  step: number;
  stepsToCreateUnit: ISteps[];
}

export const CreateUnitStructure = ({
  step,
  stepsToCreateUnit,
}: ICreateUnitsStructure) => {
  function progressLength() {
    return step * (100 / stepsToCreateUnit.length);
  }

  const currentStep = stepsToCreateUnit[step];

  return (
    <div className="min-h-screen px-8 pt-20 pb-8 bg-center first-line:bg-center text-ellipsis">
      <BreadcrumbCreateUnits />
      <div className="flex flex-col my-8">
        <h1 className="text-4xl font-bold">Criar nova unidade</h1>
        <p>Preencha os dados da nova unidade para cadastra-la no sistema V4</p>
      </div>
      <div className="mb-8">
        <StepProgress
          value={progressLength()}
          steps={stepsToCreateUnit.map((step: ISteps) => step.title)}
          className="h-4"
        />
      </div>
      {currentStep.content}
    </div>
  );
};
