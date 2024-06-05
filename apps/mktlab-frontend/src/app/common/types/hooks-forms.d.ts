import { File } from 'buffer';

export interface IUnitFormCreation {
  cnpj: string;
  fantasyName: string;
  socialName: string;
  startFundation: string;
  businessType: string;
  cnae: string;
  enterpriseType: string;
  taxRegime: string;
  address: {
    zipCode: string;
    street: string;
    state: string;
    country: string;
    number: string;
    city: string;
    district: string;
    complement: string;
  };
}

interface Partner {
  namePartner: string;
  surnamePartner: string;
  businessEmailPartner: string;
  telephonePartner: string;
  cpfPartner: string;
  rgPartner: string;
  birthdayPartner: Date;
  emailPartner: string;
  motherNamePartner: string;
  address: {
    zipCodePartner: string;
    streetPartner: string;
    statePartner: string;
    numberPartner: string;
    cityPartner: string;
    districtPartner: string;
    complementPartner: string;
    countryPartner: string;
  };
}

export interface IPartnerFormCreation {
  partners: Partner[];
}

export interface IDocumentsFormCreation {
  cof: string;
  taxFranchiseTraining: string;
  startDateFranchise: string;
  dateAssignatureContract: string;
  linkContract: string;
  socialContract: File;
}
