export interface Unit {
  email: string;
  _id: string;
  name: string;
  socialName: string;
  cnpj: string;
  active: boolean;
  address: {
    state: string;
    city: string;
    district: string;
    street: string;
    number: string;
    complement: string;
    zipCode: string;
  };
  stakeholders: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    rg: string;
    _id: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
