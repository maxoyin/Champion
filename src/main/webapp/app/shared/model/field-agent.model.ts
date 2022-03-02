import dayjs from 'dayjs';
import { IIncident } from 'app/shared/model/incident.model';
import { IWorkshift } from 'app/shared/model/workshift.model';

export interface IFieldAgent {
  id?: number;
  accountId?: string;
  cityId?: string;
  stateId?: string;
  updatedOn?: string | null;
  incidents?: IIncident[] | null;
  workshift?: IWorkshift | null;
}

export const defaultValue: Readonly<IFieldAgent> = {};
