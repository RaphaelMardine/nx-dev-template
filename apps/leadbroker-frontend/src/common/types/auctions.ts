import { MyLeadResponse } from './leads';

export interface AuctionResponse {
  page: number;
  total: number;
  totalPages: number;
  limit: number;
  data: MyLeadResponse[];
}
