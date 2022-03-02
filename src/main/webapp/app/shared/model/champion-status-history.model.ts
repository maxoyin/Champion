import dayjs from 'dayjs';
import { IChampionStatusChangeReason } from 'app/shared/model/champion-status-change-reason.model';
import { IChampion } from 'app/shared/model/champion.model';
import { ChampionStatus } from 'app/shared/model/enumerations/champion-status.model';

export interface IChampionStatusHistory {
  id?: number;
  status?: ChampionStatus;
  statusEndedOn?: string | null;
  comments?: string | null;
  inactiveStartDate?: string | null;
  inactiveEndDate?: string | null;
  championStatusChangeReason?: IChampionStatusChangeReason | null;
  champion?: IChampion | null;
}

export const defaultValue: Readonly<IChampionStatusHistory> = {};
