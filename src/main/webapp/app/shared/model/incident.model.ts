import dayjs from 'dayjs';
import { IChampion } from 'app/shared/model/champion.model';
import { IFieldAgent } from 'app/shared/model/field-agent.model';
import { IIncidentType } from 'app/shared/model/incident-type.model';
import { IncidentStatus } from 'app/shared/model/enumerations/incident-status.model';

export interface IIncident {
  id?: number;
  incidentAddress?: string;
  status?: IncidentStatus;
  reportedOn?: string;
  reportedBy?: string;
  updatedOn?: string | null;
  updatedBy?: string | null;
  resolvedOn?: string | null;
  reportingComments?: string | null;
  updateStatusComments?: string | null;
  champion?: IChampion | null;
  fieldAgent?: IFieldAgent | null;
  incidentType?: IIncidentType | null;
}

export const defaultValue: Readonly<IIncident> = {};
