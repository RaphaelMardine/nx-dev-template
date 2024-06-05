import { Unit } from './unit';

type UserProps = {
  _id: string;
  name: string;
  email: string;
  picture: string;
  createdAt?: string;
  unitId: string;
  unit?: Unit;
  permissions?: Permissions;
  franchiseAdmin: boolean;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  lastName?: string;
  picture?: string;
  mandate?: {
    createdAt: string;
    isNewPrice: boolean;
    name: string;
    status: boolean;
    updatedAt: string;
    _id: string;
  };
  seniority?: {
    createdAt: string;
    name: string;
    step: string;
    updatedAt: string;
    _id: string;
  };
  userId: string;
  unitId: string;
  canBid: boolean;
  user: UserProps;
  unit: Unit;
};

type UserPermission = {
  _id: string;
  userId: string;
  unitId: string;
  roleName: string;
  canBid: boolean;
  canWithdraw: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export interface Permissions {
  _id?: string;
  userId: string;
  unitId: string;
  whoChanged: string;
  whoCreated?: string;
  dashboard?: {
    view: boolean;
    edit: boolean;
    delete: boolean;
    admin: boolean;
  };
  mktlab?: {
    roleName: string;
    view: boolean;
    admin: boolean;
  };
  unit?: {
    roleName: string;
    view: boolean;
    delete: boolean;
    edit: boolean;
    admin: boolean;
  };
  customer?: {
    roleName: string;
    view: boolean;
    delete: boolean;
    edit: boolean;
    admin: boolean;
  };
  headquarter?: {
    roleName: string;
    view: boolean;
    edit: boolean;
    delete: boolean;
    invite: boolean;
    admin: boolean;
  };
  leadbroker?: {
    view: boolean;
    bid: boolean;
    admin: boolean;
    withdraw: boolean;
    addFunds: boolean;
  };
  meUnit?: {
    roleName: string;
    view: boolean;
    delete: boolean;
    edit: boolean;
    admin: boolean;
  };
  paymentGateway?: {
    roleName: boolean;
    view: boolean;
    edit: boolean;
    admin: boolean;
  };
  ekyte?: {
    roleName: boolean;
    view: boolean;
    admin: boolean;
  };
  users?: {
    roleName: string;
    view: boolean;
    delete: boolean;
    edit: boolean;
    admin: boolean;
  };
}

export interface iUsersResponse {
  user: User;
  unit: {
    address: {
      state: string;
      city: string;
      district: string;
      street: string;
      number: number;
      complement: string;
      zipCode: string;
    };
    _id: string;
    name: string;
    socialName: string;
    cnpj: string;
    active: boolean;
    stakeholders: {
      name: string;
      email: string;
      phone: string;
      cpf: string;
      rg: string;
      _id: string;
    }[];
    deletedAt: Date | null;
    UnitUsers: {
      id: string;
      userId: string;
      unitId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    slackWorkspaceId: string;
    mainWorkspaceChannelId: string;
    pipefyUnitId: string;
    acceptedUseTerms: boolean;
    firstAcceptUseTerms: Date;
    lastAcceptUseTerms: Date;
    unitAvailable: boolean;
  };
  token: string;
}
