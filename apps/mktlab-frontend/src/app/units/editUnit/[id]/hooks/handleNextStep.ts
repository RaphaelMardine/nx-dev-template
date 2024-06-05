
export async function handleNextStep({
  step,
  setStep,
  isValidUnitIdentification,
  isValidPartner,
  isValidDocuments,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isValidUnitIdentification?: boolean;
  isValidPartner?: boolean;
  isValidDocuments?: boolean;
}) {
  
  switch (step) {
    case 0:
      if (isValidUnitIdentification) {
        setStep(step + 1);
      }
      break;
    case 1:
      if (isValidPartner) {
        setStep(step + 1);
      }
      break;
    case 2:
      if (isValidDocuments) {
        setStep(step + 1);
      }
      break;
  }
}
