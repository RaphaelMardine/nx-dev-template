export interface Winner {
  _id: string;
  value: number;
  initialValue: number;
  realValue: number;
  bonus: number;
  unitId: string;
  name: string;
  picture: string;
  email?: string;
  boughtAt?: Date;
}

export interface Lead {
  bestLead?: boolean;
  lost?: boolean;
  company: string;
  revenue: string;
  employees: string;
  channel: string;
  page: string;
  source: string;
  campaign: string;
  segment: string;
  name: string;
  tel: string;
  cnpj?: string;
  email: string;
  urgencyToStart?: string;
  companyPosition?: string;
  description?: string;
}

export interface WhoRequest {
  name: string;
  email: string;
  userId: string;
  unitId: string;
  picture: string;
}

export interface Refund {
  status: string;
  reason: string;
  description: string;
  whoRequest: WhoRequest;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Bid {
  user_id: string;
  value: number;
  time: Date;
  _id: string;
  unitId: string;
}

export interface Historic {
  id: string;
  message: string;
  description?: string;
  status: string;
  updatedAt: Date;
  createdAt?: Date;
  time?: Date;
  body: string;
}

export interface Location {
  city: string;
  latitude: number;
  longitude: number;
  state: string;
}

export enum Steps {
  'LEAD_PURCHASED' = 'LEAD_PURCHASED',
  'IN_PROSPECTING' = 'IN_PROSPECTING',
  'MEETING_SCHEDULED' = 'MEETING_SCHEDULED',
  'CONTRACT_SENT' = 'CONTRACT_SENT',
  'ACTIVE_CONTRACT' = 'ACTIVE_CONTRACT',
  'LOST_LEAD' = 'LOST_LEAD',
  'RETURN_MEETING' = 'RETURN_MEETING',
  'WAITING' = 'WAITING',
  'UNDER_ANALYSIS' = 'UNDER_ANALYSIS',
  'REJECTED' = 'REJECTED',
  'APPROVED' = 'APPROVED',
}

export interface MyLeadResponse {
  _id: string;
  winner: Winner;
  lead: Lead;
  refund?: Refund;
  bestLead?: boolean;
  bids?: Bid[];
  leads?: MyLeadResponse[];
  externalId?: string;
  historic?: Historic[];
  createdAt: Date;
  packId?: string;
  packName: string;
  packSequencial: number;
  refundRequested?: boolean;
  descriptionRefurb?: string;
  refurbished?: boolean;
  revenue?: string;
  location?: Location;
  expiresAt: Date;
  salesforceId?: string;
  expressPurchase?: boolean;
  updatedAt: Date;
  steps?: Steps;
  __v: number;
}

export interface MyLeadsPaginatedResponse {
  data: MyLeadResponse[];
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export enum LeadStatus {
  LEAD_PURCHASED = 'LEAD_PURCHASED',
  IN_PROSPECTING = 'IN_PROSPECTING',
  MEETING_SCHEDULED = 'MEETING_SCHEDULED',
  CONTRACT_SENT = 'CONTRACT_SENT',
  ACTIVE_CONTRACT = 'ACTIVE_CONTRACT',
  LOST_LEAD = 'LOST_LEAD',
  RETURN_MEETING = 'RETURN_MEETING',
  //types of leads with refund request
  WAITING = 'WAITING',
  UNDER_ANALYSIS = 'UNDER_ANALYSIS',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}
