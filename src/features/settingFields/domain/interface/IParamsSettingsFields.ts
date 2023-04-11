import { IPagination } from "../../../scoring/domain/interface/IPagination";

export interface IParamsSettingsFields extends IPagination {
  campaign: string;
}